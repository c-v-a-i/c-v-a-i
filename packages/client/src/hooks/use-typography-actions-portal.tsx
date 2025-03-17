import { useEffect, useRef, useState } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface UseTypographyActionsPortalOptions {
  onEdit: () => void;
}

// FIXME: this hook is fucked up. I need to re-write it
export const useTypographyActionsPortal = (
  options: UseTypographyActionsPortalOptions
) => {
  const { onEdit } = options;

  const portalRootRef = useRef<HTMLDivElement | null>(null);
  const portalRootInstanceRef = useRef<Root | null>(null);
  const visibleRef = useRef(false);
  const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!portalRootRef.current) {
      const portalRoot = document.createElement('div');
      portalRoot.id = 'typography-actions-portal-root';
      document.body.appendChild(portalRoot);
      portalRootRef.current = portalRoot;
      portalRootInstanceRef.current = createRoot(portalRootRef.current);
    }
    return () => {
      if (portalRootInstanceRef.current) {
        portalRootInstanceRef.current.unmount();
        portalRootInstanceRef.current = null;
      }
      if (portalRootRef.current) {
        document.body.removeChild(portalRootRef.current);
        portalRootRef.current = null;
      }
    };
  }, []);

  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const renderPortal = () => {
    if (!portalRootInstanceRef.current || !visibleRef.current) return;
    setIsPortalVisible(true);

    const portalContent = (
      <Box
        onMouseDown={(e) => {
          // Prevent this click from closing the popup immediately
          e.stopPropagation();
        }}
        sx={{
          position: 'absolute',
          top: positionRef.current.y,
          left: positionRef.current.x,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          padding: '4px',
          borderRadius: '4px',
          boxShadow: 1,
          zIndex: 9999,
        }}
      >
        <IconButton
          size="small"
          onClick={() => {
            onEdit();
            triggerPortal(false);
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
    );

    portalRootInstanceRef.current.render(portalContent);
  };

  const triggerPortal = (
    shouldShow: boolean,
    coords?: { x: number; y: number }
  ) => {
    visibleRef.current = shouldShow;
    if (coords) positionRef.current = coords;

    if (!shouldShow) {
      // Clear the portal content
      setTimeout(() => {
        if (portalRootInstanceRef.current)
          portalRootInstanceRef.current.render(null);
        setIsPortalVisible(false);
      }, 0);
    } else {
      renderPortal();
    }
  };

  return {
    triggerPortal,
    isPortalVisible,
  };
};
