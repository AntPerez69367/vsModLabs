import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ModEntity } from './entities/mod.entity';

type VS_API_RESPONSE = {
  status: string;
  mods: [];
};

@Injectable()
export class ModsService {
  private readonly logger = new Logger(ModsService.name);
  constructor(
    @InjectRepository(ModEntity)
    private readonly modRepository: Repository<ModEntity>,
  ) {}

  async updateModDB(): Promise<ModEntity[]> {
    const ky = (await import('ky')).default;
    this.logger.log('Fetching all mods from API');
    const modList: VS_API_RESPONSE = await ky
      .get('https://mods.vintagestory.at/api/mods/')
      .json();

    const mods = plainToInstance(ModEntity, modList.mods);
    this.logger.log(`Attempting to save ${mods.length} mods to the database.`);
    return await this.modRepository.save(mods);
  }

  async findAll() {
    return await this.modRepository.find();
  }

  async findOne(modId: number) {
    return this.modRepository.findOneBy({ modId });
  }
}
