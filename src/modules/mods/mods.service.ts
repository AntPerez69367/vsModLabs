import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ModEntity } from './entities/mod.entity';
import { ModDetailsService } from '../moddetails/moddetails.service';
import { CacheService } from '../cache/cache.service';
import { parseISO, isAfter, isValid } from 'date-fns';

type VsMod = { modid: number; lastreleased: string };
type VsApiResponse = { status: string; mods: VsMod[] };

@Injectable()
export class ModsService {
  private readonly logger = new Logger(ModsService.name);
  private readonly CACHE_TTL = 60 * 60 * 15; // 15 hours

  constructor(
    @InjectRepository(ModEntity)
    private readonly modRepository: Repository<ModEntity>,
    private readonly modDetailsService: ModDetailsService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Fetches mods from API and updates local database
   * @param batchSize Number of mods to process in each batch
   * @param delayMs Delay between processing items in milliseconds
   * @returns Array of saved mod entities
   */
  async updateModDB(batchSize = 25, delayMs = 250): Promise<ModEntity[]> {
    try {
      // Fetch mods catalog from API
      const modList = await this.fetchModsCatalog();

      // Process mods in batches
      await this.processBatches(modList.mods, batchSize, delayMs);

      // Save all mods to database
      return this.saveModsToDatabase(modList.mods);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to update mod database: ${error.message}`,
          error.stack,
        );
      }
      return [];
    }
  }

  /**
   * Find all mods with their details and releases
   * @returns Array of mod entities with relations
   */
  async findAll(): Promise<ModEntity[]> {
    const cacheKey = 'all_mods';

    // Try to get from cache first
    const cachedMods = await this.cacheService.get<ModEntity[]>(cacheKey);
    if (cachedMods) {
      this.logger.log('Returning cached mods list');
      return cachedMods;
    }

    // Fetch from database with relations
    const mods = await this.fetchModsWithRelations();

    // Cache the results
    await this.cacheService.set(cacheKey, mods, this.CACHE_TTL);

    return mods;
  }

  /**
   * Find a single mod by its ID with all relations
   * @param modId The mod ID to find
   * @returns The mod entity or null if not found
   */
  async findOne(modId: number): Promise<ModEntity | null> {
    const cacheKey = `mod_${modId}`;

    // Try to get from cache first
    const cachedMod = await this.cacheService.get<ModEntity>(cacheKey);
    if (cachedMod) {
      this.logger.log(`Returning cached mod: ${modId}`);
      return cachedMod;
    }

    // Fetch from database with relations
    const mod = await this.fetchModById(modId);

    // Cache the result if found
    if (mod) {
      await this.cacheService.set(cacheKey, mod, this.CACHE_TTL);
    }

    return mod;
  }

  /**
   * Determines if a mod should be updated based on release dates
   */
  private shouldUpdateMod(existingDate?: string, newDate?: string): boolean {
    // If either date is missing, default to update
    if (!existingDate || !newDate) return true;

    try {
      // Parse dates and check validity
      const existingDateTime = parseISO(existingDate);
      const newDateTime = parseISO(newDate);

      if (!isValid(existingDateTime) || !isValid(newDateTime)) {
        this.logger.warn(
          `Invalid date format: existing=${existingDate}, new=${newDate}`,
        );
        return true;
      }

      // Update if new date is after existing date
      return isAfter(newDateTime, existingDateTime);
    } catch (error) {
      this.logger.warn(
        'Date comparison error, falling back to string comparison',
        error,
      );
      return newDate > existingDate;
    }
  }

  /**
   * Fetches mods catalog from the API
   */
  private async fetchModsCatalog(): Promise<VsApiResponse> {
    this.logger.log('Fetching mods catalog from API');
    const ky = (await import('ky')).default;

    return ky
      .get('https://mods.vintagestory.at/api/mods/', {
        timeout: 15000,
        retry: {
          limit: 3,
          methods: ['GET'],
          statusCodes: [408, 429, 500, 502, 503, 504],
        },
      })
      .json<VsApiResponse>();
  }

  /**
   * Process mods in batches with controlled pacing
   */
  private async processBatches(
    mods: VsMod[],
    batchSize: number,
    delayMs: number,
  ): Promise<void> {
    // Create batches for processing
    const batches = this.createBatches(mods, batchSize);

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      this.logger.log(`Processing batch ${batchIndex + 1}/${batches.length}`);

      // Process each mod in the batch
      await this.processBatch(batch, delayMs);

      // Add delay between batches
      if (batchIndex < batches.length - 1) {
        const batchDelay = delayMs * 5;
        this.logger.log(
          `Batch complete. Waiting ${batchDelay}ms before next batch...`,
        );
        await this.delay(batchDelay);
      }
    }
  }

  /**
   * Process a single batch of mods
   */
  private async processBatch(mods: VsMod[], delayMs: number): Promise<void> {
    for (const mod of mods) {
      try {
        await this.processSingleMod(mod);
        // Add delay between mods
        await this.delay(delayMs);
      } catch (error) {
        if (error instanceof Error) {
          this.logger.warn(
            `Failed to process mod ${mod.modid}: ${error.message}`,
            error.stack,
          );
        }
      }
    }
  }

  /**
   * Process a single mod
   */
  private async processSingleMod(mod: VsMod): Promise<void> {
    const existingMod = await this.modRepository.findOneBy({
      modId: mod.modid,
    });

    if (
      existingMod &&
      !this.shouldUpdateMod(existingMod.lastReleased, mod.lastreleased)
    ) {
      this.logger.log(
        `Skipping mod ${mod.modid}: up to date (${existingMod.lastReleased})`,
      );
      return;
    }

    this.logger.log(`Updating mod ${mod.modid} with latest details`);
    await this.modDetailsService.update(mod.modid);
  }

  /**
   * Save mods to database
   */
  private async saveModsToDatabase(mods: VsMod[]): Promise<ModEntity[]> {
    const entities = plainToInstance(ModEntity, mods);
    this.logger.log(`Saving ${entities.length} mods to database`);
    return await this.modRepository.save(entities);
  }

  /**
   * Create batches from an array
   */
  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * Fetch all mods with relations
   */
  private async fetchModsWithRelations(): Promise<ModEntity[]> {
    return this.modRepository
      .createQueryBuilder('mod')
      .leftJoinAndSelect('mod.details', 'details')
      .leftJoinAndSelect('details.releases', 'releases')
      .orderBy('mod.lastReleased', 'DESC')
      .getMany();
  }

  /**
   * Fetch a single mod by ID with relations
   */
  private async fetchModById(modId: number): Promise<ModEntity | null> {
    return this.modRepository
      .createQueryBuilder('mod')
      .leftJoinAndSelect('mod.details', 'details')
      .leftJoinAndSelect('details.releases', 'releases')
      .where('mod.modId = :modId', { modId })
      .orderBy('releases.created', 'DESC')
      .getOne();
  }

  /**
   * Promise-based delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
