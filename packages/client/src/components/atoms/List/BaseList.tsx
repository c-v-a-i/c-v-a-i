import React from 'react';
import {
  CircularProgress,
  List,
  Box,
  Pagination,
  Typography,
  styled,
} from '@mui/material';
import type { BaseListProps } from './types';

const ListContentContainer = styled(Box)(() => ({
  flex: 1,
  overflowY: 'auto',
  minHeight: 0,
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  width: 'fit-content',
  alignSelf: 'center',
  borderRadius: 999,
  padding: 2,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1,
  border: `1px solid ${theme.palette.divider}`,
}));

export function BaseList<T extends { _id: string }>({
  items,
  renderItem,
  loading,
  error,
  emptyMessage = 'No items available',
  containerSx,
  listSx,
  pagination,
}: BaseListProps<T>): JSX.Element {
  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" my={3}>
          <CircularProgress size={24} />
        </Box>
      );
    }

    if (error) {
      return (
        <Typography color="error" variant="body2" sx={{ p: 2 }}>
          Error: {error.message}
        </Typography>
      );
    }

    if (!items || items.length === 0) {
      return (
        <Typography variant="body2" sx={{ p: 2 }}>
          {emptyMessage}
        </Typography>
      );
    }

    return (
      <List dense sx={{ width: '100%', ...listSx }}>
        {items.map((item, index) => (
          <React.Fragment key={item._id}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </List>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      sx={containerSx}
    >
      <ListContentContainer
        sx={{
          paddingBottom: pagination ? '16px' : 0,
        }}
      >
        {renderContent()}
      </ListContentContainer>

      {pagination && pagination.totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={pagination.onChange}
            color="primary"
            size="small"
          />
        </PaginationContainer>
      )}
    </Box>
  );
}
