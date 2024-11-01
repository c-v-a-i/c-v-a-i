import {
  ObservableQueryFields,
  QueryDataOptions,
  useQuery,
} from '@apollo/client/react';
import { OperationVariables } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { BaseGqlComponentProps, LoaderElement } from './common';

interface ChildrenProps<TData, TVariables>
  extends ObservableQueryFields<TData, TVariables> {
  data: TData;
  loading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QueryProps<TData = any, TVariables = OperationVariables>
  extends Omit<QueryDataOptions<TData, TVariables>, 'children'>,
    BaseGqlComponentProps {
  children: (result: ChildrenProps<TData, TVariables>) => JSX.Element;
}

const Query = <TData, TVariables = OperationVariables>({
  client,
  query,
  children,
  variables,
  loader = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
    >
      <LoaderElement />
    </Box>
  ),
  redirectOnErrorUrl,
  disableLoader,
  ...otherProps
}: QueryProps<TData, TVariables>) => {
  const { loading, error, data, ...other } = useQuery<TData, TVariables>(
    query,
    {
      variables,
      ...otherProps,
    },
  );

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
