import { CreateUserDto } from './dto/create-user.dto';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@server/entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CvService } from '../../services/cv/cv.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => CvService))
    private readonly cvService: CvService
  ) {}

  async findOneBy(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.userRepository.findOne({ where });
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userDto);

    const savedUser = await this.userRepository.save(newUser);

    try {
      const generatedCv = await this.cvService.generateExampleCv({
        userId: savedUser.id,
      });
      this.logger.log(`Generated a new CV for a user: ${generatedCv?._id}`);
      return await this.userRepository.save({
        ...savedUser,
      });
    } catch (error) {
      this.logger.error(`Cannot generate example CV for a user: ${error}`);
      throw error;
    }
  }
}
