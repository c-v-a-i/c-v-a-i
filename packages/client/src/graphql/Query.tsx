import type { BaseGqlComponentProps } from './common';
import { LoaderElement } from './common';
import type { OperationVariables } from '@apollo/client';
import type { ObservableQueryFields, QueryDataOptions } from '@apollo/client/react';
import { useQuery } from '@apollo/client/react';
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';

interface ChildrenProps<TData, TVariables extends OperationVariables = OperationVariables>
  extends ObservableQueryFields<TData, TVariables> {
  data: TData;
  loading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QueryProps<TData = any, TVariables extends OperationVariables = OperationVariables>
  extends Omit<QueryDataOptions<TData, TVariables>, 'children'>,
    BaseGqlComponentProps {
  children: (result: ChildrenProps<TData, TVariables>) => JSX.Element;
}

const Query = <TData, TVariables extends OperationVariables = OperationVariables>({
  client,
  query,
  children,
  variables,
  loader = (
    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
      <LoaderElement />
    </Box>
  ),
  redirectOnErrorUrl,
  disableLoader,
  ...otherProps
}: QueryProps<TData, TVariables>) => {
  const { loading, error, data, ...other } = useQuery<TData, TVariables>(query, {
    variables,
    ...otherProps,
  });

  if (loading) {
    return disableLoader ? null : loader;
  }

  if (error) {
    const graphqlException = error.graphQLErrors[0]?.extensions?.response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authError = (graphqlException as any)?.statusCode === 401;
    if (authError) {
      console.error('Auth error');
      return null;
    }

    if (redirectOnErrorUrl) {
      return <Navigate to={redirectOnErrorUrl} />;
    }

    return null;
  }

  if (data) {
    return children({ data, loading, ...other });
  }

  return null;
};

export default Query;
