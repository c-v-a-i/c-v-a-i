import { registerEnumType } from '@nestjs/graphql';

export enum JsonDiffOperationType {
  ADD = 'add',
  REMOVE = 'remove',
  REPLACE = 'replace',
  MOVE = 'move',
  COPY = 'copy',
  TEST = 'test',
}

registerEnumType(JsonDiffOperationType, {
  name: 'JsonDiffOperationType',
});
