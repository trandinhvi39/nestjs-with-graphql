import { AuthenticationError, ApolloError } from 'apollo-server-express';

import constant from './constant';

const formatErrorResponse = (error) => {
  if (error.extensions && error.extensions.code) {
    if (error.originalError instanceof AuthenticationError) {
      return {
        status: constant.statusCode.unauthenticated,
        message: error.message,
        code: error.extensions.code,
      };
    }
    if (error.originalError instanceof ApolloError) {
      return {
        status:
          error.extensions.code === 'BAD_USER_INPUT'
            ? constant.statusCode.unprocessableEntity
            : constant.statusCode.errorServer,
        message: error.message.replace('Error: ', ''),
        code: error.extensions.code,
      };
    }
    return {
      status: constant.statusCode.errorServer,
      message: error.message,
      code: error.extensions.code,
    };
  }
  return { status: constant.statusCode.errorServer, message: error.details, code: error.code };
};

export default formatErrorResponse;
