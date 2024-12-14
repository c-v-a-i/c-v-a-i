import { useEffect, useRef } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface UseTypographyActionsPortalOptions {
  onEdit: () => void;
  onAiEdit?: (prompt: string) => void;
}

export const useTypographyActionsPortal = (
  options: UseTypographyActionsPortalOptions
) => {
  const { onEdit, onAiEdit } = options;

  const portalRootRef = useRef<HTMLDivElement | null>(null);
  const portalRootInstanceRef = useRef<Root | null>(null);

  const visibleRef = useRef(false);
  const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const showAiPromptRef = useRef(false);
  const aiPromptRef = useRef('');

  // Create portal root if it doesn't exist
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

  const renderPortal = () => {
    if (!portalRootInstanceRef.current || !visibleRef.current) return;

    // TODO: move it into a separate component
    const portalContent = (
      <Box
        sx={{
          position: 'absolute',
          top: positionRef.current.y,
          left: positionRef.current.x,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          padding: '4px',
          borderRadius: '4px',
          boxShadow: 1,
          zIndex: 9999,
        }}
      >
        <Tooltip title="Edit">
          <IconButton size="small" onClick={onEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {onAiEdit && (
          <Tooltip title="Enhance with AI">
            <IconButton
              size="small"
              onClick={() => {
                showAiPromptRef.current = true;
                renderPortal(); // Re-render to show AI prompt
              }}
            >
              <SmartToyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {showAiPromptRef.current && (
          <TextField
            defaultValue={aiPromptRef.current}
            onChange={(e) => {
              aiPromptRef.current = e.target.value;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAiEdit?.(aiPromptRef.current);
                aiPromptRef.current = '';
                showAiPromptRef.current = false;
                visibleRef.current = false;
                renderPortal(); // Re-render to hide portal
              } else if (e.key === 'Escape') {
                aiPromptRef.current = '';
                showAiPromptRef.current = false;
                renderPortal(); // Re-render to hide AI prompt
              }
            }}
            autoFocus
            variant="outlined"
            size="small"
            placeholder="Enter AI prompt"
            onBlur={() => {
              showAiPromptRef.current = false;
              renderPortal(); // Re-render to hide AI prompt
            }}
            sx={{ ml: 1 }}
          />
        )}
      </Box>
    );

    portalRootInstanceRef.current.render(portalContent);
  };

  const triggerPortal = (
    shouldShow: boolean,
    coords?: { x: number; y: number }
  ) => {
    visibleRef.current = shouldShow;
    if (coords) {
      positionRef.current = coords;
    }
    if (!shouldShow) {
      // Unmount the portal
      setTimeout(() => {
        if (portalRootInstanceRef.current) {
          portalRootInstanceRef.current.render(null);
        }
      }, 0);
    } else {
      renderPortal();
    }
  };

  return {
    triggerPortal,
  };
};
