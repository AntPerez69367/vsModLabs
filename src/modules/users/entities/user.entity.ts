import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/graphql.schema';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class UserEntity extends User {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  @Exclude()
  password: string;

  @Field()
  @Column()
  email: string;
}
