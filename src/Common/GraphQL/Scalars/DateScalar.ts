import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value);
  }

  serialize(value: string): string {
    return value;
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
