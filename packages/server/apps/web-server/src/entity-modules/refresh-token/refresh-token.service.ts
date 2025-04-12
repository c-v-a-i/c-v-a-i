import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from '@server/entities/refresh-token.entity';
import { DeepPartial, Repository, MoreThan } from 'typeorm';

type RefreshTokenUpdateDto = Omit<
  DeepPartial<RefreshToken>,
  'id' | 'userId' | 'validSince' | 'user'
>;

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>
  ) {}

  public getValidTokenWithUser = async (token: string) =>
    this.refreshTokenRepository.findOne({
      where: {
        token,
        blackListed: false,
        validUntil: MoreThan(new Date()),
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

  public update = async (
    token: string,
    { validUntil, blackListed, lastUsed }: RefreshTokenUpdateDto
  ) =>
    this.refreshTokenRepository.update(
      { token },
      {
        validUntil,
        blackListed,
        lastUsed,
      }
    );

  public blacklistToken = async (token: string) =>
    this.refreshTokenRepository.update({ token }, { blackListed: true });
}
