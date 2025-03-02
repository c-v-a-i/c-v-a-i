import { keyframes } from '@mui/material';

export const textAppear = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(10px) scale(0.8);
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) scale(1);
  }
`;

export const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.6; transform: scale(0.98); }
`;
