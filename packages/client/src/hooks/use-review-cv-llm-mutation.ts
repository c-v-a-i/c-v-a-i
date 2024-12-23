import { useState } from 'react';

type DataMockType = {
  data: { reviewCvLLM: { textReview: string[] } } | null;
  loading?: boolean;
  error: Error | null;
};

export const useReviewCvLlmMutation = (props?: {
  variables?: {
    cvId: string;
  };
}): [Function, DataMockType] => {
  const [data, setData] = useState<DataMockType>({
    data: null,
    loading: undefined,
    error: null,
  });

  const newData = {
    data: {
      reviewCvLLM: {
        textReview: [
          'This is the first message of CV review.',
          'This is the second message of Cv review with\n a linebreak.',
          'This is the third mesage with some summarization etc.',
        ],
      },
    },
    loading: false,
    error: null,
  };

  return [
    async () => {
      setData(newData);
    },
    data,
  ];
};
