import { Injectable, Logger } from '@nestjs/common';
import { CreateModpackInput } from './dto/create-modpack.input';
import { UpdateModpackInput } from './dto/update-modpack.input';
import { Repository } from 'typeorm';
import { ModpackEntity } from './entities/modpack.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class ModpacksService {
  private readonly logger = new Logger(ModpacksService.name);
  constructor(
    @InjectRepository(ModpackEntity)
    private readonly modpackRepository: Repository<ModpackEntity>,
  ) {}

  async create(
    input: CreateModpackInput,
    user: UserEntity,
  ): Promise<ModpackEntity | undefined> {
    try {
      const newModpack = plainToInstance(ModpackEntity, input);
      newModpack.ownerId = user.id;
      return await this.modpackRepository.save(newModpack);
    } catch (error) {
      this.logger.log(error);
    }
  }

  async findAll() {
    return await this.modpackRepository.find();
  }

  async findOne(id: number) {
    return await this.modpackRepository.findOneBy({ id });
  }

  async update(id: number, input: UpdateModpackInput) {
    await this.modpackRepository.update({ id }, input);

    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    const deleteResult = await this.modpackRepository.delete(id);
    if (deleteResult.affected != null && deleteResult.affected > 0) {
      return 200;
    }
    return 500;
  }
}
