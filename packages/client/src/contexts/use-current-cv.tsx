import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

type CurrentCvContextType = {
  currentCvId: string | null;
  setCurrentCvId: (id: string | null) => void;
};

const CurrentCvContext = createContext<CurrentCvContextType | undefined>(undefined);

export const CurrentCvProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentCvId, setCurrentCvIdState] = useState<string | null>(null);

  const setCurrentCvId = useCallback((id: string | null) => {
    setCurrentCvIdState(id);
  }, []);

  const value = useMemo(
    () => ({
      currentCvId,
      setCurrentCvId,
    }),
    [currentCvId, setCurrentCvId]
  );

  return <CurrentCvContext.Provider value={value}>{children}</CurrentCvContext.Provider>;
};

export const useCurrentCv = (): CurrentCvContextType => {
  const context = useContext(CurrentCvContext);
  if (!context) {
    throw new Error('useCurrentCv must be used within a CurrentCvProvider');
  }
  return context;
};
