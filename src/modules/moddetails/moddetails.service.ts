import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModRelease } from '../modrelease/entities/modrelease.entity';
import { ModDetail } from './entities/moddetail.entity';

type VS_RELEASE = {
  releaseid: number;
  mainfile: string;
  filename: string;
  fileid: number;
  modversion: string;
  created: string;
  tags: string[];
};

type VS_API_RESPONSE = {
  status: string;
  mod: {
    name: string;
    text: string;
    releases: VS_RELEASE[];
  };
};

@Injectable()
export class ModDetailsService {
  private readonly logger = new Logger(ModDetailsService.name);

  constructor(
    @InjectRepository(ModDetail)
    private readonly modDetailRepository: Repository<ModDetail>,
  ) {}

  async update(id: number) {
    const ky = (await import('ky')).default;
    this.logger.log(`Fetching mod ${id} from API`);
    const queryRunner = this.modDetailRepository.manager.queryRunner;
    await queryRunner?.connect();
    await queryRunner?.startTransaction();

    try {
      const details = await ky
        .get(`https://mods.vintagestory.at/api/mod/${id}`, {
          retry: {
            limit: 10,
            methods: ['GET'],
            backoffLimit: 3000,
          },
        })
        .json<VS_API_RESPONSE>();
      this.logger.log(`Processing mod ${id} details`);
      const savedModDetails = await queryRunner?.manager.save(ModDetail, {
        modId: id,
        name: details.mod.name,
        html: details.mod.text,
      });

      if (details.mod.releases?.length > 0) {
        for (const release of details.mod.releases) {
          try {
            this.logger.log(`Processing releases for mod ${id}`);
            await queryRunner?.manager.save(ModRelease, {
              releaseId: release.releaseid,
              modId: id,
              mainFile: release.mainfile,
              fileName: release.filename,
              fileId: release.fileid,
              version: release.modversion,
              created: release.created,
              tags: release.tags || [],
            });
          } catch (error) {
            this.logger.warn(`Failed to create release for mod ${id}:`, error);
          }
        }
      }

      this.logger.log(`Completed processing mod ${id} from API`);
      await queryRunner?.commitTransaction();

      const completeEntity = await this.modDetailRepository.findOne({
        where: { modId: id },
        relations: ['releases'],
      });

      return completeEntity || savedModDetails;
    } catch (error) {
      await queryRunner?.rollbackTransaction();
      this.logger.error(`Error while processing mod ${id}:`, error);
      throw error;
    } finally {
      await queryRunner?.release();
    }
  }
}
