import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@server/entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CvService } from '../cv/cv/cv.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly cvService: CvService
  ) {}

  async findOne(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.userRepository.findOne({ where });
  }

  async getAllUsers() {
    return this.userRepository.findAndCount();
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);

    newUser.cvs = [await this.cvService.generateExampleCv(newUser.id)];
    return newUser;
  }
}
