import { Module } from '@nestjs/common';
import { ModDetailsService } from './moddetails.service';
import { ModDetailsResolver } from './moddetails.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModDetail } from './entities/moddetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModDetail])],
  providers: [ModDetailsService, ModDetailsResolver],
  exports: [ModDetailsService],
})
export default class ModDetailsModule {}
