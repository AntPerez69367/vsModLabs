import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModRelease } from './entities/modrelease.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModRelease])],
})
export default class ModreleaseModule {}
