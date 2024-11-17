import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from '@server/entities/refresh-token.entity';
import { DeepPartial, Repository } from 'typeorm';

type RefreshTokenUpdateDto = Omit<DeepPartial<RefreshToken>, 'id' | 'userId' | 'validSince' | 'user'>;

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>
  ) {}

  public getNonExpiredTokenByIdWithUser = async (id: string) =>
    this.refreshTokenRepository.findOne({
      where: {
        id,
        blackListed: false,
      },
      relations: ['user'],
    });

  public save = async ({
    token,
    userId,
    validSince,
    validUntil,
  }: Pick<RefreshToken, 'token' | 'userId' | 'validSince' | 'validUntil'>) => {
    const refreshToken = this.refreshTokenRepository.create({
      token,
      userId,
      validSince,
      validUntil,
    });

    return this.refreshTokenRepository.save(refreshToken);
  };

  public update = async (id: string, { validUntil, blackListed, lastUsed }: RefreshTokenUpdateDto) =>
    this.refreshTokenRepository.update(id, {
      validUntil,
      blackListed,
      lastUsed,
    });
}
