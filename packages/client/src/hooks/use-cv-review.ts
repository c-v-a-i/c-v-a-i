import { useMemo } from 'react';
import { useReviewCvLlmMutation } from './use-review-cv-llm-mutation';

interface UseCvReviewParams {
  cvId: string;
}

// TODO: there should be another hook:
//  - query CanDoCvReview. It disables the things on FE. On BE, there also should be validations.
export function useCvReview({ cvId }: UseCvReviewParams) {
  // This uses an auto-generated hook from your GraphQL codegen:
  // "skip" if no cvId is present, so it doesn't fire prematurely.
  const [cvReviewMutation, { data, loading, error }] = useReviewCvLlmMutation({
    variables: { cvId },
  });

  const reviewMessages = useMemo(() => data?.reviewCvLLM?.textReview, [data]);

  const fetchReview = () => {
    if (!cvId) return;
    cvReviewMutation().then();
  };

  return {
    reviewMessages,
    loading,
    error,
    fetchReview,
  };
}
