import { registerEnumType } from '@nestjs/graphql';

enum ExampleType {
  EXAMPLE = 'EXAMPLE',
}

registerEnumType(ExampleType, {
  name: 'ExampleType',
});

export default ExampleType;
