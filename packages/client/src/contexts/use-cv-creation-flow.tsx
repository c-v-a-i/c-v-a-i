import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

type CreateCvResponse = {
  newCvId: string;
  changesSummarization: string;
};

type CvCreationFlowContextType = {
  templateId?: string;
  prompt?: string;
  templateCvSummarization?: string;
  setTemplateId: (id: string) => void;
  setPrompt: (prompt: string) => void;
  createCv: () => Promise<CreateCvResponse>;
  startFlow: (templateId?: string) => void;
  clearForm: () => void;
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

  useEffect(() => {
    if (!templateId) return;
    setTemplateCvSummarization(`${templateId} summarization`);
  }, [templateId]);

  const createCv = useCallback(async () => {
    // DUMMY
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        newCvId: '228',
        changesSummarization: 'New CV highlighting...',
      };
    } finally {
      setTemplateId(undefined);
      setPrompt(undefined);
      // closeDialog();
    }
  }, []);

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
