import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@Entity()
@ObjectType()
export class ModpackEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Field()
  @Expose()
  name: string;

  @Column()
  @Field()
  @Expose()
  ownerId: number;

  @Column('simple-array', { default: '', nullable: true })
  @Field(() => [Number], { nullable: true })
  @Expose()
  mods?: number[];

  @UpdateDateColumn()
  @Field()
  @Expose()
  updated: Date;

  @Column({ default: true })
  @Field({ defaultValue: true })
  @Expose()
  public?: boolean;
}
