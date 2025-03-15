import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

type CurrentCvContextType = {
  currentCvId: string | null;
  setCurrentCvId: (action: React.SetStateAction<null | string>) => void;
};

export const CURRENT_CV_KEY = 'currentCvId';

const CurrentCvContext = createContext<CurrentCvContextType | undefined>(
  undefined
);

export const CurrentCvProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [currentCvId, setCurrentCvIdState] = useState<string | null>(() => {
    if (!!window) {
      try {
        return localStorage.getItem(CURRENT_CV_KEY);
      } catch (error) {
        console.error('Failed to load currentCvId from localStorage:', error);
        return null;
      }
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (currentCvId !== null) {
          localStorage.setItem(CURRENT_CV_KEY, currentCvId);
        } else {
          localStorage.removeItem(CURRENT_CV_KEY);
        }
      } catch (error) {
        console.error('Failed to save currentCvId to localStorage:', error);
      }
    }
  }, [currentCvId]);

  const setCurrentCvId = useCallback(
    (setStateAction: React.SetStateAction<string | null>) => {
      setCurrentCvIdState(setStateAction);
    },
    []
  );

  const value = useMemo(
    () => ({
      currentCvId,
      setCurrentCvId,
    }),
    [currentCvId, setCurrentCvId]
  );

  return (
    <CurrentCvContext.Provider value={value}>
      {children}
    </CurrentCvContext.Provider>
  );
};

export const useCurrentCv = (): CurrentCvContextType => {
  const context = useContext(CurrentCvContext);
  if (!context) {
    throw new Error('useCurrentCv must be used within a CurrentCvProvider');
  }
  return context;
};
