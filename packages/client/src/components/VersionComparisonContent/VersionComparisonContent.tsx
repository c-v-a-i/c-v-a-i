import { Box, Typography } from '@mui/material';
import { Column } from '../atoms';
import { SectionChangeDisplay } from './SectionChangeDisplay';
import {
  compareAboutMe,
  compareContactInfo,
  compareCvTitle,
  compareEducation,
  compareProjects,
  compareSkills,
  compareWorkExperience,
} from './comparators';
import type { VersionComparisonContentProps } from './types';
import { useMemo } from 'react';

export const VersionComparisonContent = ({
  left,
  right,
}: VersionComparisonContentProps) => {
  const changes = useMemo(() => {
    // Combine all sections
    return [
      compareCvTitle(left, right),
      compareAboutMe(left, right),
      compareWorkExperience(left, right),
      compareEducation(left, right),
      compareProjects(left, right),
      compareSkills(left, right),
      compareContactInfo(left, right),
    ].flatMap((x) => (x ? [x] : []));
  }, [left, right]);

  if (changes.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">
          No differences found between these versions
        </Typography>
      </Box>
    );
  }

  return (
    <Column gap={3} sx={{ width: '100%' }}>
      {changes.map((section, idx) => (
        <SectionChangeDisplay
          key={`${section.section}-${idx}`}
          section={section}
        />
      ))}
    </Column>
  );
};
