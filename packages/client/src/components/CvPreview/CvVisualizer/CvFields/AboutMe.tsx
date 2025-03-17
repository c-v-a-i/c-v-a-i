import React from 'react';
import type { CvEntryComponentProps, UpdateFieldProps } from '../types';
import {
  GetAboutMeComponent,
  refetchGetAboutMeQuery,
  refetchGetCvVersionHistoryQuery,
  useUpdateCvMutation,
} from '../../../../generated/graphql';
import { Box, Typography } from '@mui/material';
import { EditableTypography } from '../../../atoms';

export const AboutMe = ({ cvId }: CvEntryComponentProps) => {
  const [updateAboutMe] = useUpdateCvMutation({
    refetchQueries: [
      refetchGetAboutMeQuery({
        cvId,
      }),
      refetchGetCvVersionHistoryQuery({
        cvId,
      }),
    ],
  });

  const updateField = async ({
    fieldName,
    value,
  }: UpdateFieldProps<'aboutMe'>) => {
    await updateAboutMe({
      variables: {
        cvId,
        data: {
          aboutMe: {
            [fieldName]: value,
          },
        },
      },
    });
  };

  return (
    <GetAboutMeComponent variables={{ cvId }}>
      {({ data: { getCv: { aboutMe } = {} } = {}, loading }) => {
        if (loading && !aboutMe) {
          return <Typography>Loading...</Typography>;
        }

        if (!aboutMe) {
          return <Typography>About me is empty</Typography>;
        }

        return (
          <Box>
            <EditableTypography
              id={`about-me-name`}
              value={aboutMe.name}
              onSave={(value) =>
                updateField({
                  fieldName: 'name',
                  value,
                })
              }
              variant="h3"
              gutterBottom
            />

            <EditableTypography
              id={`about-me-fieldName`}
              value={aboutMe.fieldName}
              onSave={(value) =>
                updateField({
                  fieldName: 'fieldName',
                  value,
                })
              }
              variant="h5"
              gutterBottom
            />

            <EditableTypography
              id={`about-me-description`}
              value={aboutMe.description}
              onSave={(value) =>
                updateField({
                  fieldName: 'description',
                  value,
                })
              }
              multiline
              variant="body1"
            />
          </Box>
        );
      }}
    </GetAboutMeComponent>
  );
};
