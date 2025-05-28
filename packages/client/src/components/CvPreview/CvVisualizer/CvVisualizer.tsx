import React, { useCallback } from 'react';
import { Box, Divider, Skeleton } from '@mui/material';
import {
  AboutMe,
  ContactInfo,
  Education,
  Projects,
  Skills,
  WorkExperience,
} from './CvFields';
import { EditableTypography } from '../../atoms';
import {
  GetNameComponent,
  refetchGetCvVersionHistoryQuery,
  refetchGetNameQuery,
  useUpdateCvNameMutation,
} from '../../../generated/graphql';
import { customPalette, shadowStyles } from "../../../theme";

type CvVisualizerProps = {
  cvId: string;
};

export const CvVisualizer = ({ cvId }: CvVisualizerProps) => {
  // fetch positions of all the sections.

  // const {data: cvSections} = useGetCvSectionsPositions

  const [updateNameMutation] = useUpdateCvNameMutation({
    refetchQueries: [
      refetchGetCvVersionHistoryQuery({ cvId }),
      refetchGetNameQuery({ cvId }),
    ],
  });

  const handleUpdateName = useCallback(
    async (name: string) => {
      await updateNameMutation({
        variables: {
          cvId,
          name,
        },
      });
    },
    [cvId, updateNameMutation]
  );

  return (
    <Box
      sx={{
        gap: '20px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        maxWidth: '1400px',
        padding: '80px 80px',
        justifyContent: 'center',
        backgroundColor: customPalette.background.surface,
        boxShadow: shadowStyles.section.boxShadow
      }}
    >
      <GetNameComponent variables={{ cvId }}>
        {({ data }) => {
          const name = data?.getCv.name;
          if (!name) {
            return <Skeleton variant="text" width={'100%'} height={40} />;
          }
          return (
            <EditableTypography
              id={'cv-name'}
              value={name}
              onSave={handleUpdateName}
              variant="h3"
              sx={{
                textAlign: 'center',
              }}
            />
          );
        }}
      </GetNameComponent>

      <ContactInfo cvId={cvId} />

      <AboutMe cvId={cvId} />

      <Divider />

      <WorkExperience cvId={cvId} />

      <Divider />

      <Projects cvId={cvId} />

      <Divider />

      <Education cvId={cvId} />

      <Divider />

      <Skills cvId={cvId} />
    </Box>
    // </Box>
  );
};
