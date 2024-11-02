import type {
  FetchResult,
  MutationFunctionOptions,
  MutationHookOptions,
  MutationResult,
  OperationVariables,
} from '@apollo/client';
import { useMutation as useApolloMutation } from '@apollo/client';
import type { DocumentNode } from 'graphql';
import { toast } from 'react-toastify';

interface ToastConfig {
  successText: string;
  errorText?: string;
}

interface MutationOptions<TData, TVariables extends OperationVariables>
  extends MutationFunctionOptions<TData, TVariables> {
  toastConfig: ToastConfig | null;
}

type MutationTuple<TData, TVariables extends OperationVariables> = [
  (options: MutationOptions<TData, TVariables>) => Promise<FetchResult<TData> | null>,
  MutationResult<TData>,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useMutation = <TData = any, TVariables extends OperationVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
): MutationTuple<TData, TVariables> => {
  const [mutationFn, mutationState] = useApolloMutation(mutation, options as OperationVariables);

  const mutationWithToast = async (mutationOptions: MutationOptions<TData, TVariables>) => {
    const { toastConfig } = mutationOptions;

    try {
      const data = await mutationFn(mutationOptions as OperationVariables);

      if (toastConfig) {
        toast(toastConfig.successText, {
          type: 'success',
        });
      }

      return data;
    } catch (e: unknown) {
      console.error(e);
      if (toastConfig) {
        toast(toastConfig.errorText ?? 'Oops, something is wrong.', {
          type: 'error',
        });
      }
    }

    return null;
  };

  return [mutationWithToast, mutationState];
};

export default useMutation;
