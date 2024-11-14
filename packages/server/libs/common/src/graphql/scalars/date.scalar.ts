import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  // @ts-expect-error - generic issue?
  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  // @ts-expect-error - generic issue?
  serialize(value: Date): number {
    return new Date(value).getTime(); // value sent to the client
  }

  /**
   * Ensures that we accept both string and timestamp dates.
   */
  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      // ast.value is in fact a string number
      return new Date(parseInt(ast.value, 10));
    }
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }

    // @ts-expect-error - generic issue?
    return null;
  }
}
