import React from 'react';
import type { CvEntryComponentProps, UpdateFieldProps } from '../types';
import type { UpdateAboutMeMutationVariables } from '../../../../generated/graphql';
import {
  GetAboutMeComponent,
  refetchGetAboutMeQuery,
  useUpdateAboutMeMutation,
} from '../../../../generated/graphql';
import { Box, Typography } from '@mui/material';
import { EditableTypography } from '../../../atoms';

export const AboutMe = ({ cvId }: CvEntryComponentProps) => {
  const [updateAboutMe] = useUpdateAboutMeMutation({
    refetchQueries: [
      refetchGetAboutMeQuery({
        cvId,
      }),
    ],
  });

  const updateField = async ({
    fieldName,
    value,
  }: UpdateFieldProps<UpdateAboutMeMutationVariables>) => {
    await updateAboutMe({
      variables: {
        cvId,
        [fieldName]: value,
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
              id={`about-me-fieldName-${aboutMe._id}`}
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
              id={`about-me-description-${aboutMe._id}`}
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
