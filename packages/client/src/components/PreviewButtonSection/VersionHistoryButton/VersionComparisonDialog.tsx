// import React, { useMemo } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Box,
//   Typography,
//   Chip,
//   Divider,
//   CircularProgress,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { useCompareVersionsLazyQuery } from '../../../generated/graphql';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import EditIcon from '@mui/icons-material/Edit';
//
// interface VersionComparisonDialogProps {
//   open: boolean;
//   onClose: () => void;
//   cvId: string;
//   versionId: string;
// }
//
// const DiffContainer = styled(Box)(({ theme }) => ({
//   margin: theme.spacing(1, 0),
//   border: `1px solid ${theme.palette.divider}`,
//   borderRadius: theme.shape.borderRadius,
//   padding: theme.spacing(1),
//   maxHeight: '70vh',
//   overflow: 'auto',
// }));
//
// const DiffItem = styled(Box, {
//   shouldForwardProp: (prop) => prop !== 'operation',
// })<{ operation: string }>(({ theme, operation }) => ({
//   padding: theme.spacing(1),
//   marginBottom: theme.spacing(1),
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor:
//     operation === 'add'
//       ? theme.palette.success.light + '20'
//       : operation === 'remove'
//         ? theme.palette.error.light + '20'
//         : theme.palette.info.light + '20',
//   border: `1px solid ${
//     operation === 'add'
//       ? theme.palette.success.main
//       : operation === 'remove'
//         ? theme.palette.error.main
//         : theme.palette.info.main
//   }`,
// }));
//
// const PathChip = styled(Chip)(({ theme }) => ({
//   marginBottom: theme.spacing(1),
//   fontFamily: 'monospace',
//   fontSize: '0.75rem',
// }));
//
// export const VersionComparisonDialog: React.FC<
//   VersionComparisonDialogProps
// > = ({ open, onClose, cvId, versionId }) => {
//   const [compareVersions, { loading, error, data }] =
//     useCompareVersionsLazyQuery({
//       fetchPolicy: 'network-only',
//     });
//
//   React.useEffect(() => {
//     if (open && cvId && versionId) {
//       compareVersions({
//         variables: {
//           cvId,
//           sourceVersionId: versionId,
//         },
//       });
//     }
//   }, [open, cvId, versionId, compareVersions]);
//
//   const groupedOperations = useMemo(() => {
//     if (!data?.compareVersions?.operations) return null;
//
//     return data.compareVersions.operations.reduce(
//       (acc, op) => {
//         const pathParts = op.path.split('/').filter(Boolean);
//         const entryType = pathParts[0];
//
//         if (!acc[entryType]) {
//           acc[entryType] = [];
//         }
//
//         acc[entryType].push(op);
//         return acc;
//       },
//       {} as Record<string, typeof data.compareVersions.operations>
//     );
//   }, [data]);
//
//   const getOperationIcon = (op: string) => {
//     switch (op) {
//       case 'add':
//         return <AddIcon color="success" />;
//       case 'remove':
//         return <RemoveIcon color="error" />;
//       default:
//         return <EditIcon color="info" />;
//     }
//   };
//
//   const getReadablePathName = (path: string) => {
//     return path
//       .split('/')
//       .filter(Boolean)
//       .map((part) =>
//         part
//           .replace(/([A-Z])/g, ' $1')
//           .replace(/^./, (str) => str.toUpperCase())
//       )
//       .join(' › ');
//   };
//
//   const formatValue = (value: any) => {
//     if (value === undefined || value === null) return 'None';
//
//     if (typeof value === 'object') {
//       return JSON.stringify(value, null, 2);
//     }
//
//     return String(value);
//   };
//
//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       aria-labelledby="version-comparison-dialog-title"
//     >
//       <DialogTitle id="version-comparison-dialog-title">
//         Version Comparison
//       </DialogTitle>
//       <DialogContent>
//         {loading && (
//           <Box display="flex" justifyContent="center" my={4}>
//             <CircularProgress />
//           </Box>
//         )}
//
//         {error && (
//           <Typography color="error" align="center" my={4}>
//             Error loading comparison: {error.message}
//           </Typography>
//         )}
//
//         {!loading && !error && groupedOperations && (
//           <Box>
//             <Typography variant="subtitle1" gutterBottom>
//               Changes between versions:
//             </Typography>
//
//             {Object.entries(groupedOperations).map(([entryType, ops]) => (
//               <Box key={entryType} mb={3}>
//                 <Typography
//                   variant="h6"
//                   gutterBottom
//                   sx={{ textTransform: 'capitalize' }}
//                 >
//                   {entryType.replace(/([A-Z])/g, ' $1')}
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//
//                 <DiffContainer>
//                   {ops.map((op, idx) => (
//                     <DiffItem key={idx} operation={op.op}>
//                       <Box display="flex" alignItems="center" mb={1}>
//                         {getOperationIcon(op.op)}
//                         <Typography variant="subtitle2" sx={{ ml: 1 }}>
//                           {op.op.toUpperCase()}
//                         </Typography>
//                       </Box>
//
//                       <PathChip
//                         label={getReadablePathName(op.path)}
//                         variant="outlined"
//                       />
//
//                       {op.value !== undefined && (
//                         <Box mt={1}>
//                           <Typography
//                             variant="caption"
//                             component="div"
//                             color="text.secondary"
//                           >
//                             New Value:
//                           </Typography>
//                           <Typography
//                             component="pre"
//                             sx={{
//                               whiteSpace: 'pre-wrap',
//                               wordBreak: 'break-word',
//                               fontFamily: 'monospace',
//                               fontSize: '0.8rem',
//                               p: 1,
//                               bgcolor: 'background.paper',
//                               borderRadius: 1,
//                             }}
//                           >
//                             {formatValue(op.value)}
//                           </Typography>
//                         </Box>
//                       )}
//                     </DiffItem>
//                   ))}
//                 </DiffContainer>
//               </Box>
//             ))}
//           </Box>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

export default {};
