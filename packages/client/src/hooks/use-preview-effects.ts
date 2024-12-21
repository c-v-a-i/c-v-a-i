import { useEffect } from 'react';
import { toast, Zoom } from 'react-toastify';
import { usePreviewMode } from '../contexts';

export function usePreviewEffects() {
  const { isPreviewing, togglePreviewMode } = usePreviewMode();

  useEffect(() => {
    let toastId: string | number | undefined;

    if (isPreviewing) {
      toastId = toast('Press Esc to exit preview mode', {
        autoClose: 1000,
        position: 'top-center',
        pauseOnHover: false,
        hideProgressBar: true,
        transition: Zoom,
        closeButton: false,
        closeOnClick: false,
      });

      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          togglePreviewMode();
        }
      };
      window.addEventListener('keydown', handleEsc);

      return () => {
        window.removeEventListener('keydown', handleEsc);
        if (toastId) {
          toast.dismiss(toastId);
        }
      };
    }
  }, [isPreviewing, togglePreviewMode]);
}
