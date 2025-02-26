import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ModEntity } from './entities/mod.entity';
import { ModDetailsService } from '../moddetails/moddetails.service';

type VS_API_RESPONSE = {
  status: string;
  mods: [{ modid: number }];
};
@Injectable()
export class ModsService {
  private readonly logger = new Logger(ModsService.name);
  constructor(
    @InjectRepository(ModEntity)
    private readonly modRepository: Repository<ModEntity>,
    private readonly modDetailsService: ModDetailsService,
  ) {}

  async updateModDB(batchSize = 10, delayMs = 500): Promise<ModEntity[]> {
    const ky = (await import('ky')).default;
    this.logger.log('Fetching all mods from API');
    try {
      const modList = await ky
        .get('https://mods.vintagestory.at/api/mods/')
        .json<VS_API_RESPONSE>();

      const batches: Array<{ modid: number }[]> = [];
      for (let i = 0; i < modList.mods.length; i += batchSize) {
        batches.push(modList.mods.slice(i, i + batchSize));
      }

      for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        this.logger.log(`Processing batch ${batchIndex + 1}/${batches.length}`);

        for (const mod of batch) {
          try {
            this.logger.log(`Processing mod ${mod.modid}`);
            await this.modDetailsService.update(mod.modid);
          } catch (error) {
            this.logger.warn(
              `Failed to create ModDetail for mod ${mod.modid}:`,
              error,
            );
          }
        }
        if (batchIndex < batches.length - 1) {
          this.logger.log(
            `Batch ${batchIndex + 1} complete. Waiting before next batch...`,
          );
          await new Promise((resolve) => setTimeout(resolve, delayMs * 5));
        }
      }

      const mods = plainToInstance(ModEntity, modList.mods);
      this.logger.log(
        `Attempting to save ${mods.length} mods to the database.`,
      );
      return await this.modRepository.save(mods);
    } catch (error) {
      this.logger.log(`Error while fetching mods ${error}`);
      return [];
    }
  }

  async createAll(mods: ModEntity[]): Promise<ModEntity[] | undefined> {
    const queryRunner = this.modRepository.queryRunner;
    await queryRunner?.connect();
    await queryRunner?.startTransaction();
    try {
      return await queryRunner?.manager.save(mods);
    } catch (error) {
      this.logger.log(
        `An error happened while attempting to create or update mods ${error}`,
      );
      await queryRunner?.rollbackTransaction();
    } finally {
      await queryRunner?.release();
    }
  }
  async findAll() {
    return this.modRepository
      .createQueryBuilder('mod')
      .leftJoinAndSelect('mod.details', 'details')
      .leftJoinAndSelect('details.releases', 'releases')
      .orderBy('mod.lastReleased', 'ASC')
      .getMany();
  }

  async findOne(modId: number) {
    return await this.modRepository
      .createQueryBuilder('mod')
      .leftJoinAndSelect('mod.details', 'details')
      .leftJoinAndSelect('details.releases', 'releases')
      .where('mod.modId = :modId', { modId })
      .orderBy('releases.created', 'DESC')
      .getOne();
  }
}
