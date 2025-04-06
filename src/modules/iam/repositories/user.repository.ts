import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from '@iam/entities/user.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { IUserRepository } from '../interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(userDto as DeepPartial<User>);
    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(userId: bigint): Promise<User> {
    const user = await this.userRepo.findOne({ where: { userId } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new Error(`User with username ${username} not found`);
    }
    return user;
  }

  async update(id: number, user: Partial<User>): Promise<void> {
    await this.userRepo.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
