import { CustomScalar, Scalar } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql';

import constant from '../configs/constant';

function checkEmailAddress(value: string) {
  if (typeof value !== 'string') throw new UserInputError(`${value} is not string`);
  if (!constant.regex.email.test(value)) {
    throw new UserInputError(`${value} is not a valid email address`);
  }
  return value;
}

@Scalar('Email')
export class EmailScalar implements CustomScalar<String, String> {
  description = 'A field that value conforms to the standard email address format';

  serialize(value: string) {
    return checkEmailAddress(value);
  }

  parseValue(value: string) {
    return checkEmailAddress(value);
  }

  parseLiteral(ast: any) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as email address but got a: ${ast.kind}`);
    }
    if (!constant.regex.email.test(ast.value)) {
      throw new UserInputError(`${ast.value} is not a valid email address`);
    }
    return ast.value;
  }
}
