import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material';

export interface BaseListItemProps {
  _id: string;
  selected?: boolean;
  onClick?: (id: string) => void;
  sx?: SxProps<Theme>;
}

export interface BaseListProps<T extends { _id: string }> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  loading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  containerSx?: SxProps<Theme>;
  listSx?: SxProps<Theme>;
  pagination?: {
    page: number;
    totalPages: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  };
}

export interface StandardListItemProps<T> extends BaseListItemProps {
  item: T;
  primary: string | ReactNode;
  secondary?: string | ReactNode;
  actions?: ReactNode;
  highlight?: boolean;
}
