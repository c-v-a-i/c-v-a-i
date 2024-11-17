import {
  CountArgs,
  FindAllArgs,
  FindAllByIdsArgs,
  FindOneArgs,
  ObjectLiteralWithMetadata,
  RemoveOneArgs,
} from './interfaces';
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOneOptions, In, Repository, SaveOptions } from 'typeorm';

interface Data<Entity extends ObjectLiteralWithMetadata> {
  data: DeepPartial<Entity>;
}

interface UpdateData<Entity extends ObjectLiteralWithMetadata> {
  data: DeepPartial<Entity> & { id: string };
}

interface CreateInput<Entity extends ObjectLiteralWithMetadata> extends Data<Entity> {
  options?: SaveOptions;
}

interface UpdateInput<Entity extends ObjectLiteralWithMetadata> extends UpdateData<Entity> {
  searchParams?: FindOneArgs<Entity>['searchParams'];
  options?: SaveOptions;
}

interface CreateManyInput<Entity extends ObjectLiteralWithMetadata> {
  data: Array<DeepPartial<Entity>>;
  searchParams?: FindOneArgs<Entity>['searchParams'];
}

interface RemoveInput<Entity extends ObjectLiteralWithMetadata> extends RemoveOneArgs<Entity> {
  isSoftRemove?: boolean;
}

interface RemoveManyInput<Entity extends ObjectLiteralWithMetadata> {
  searchParams?: FindAllArgs<Entity>['searchParams'];
  isSoftRemove?: boolean;
}

interface EnhanceWithScope<Entity extends ObjectLiteralWithMetadata> {
  searchParams?: FindOneArgs<Entity>['searchParams'];
  scopeVar?: string;
}

@Injectable()
export class CrudService<Entity extends ObjectLiteralWithMetadata> {
  private readonly order!: FindOneOptions<Entity>['order'];

  private readonly name!: string;

  private repository!: Repository<Entity>;

  private readonly scope!: keyof Entity | null;

  constructor(
    name: string,
    order: FindOneOptions<Entity>['order'],
    repository: Repository<Entity>,
    scope: keyof Entity | null
  ) {
    this.order = order;
    this.name = name;
    this.repository = repository;
    this.scope = scope;
  }

  public find = async ({ searchParams, relations, withDeleted, select }: FindAllArgs<Entity>, scopeVar?: string) => {
    const where = this.enhanceWithScope({
      searchParams,
      scopeVar,
    });
    return this.repository.find({
      select,
      where,
      relations,
      withDeleted,
      order: this.order,
    });
  };

  public findOne = async (
    { id, relations, searchParams, withDeleted, select }: FindOneArgs<Entity>,
    scopeVar?: string
  ) => {
    const where = this.enhanceWithScope({
      searchParams,
      scopeVar,
    });
    const entity = await this.repository.findOne({
      select,
      where: {
        ...where,
        ...(id && { id }),
      },
      relations,
      withDeleted,
    });

    if (!entity) {
      throw new NotFoundException(`${this.name}${id ? ` with id ${id}` : ''} not found`);
    }

    return entity;
  };

  public findAll = async (
    { pagination = {}, relations, searchParams, withDeleted, select, order }: FindAllArgs<Entity> = {},
    scopeVar?: string
  ) => {
    const where = this.enhanceWithScope({ searchParams, scopeVar });
    return this.repository.find({
      select,
      where,
      relations,
      withDeleted,
      order: order ?? this.order,
      take: pagination.limit,
      skip: pagination.offset,
    });
  };

  public findAllAndCount = async (
    { pagination = {}, relations, searchParams, withDeleted, select, order }: FindAllArgs<Entity> = {},
    scopeVar?: string
  ) => {
    const where = this.enhanceWithScope({ searchParams, scopeVar });
    return this.repository.findAndCount({
      select,
      where,
      relations,
      withDeleted,
      order: order ?? this.order,
      take: pagination.limit,
      skip: pagination.offset,
    });
  };

  public count = async ({ searchParams, withDeleted }: CountArgs<Entity> = {}, scopeVar?: string) => {
    const where = this.enhanceWithScope({ searchParams, scopeVar });
    return this.repository.count({
      where,
      withDeleted,
    });
  };

