import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  refetchGetCvsQuery,
  useTransformCvMutation,
} from '../../generated/graphql';
import { useCurrentCv } from '../use-current-cv';

type CvGenerationResult =
  | {
      status: 'success';
      newCvId: string;
      message: string;
    }
  | {
      status: 'error';
      message: string;
    }
  | {
      status: 'loading' | undefined;
    };

type CvCreationFlowContextType = {
  templateId?: string;
  prompt?: string;
  templateCvSummarization?: string;
  setTemplateId: (id: string) => void;
  setPrompt: (prompt: string) => void;
  createCv: () => Promise<void>;
  startFlow: (templateId?: string) => void;
  clearForm: () => void;
  cvGenerationResult: CvGenerationResult;
};

const CvCreationFlowContext = createContext<
  CvCreationFlowContextType | undefined
>(undefined);

export const CvCreationFlowProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [templateId, setTemplateId] = useState<string>();
  const [prompt, setPrompt] = useState<string>();
  const [templateCvSummarization, setTemplateCvSummarization] =
    useState<string>();
  const [cvGenerationResult, setCvGenerationResult] =
    useState<CvGenerationResult>({ status: undefined });

  const { setCurrentCvId } = useCurrentCv();

  const [transformCvMutation, { data, loading, error }] =
    useTransformCvMutation();

  useEffect(
    function getTemplateSummarization() {
      if (!templateId) return;
      setTemplateCvSummarization(`${templateId} summarization`);
    },
    [templateId]
  );

  useEffect(
    function getCreateCvResult() {
      if (error) {
        setCvGenerationResult({
          status: 'error',
          message: error.message,
        });
      } else if (loading) {
        setCvGenerationResult({
          status: 'loading',
        });
      } else if (data) {
        const newCvId = data.transformCv.cv._id;
        setCvGenerationResult({
          status: 'success',
          newCvId: newCvId,
          message: data.transformCv.comment,
        });
        setCurrentCvId(newCvId);
      }
    },
    [data, loading, error, setCurrentCvId]
  );

  const createCv = useCallback(async () => {
    if (!templateId) {
      console.error('Template ID is not set');
      return;
    }
    if (!prompt) {
      console.error('Prompt is not set');
      return;
    }

    transformCvMutation({
      variables: {
        templateId,
        message: prompt,
      },
      refetchQueries: [refetchGetCvsQuery()],
    }).finally(() => {
      // setTemplateId(undefined);
      // setPrompt(undefined);
    });
  }, [prompt, templateId, transformCvMutation]);

  const startFlow = useCallback((id?: string) => {
    setTemplateId(id);
    // openDialog();
  }, []);

  const clearForm = useCallback(() => {
    setTemplateId(undefined);
    setPrompt(undefined);
  }, []);

  return (
    <CvCreationFlowContext.Provider
      value={{
        templateId,
        prompt,
        templateCvSummarization,
        setTemplateId,
        setPrompt,
        createCv,
        startFlow,
        clearForm,
        cvGenerationResult,
      }}
    >
      {children}
    </CvCreationFlowContext.Provider>
  );
};

export const useCvCreationFlow = (): CvCreationFlowContextType => {
  const context = useContext(CvCreationFlowContext);
  if (!context) {
    throw new Error(
      'useCvCreationFlow must be used within a CvCreationFlowProvider'
    );
  }
  return context;
};
