import type { User } from '@server/entities';

export type UserGooglePayloadType = {
  readonly user: User;
  readonly accessToken: string;
  readonly refreshToken: string;
};
