import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { ModRelease } from 'src/modules/modrelease/entities/modrelease.entity';
import { ModEntity } from 'src/modules/mods/entities/mod.entity';
import { Entity, Column, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('mod_detail')
@ObjectType()
export class ModDetail {
  @PrimaryColumn({ unique: true })
  @Field(() => Int)
  modId: number;

  @Column()
  @Field(() => String)
  name: string;

  @OneToOne(() => ModEntity, (mod) => mod.details)
  mod: ModEntity;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  @Expose({ name: 'text' })
  html?: string;

  @OneToMany(() => ModRelease, (release) => release.modDetail)
  @Field(() => [ModRelease], { nullable: true, defaultValue: [] })
  releases: ModRelease[];
}
