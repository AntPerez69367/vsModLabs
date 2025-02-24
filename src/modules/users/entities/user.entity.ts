import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/graphql.schema';
import { Exclude, Expose } from 'class-transformer';
import { Role } from 'src/graphql.schema';
@Entity()
@ObjectType()
export class UserEntity extends User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Field()
  @Column({ unique: true })
  @Expose()
  username: string;

  @Field()
  @Column()
  @Exclude()
  password: string;

  @Field()
  @Column()
  @Expose()
  email: string;

  @Field()
  @Column({ type: 'simple-array', default: 'user' })
  @Expose()
  roles!: Role[];
}
