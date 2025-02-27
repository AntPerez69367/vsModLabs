import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { ModDetail } from 'src/modules/moddetails/entities/moddetail.entity';

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

  @Field(() => ModDetail, { nullable: true })
  @OneToOne(() => ModDetail, (detail) => detail.mod, { eager: false })
  details: ModDetail;
}
