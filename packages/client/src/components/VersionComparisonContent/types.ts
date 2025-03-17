import type { CompareVersionsQuery } from '../../generated/graphql';

export type VersionComparisonContentProps = Omit<
  CompareVersionsQuery['compareVersions'],
  '__typename'
>;
export type JSONDiffOperation =
  VersionComparisonContentProps['operations'][number];
