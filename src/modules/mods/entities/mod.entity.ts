import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class ModEntity {
  @Field()
  @PrimaryColumn({ unique: true })
  @Expose({ name: 'modid' })
  modId!: number;

  @Field()
  @Column()
  @Expose({ name: 'assetid' })
  assetId: number;

  @Field()
  @Column()
  downloads: number;

  @Field()
  @Column()
  follows: number;

  @Field()
  @Column({ default: '' })
  name: string;

  @Field()
  @Column({ nullable: true, default: '' })
  summary: string;

  @Field()
  @Column('simple-array')
  @Expose({ name: 'modidstrs' })
  modIdStrs: string[];

  @Field()
  @Column({ default: '' })
  author: string;

  @Field()
  @Column({ nullable: true, default: '' })
  @Expose({ name: 'urlalias' })
  urlAlias: string;

  @Field()
  @Column({ default: '' })
  type: string;

  @Field()
  @Column({ nullable: true, default: '' })
  logo: string;

  @Field()
  @Column('simple-array')
  tags: string[];

  @Field()
  @Column()
  @Expose({ name: 'lastreleased' })
  lastReleased: string;
}
