import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    username: string,
    password: string,
    email: string,
  ): Promise<UserEntity | undefined> {
    try {
      const newUser = new UserEntity();
      const hashedPass = await bcrypt.hash(password, 10);
      newUser.username = username;
      newUser.password = hashedPass;
      newUser.email = email;
      return this.userRepository.save(newUser);
    } catch (error) {
      this.logger.log(error);
    }
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ username });
  }

  async findOneById(userId: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id: userId });
  }
}
