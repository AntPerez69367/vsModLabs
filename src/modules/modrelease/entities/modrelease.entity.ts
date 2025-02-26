import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { ModDetail } from 'src/modules/moddetails/entities/moddetail.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ModRelease {
  @PrimaryColumn({ unique: true })
  @Field(() => Int)
  @Expose({ name: 'releaseid' })
  releaseId: number;

  @Column()
  @Field(() => Int)
  @Expose()
  modId: number;

  @ManyToOne(() => ModDetail, (detail) => detail.releases)
  @JoinColumn({ name: 'modId', referencedColumnName: 'modId' })
  modDetail: ModDetail;

  @Column({ nullable: true })
  @Field(() => String)
  @Expose({ name: 'mainfile' })
  mainFile: string;

  @Column({ nullable: true })
  @Field(() => String)
  @Expose({ name: 'filename' })
  fileName: string;

  @Column({ nullable: true })
  @Field(() => Int)
  @Expose({ name: 'fileid' })
  fileId: number;

  @Column('simple-array', { default: '' })
  @Field(() => [String])
  @Expose()
  tags: string[];

  @Column({ nullable: true })
  @Field(() => String)
  @Expose({ name: 'modversion' })
  version: string;

  @Column()
  @Field(() => String)
  @Expose()
  created: string;
}
