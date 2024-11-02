import type { MutationHookOptions, MutationTuple, OperationVariables } from '@apollo/client';
import { useMutation as useApolloMutation } from '@apollo/client';
import type { DocumentNode } from 'graphql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSilentMutation = <TData = any, TVariables extends OperationVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
): MutationTuple<TData, TVariables> => {
  const [mutationFn, mutationState] = useApolloMutation(mutation, options as OperationVariables);

  // @ts-ignore dont't care. this should work.
  return [mutationFn, mutationState];
};

export default useSilentMutation;