  public findAllByIds = async (
    { ids, pagination = {}, relations, searchParams, withDeleted, select }: FindAllByIdsArgs<Entity>,
    scopeVar?: string
  ) => {
    const where = this.enhanceWithScope({
      searchParams,
      scopeVar,
    });
    return this.repository.find({
      select,
      where: {
        ...where,
        ...{ id: In(ids) },
      },
      relations,
      withDeleted,
      order: this.order,
      take: pagination.limit,
      skip: pagination.offset,
    });
  };

  public createDto = (data: DeepPartial<Entity>) => {
    return this.repository.create(data);
  };

  public createManyDto = (data: DeepPartial<Entity>[]) => {
    return this.repository.create(data);
  };

  public save = async ({ data, options }: CreateInput<Entity>, scopeVar?: string) => {
    const scopeParams = this.enhanceWithScope({ scopeVar });
    const entityDto = this.createDto({ ...data, ...scopeParams });
    return this.saveDto(entityDto, options);
  };

  public saveDto = async (entity: Entity, options?: SaveOptions) => {
    return this.repository.save(entity, options);
  };

  public saveMany = async ({ data }: CreateManyInput<Entity>, scopeVar?: string) => {
    const scopeParams = this.enhanceWithScope({ scopeVar });
    const enhancedData = data.map((d) => ({
      ...d,
      ...scopeParams,
    }));
    const entityDto = this.createManyDto(enhancedData);
    return this.repository.save(entityDto);
  };

  public update = async ({ data, searchParams, options }: UpdateInput<Entity>, scopeVar?: string): Promise<Entity> => {
    const { id, ...updatedFields } = data;
    const existingEntity = await this.findOne({ id: data.id, searchParams }, scopeVar);

    const updatedProperties = updatedFields as DeepPartial<Entity>;

    const mergedEntity = this.repository.merge(existingEntity, updatedProperties);

    return this.repository.save(mergedEntity, options);
  };

  // public updateMany = async ({ data }: UpdateManyInput<Entity>, scopeVar?: string) => {
  //   const scopeParams = this.enhanceWithScope({ scopeVar });
  //   const enhancedData = data.map((d) => ({
  //     ...d,
  //     ...scopeParams,
  //   }));
  //   const entityDto = this.createManyDto(enhancedData);
  //   return this.repository.save(entityDto);
  // };

  public removeOne = async ({ id, searchParams, isSoftRemove = true }: RemoveInput<Entity>, scopeVar?: string) => {
    if (!isSoftRemove) {
      const toRemoveDto = this.createDto({ id } as Entity);
      await this.repository.remove(toRemoveDto);
      return true;
    }

    const entity = await this.findOne({ id, searchParams }, scopeVar);
    const deletedAt = new Date();
    const deletedEntityDto = this.createDto({
      ...entity,
      deletedAt,
    });
    await this.repository.save(deletedEntityDto);

    return true;
  };

  public removeMany = async ({ searchParams, isSoftRemove = true }: RemoveManyInput<Entity>, scopeVar?: string) => {
    const data = await this.findAll({ searchParams }, scopeVar);

    if (!isSoftRemove) {
      await this.repository.remove(data);
      return true;
    }

    const deleteDateUtc = new Date();
    const scopeParams = this.enhanceWithScope({ scopeVar });
    const enhancedData = data.map((d) => ({
      ...d,
      ...scopeParams,
      deleteDateUtc,
    }));
    const deletedEntitiesDto = this.createManyDto(enhancedData);

    return this.repository.save(deletedEntitiesDto);
  };

  private enhanceWithScope = ({ searchParams = {}, scopeVar }: EnhanceWithScope<Entity>) => {
    if (this.scope) {
      if (!scopeVar) {
        throw new NotAcceptableException(`${String(this.scope)} scope was specified but no criteria provided`);
      }
      return Array.isArray(searchParams)
        ? searchParams.map((params) => ({
            ...params,
            [this.scope as keyof Entity]: scopeVar,
          }))
        : {
            ...searchParams,
            [this.scope]: scopeVar,
          };
    }

    return searchParams;
  };
}
