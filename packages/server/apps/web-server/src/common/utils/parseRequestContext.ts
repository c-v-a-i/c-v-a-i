import type { ContextType, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { DecodedUserObjectType } from '../../auth/dto';

export const parseRequestContext = (context: ExecutionContext) => {
  const contextType = context.getType<ContextType | 'graphql'>();

  if (contextType === 'http') {
    const request = context.switchToHttp().getRequest();
    const { method, url, params, headers, body, query } = request;

    return {
      user: request.user,
      requestInfo: {
        name: method,
        method,
        url,
        params,
        headers,
        body,
        query,
        contextType,
      },
    };
  }

  if (contextType === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const user = request.user as DecodedUserObjectType | undefined;

    if (request.body) {
      const {
        body: { operationName, query, variables },
      } = request;

      return {
        user,
        requestInfo: {
          name: operationName,
          operationName,
          query,
          variables,
          contextType,
        },
      };
    }

    const {
      operation: { operation, name },
      fieldName,
      variableValues,
    } = ctx.getInfo();

    return {
      user: request.user as DecodedUserObjectType | undefined,
      requestInfo: {
        name: name.value,
        ws: true,
        fieldName,
        operation,
        operationName: name.value,
        variables: variableValues,
        contextType,
      },
    };
  }

  return { requestInfo: {} };
};
