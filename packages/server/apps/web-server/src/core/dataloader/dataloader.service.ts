import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@server/entities';
import DataLoader from 'dataloader';
import { groupBy, keyBy } from 'lodash/fp';
import { FindOptionsWhere, In, ObjectLiteral, Repository } from 'typeorm';

// TODO: why scope like that?
// @Injectable()
@Injectable({ scope: Scope.REQUEST })
export class DataloaderService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public readonly userLoader = new DataLoader<string, User>(async (userIds) => {
    const users = await this.userRepository.findBy({ id: In([...userIds]) });
    const userMap = new Map(users.map((user) => [user.id, user]));
    return userIds.map((id) => userMap.get(id)).flatMap((x) => (x ? [x] : []));
  });

  private generateLoaderByFK = <T extends ObjectLiteral>(
    repository: Repository<T>,
    fkName: keyof T,
    fieldName = `${String(fkName)}Id`
  ) => {
    return new DataLoader<string, T[]>(
      async (ids) => {
        const entities = await repository.createQueryBuilder().where(`"${fieldName}" IN(:...ids)`, { ids }).getMany();

        const keyed = groupBy(`${fieldName}`, entities);

        return ids.map((id) => keyed[id] || []);
      },
      { cache: false }
    );
  };

  private generateLoaderByPK = <T extends ObjectLiteral>(repository: Repository<T>, idColumnName: keyof T = 'id') => {
    return new DataLoader<string, T>(
      async (ids) => {
        const whereExp = {
          [idColumnName]: In(ids as string[]),
        } as FindOptionsWhere<T>;
        const entities = await repository.find({
          where: whereExp,
          withDeleted: true,
        });

        const keyedById = keyBy(idColumnName, entities);

        return ids.map((id) => keyedById[id]);
      },
      { cache: false }
    );
  };

  private generateOneToOneLoader = <T extends ObjectLiteral>(
    repository: Repository<T>,
    fkName: keyof T,
    fieldName = `${String(fkName)}Id`
  ) => {
    return new DataLoader<string, T>(
      async (ids) => {
        const entities = await repository.createQueryBuilder().where(`"${fieldName}" IN(:...ids)`, { ids }).getMany();

        const keyed = keyBy(`${fieldName}`, entities);

        return ids.map((id) => keyed[id]);
      },
      { cache: false }
    );
  };
}
