import React, { useCallback, useEffect, useState } from 'react';
import { Popover, Typography, styled } from '@mui/material';
import { format } from 'date-fns';
import type { CvVersionHistoryEntry } from '../../../generated/graphql';
import { useGetCvVersionHistoryLazyQuery } from '../../../generated/graphql';
import { toast } from 'react-toastify';
import { Box } from '../../atoms';
import { backgroundWithBackdrop } from '../../../theme';
import { BaseList, ListContainer, StandardListItem } from '../../atoms/List';

interface VersionHistoryPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  cvId: string;
}

const VersionHistoryHeader = () => (
  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, px: 1 }}>
    Version History
  </Typography>
);

const VersionHistoryPopoverContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 320,
  height: 600,
  padding: 8,
  ...backgroundWithBackdrop,
  backgroundColor: 'transparent',
}));

export const VersionHistoryPopover: React.FC<VersionHistoryPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  cvId,
}) => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(9);

  const [fetchVersionHistory, { loading, error, data }] =
    useGetCvVersionHistoryLazyQuery();

  const fetchData = useCallback(() => {
    if (!open) return;

    fetchVersionHistory({
      variables: {
        cvId,
        page,
        limit,
      },
    }).catch((e: Error) => {
      toast.error(e.message);
    });
  }, [open, page, limit, cvId, fetchVersionHistory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
  };

  const renderVersionItem = useCallback(
    (version: CvVersionHistoryEntry) => (
      <StandardListItem
        _id={version._id}
        item={version}
        primary={`Version ${version.versionNumber}${
          version.isCurrentVersion ? ' (Current)' : ''
        }`}
        secondary={`Created: ${format(
          new Date(version.createdAt),
          'MMM d, yyyy HH:mm'
        )}`}
        highlight={version.isCurrentVersion}
      />
    ),
    []
  );

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <VersionHistoryPopoverContainer>
        <ListContainer headerComponent={<VersionHistoryHeader />}>
          <BaseList
            items={data?.getCvVersionHistory?.items ?? []}
            renderItem={renderVersionItem}
            loading={loading}
            error={error}
            emptyMessage="No version history available"
            pagination={
              data?.getCvVersionHistory
                ? {
                    page,
                    totalPages:
                      data.getCvVersionHistory.paginationMetadata.totalPages,
                    onChange: handlePageChange,
                  }
                : undefined
            }
          />
        </ListContainer>
      </VersionHistoryPopoverContainer>
    </Popover>
  );
};

// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Pagination,
//   Popover,
//   styled,
//   Typography,
// } from '@mui/material';
// import { format } from 'date-fns';
// import type { CvVersionHistoryEntry } from '../../../generated/graphql';
// import { useGetCvVersionHistoryLazyQuery } from '../../../generated/graphql';
// import { toast } from 'react-toastify';
// import { Box } from '../../atoms';
// import { backgroundWithBackdrop } from '../../../theme';
//
// interface VersionHistoryPopoverProps {
//   open: boolean;
//   anchorEl: HTMLElement | null;
//   onClose: () => void;
//   cvId: string;
// }
//
// interface ErrorStateProps {
//   message: string;
// }
//
// interface VersionHistoryPaginationProps {
//   totalPages: number;
//   page: number;
//   onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
// }
//
// // Subcomponents
// const VersionHistoryHeader: React.FC = () => (
//   <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, px: 1 }}>
//     Version History
//   </Typography>
// );
//
// const VersionHistoryItem = ({
//   version,
// }: {
//   version: CvVersionHistoryEntry;
// }) => (
//   <ListItem
//     sx={{
//       backgroundColor: version.isCurrentVersion
//         ? 'rgba(25, 118, 210, 0.08)'
//         : 'transparent',
//       borderRadius: 1,
//       mb: 0.5,
//       cursor: 'pointer',
//       '&:hover': {
//         backgroundColor: 'rgba(25, 118, 210, 0.05)',
//       },
//     }}
//   >
//     <ListItemText
//       primary={`Version ${version.versionNumber}${
//         version.isCurrentVersion ? ' (Current)' : ''
//       }`}
//       secondary={`Created: ${format(
//         new Date(version.createdAt),
//         'MMM d, yyyy HH:mm'
//       )}`}
//     />
//   </ListItem>
// );
//
// const LoadingState: React.FC = () => (
//   <Box display="flex" justifyContent="center" my={3}>
//     <CircularProgress size={24} />
//   </Box>
// );
//
// const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
//   <Typography color="error" variant="body2" sx={{ p: 2 }}>
//     Error loading version history: {message}
//   </Typography>
// );
//
// const EmptyState: React.FC = () => (
//   <Typography variant="body2" sx={{ p: 2 }}>
//     No version history available
//   </Typography>
// );
//
// const VersionHistoryList = ({
//   versions,
// }: {
//   versions: CvVersionHistoryEntry[];
// }) => (
//   <List dense sx={{ width: '100%' }}>
//     {versions.map((version) => (
//       <VersionHistoryItem key={version._id} version={version} />
//     ))}
//   </List>
// );
//
// const VersionHistoryPagination = ({
//   totalPages,
//   page,
//   onChange,
// }: VersionHistoryPaginationProps) => {
//   if (totalPages <= 1) return null;
//
//   return (
//     <PaginationContainer>
//       <Pagination
//         count={totalPages}
//         page={page}
//         onChange={onChange}
//         color="primary"
//         size="small"
//       />
//     </PaginationContainer>
//   );
// };
//
// const ContentContainer = styled(Box)(({ theme }) => ({
//   flex: 1,
//   overflowY: 'auto',
//   minHeight: 0, // Critical for proper flex container scrolling
//   padding: theme.spacing(0, 1),
// }));
//
// const PaginationContainer = styled(Box)(({ theme }) => ({
//   width: 'fit-content',
//   display: 'flex',
//   background: 'red',
//   alignSelf: 'center',
//   justifyContent: 'center',
//   borderRadius: 12,
//   zIndex: 1,
//   backgroundColor: theme.palette.background.paper,
// }));
//
// const VersionHistoryPopoverContainer = styled(Box)(() => ({
//   display: 'flex',
//   flexDirection: 'column',
//   width: 320,
//   height: 600,
//   padding: 8,
//   ...backgroundWithBackdrop,
//   backgroundColor: 'transparent',
// }));
//
// // Main component
// export const VersionHistoryPopover: React.FC<VersionHistoryPopoverProps> = ({
//   open,
//   anchorEl,
//   onClose,
//   cvId,
// }) => {
//   const [page, setPage] = useState<number>(1);
//   const [limit] = useState<number>(9);
//
//   const [fetchVersionHistory, { loading, error, data }] =
//     useGetCvVersionHistoryLazyQuery();
//
//   // Memoize fetch function to prevent unnecessary re-renders
//   const fetchData = useCallback(() => {
//     if (!open) return;
//
//     fetchVersionHistory({
//       variables: {
//         cvId,
//         page,
//         limit,
//       },
//     }).catch((e: Error) => {
//       toast.error(e.message);
//     });
//   }, [open, page, limit, cvId, fetchVersionHistory]);
//
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);
//
//   const handlePageChange = (
//     _: React.ChangeEvent<unknown>,
//     value: number
//   ): void => {
//     setPage(value);
//   };
//
//   // Pure function to render content based on state
//   const renderContent = () => {
//     if (loading) return <LoadingState />;
//     if (error) return <ErrorState message={error.message} />;
//
//     const versionHistory = data?.getCvVersionHistory;
//     if (!versionHistory || versionHistory.items.length === 0) {
//       return <EmptyState />;
//     }
//
//     return <VersionHistoryList versions={versionHistory.items} />;
//   };
//
//   return (
//     <Popover
//       open={open}
//       anchorEl={anchorEl}
//       onClose={onClose}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'center',
//       }}
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'center',
//       }}
//     >
//       <VersionHistoryPopoverContainer>
//         <VersionHistoryHeader />
//         <ContentContainer>{renderContent()}</ContentContainer>
//         {data?.getCvVersionHistory && (
//           <VersionHistoryPagination
//             totalPages={data.getCvVersionHistory.paginationMetadata.totalPages}
//             page={page}
//             onChange={handlePageChange}
//           />
//         )}
//       </VersionHistoryPopoverContainer>
//     </Popover>
//   );
// };
