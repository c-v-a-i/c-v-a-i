import { Column } from '../atoms';
import type { VersionComparisonContentProps } from './types';
import { useMemo } from 'react';
import { BaseList } from '../atoms/List';
import { JsonDiffOperationItem } from './JsonDiffOperationItem';

export const VersionComparisonContent = ({
  operations: operationsRaw,
}: VersionComparisonContentProps) => {
  const operations = useMemo(
    () => operationsRaw.map((op, i) => ({ _id: i.toString(), ...op })),
    [operationsRaw]
  );

  return (
    <Column gap={1}>
      <BaseList<(typeof operations)[number]>
        items={operations}
        renderItem={(op) => <JsonDiffOperationItem {...op} />}
      />
    </Column>
  );
};
