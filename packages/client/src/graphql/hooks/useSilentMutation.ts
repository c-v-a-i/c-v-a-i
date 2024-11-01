import {
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  useMutation as useApolloMutation,
} from '@apollo/client';
import { DocumentNode } from 'graphql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSilentMutation = <TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>,
): MutationTuple<TData, TVariables> => {
  const [mutationFn, mutationState] = useApolloMutation(mutation, options);

  return [mutationFn, mutationState];
};

export default useSilentMutation;
