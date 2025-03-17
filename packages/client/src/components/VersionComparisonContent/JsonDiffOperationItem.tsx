import type { JSONDiffOperation } from './types';
import { Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { match } from 'ts-pattern';
import { JsonDiffOperationType } from '../../generated/graphql';
import { Column, Row } from '../atoms';
import { entries } from '@c-v-a-i/common/lib';

export type JSONDiffOperationItemProps = JSONDiffOperation & { _id: string };

// TODO: refactor. it needs to be more sophisticated
export const JsonDiffOperationItem = ({
  value,
  path,
  op,
}: JSONDiffOperationItemProps) => {
  const theme = useTheme();
  const diffOperationValueObject = useMemo(
    () => (value ? JSON.parse(value) : null),
    [value]
  );

  const operationColor = match(op)
    .with(JsonDiffOperationType.Add, () => theme.palette.success.main)
    .with(JsonDiffOperationType.Remove, () => theme.palette.error.main)
    .otherwise(() => undefined);

  return (
    <Column
      sx={{
        gap: 1,
        color: operationColor,
      }}
    >
      <Row gap={1}>
        <Typography>{op}</Typography>
        <Typography>{path}</Typography>
      </Row>

      {entries(diffOperationValueObject).map(([key, value]) => (
        <Row key={key as string} gap={1}>
          <Typography>{key as string}</Typography>
          <Typography>{value}</Typography>
        </Row>
      ))}
    </Column>
  );
};
