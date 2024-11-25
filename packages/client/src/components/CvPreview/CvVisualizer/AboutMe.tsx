import React from 'react';
import { Typography, Box } from '@mui/material';
import { EditableTypography } from '../EditableTypography';
import type { CvEntryComponentProps } from './types';
import type { UpdateAboutMeMutationVariables } from '../../../generated/graphql';
import { GetAboutMeComponent, refetchGetAboutMeQuery, useUpdateAboutMeMutation } from '../../../generated/graphql';

export const AboutMe = ({ cvId }: CvEntryComponentProps) => {
  const [updateAboutMe] = useUpdateAboutMeMutation({
    refetchQueries: [
      refetchGetAboutMeQuery({
        cvId,
      }),
    ],
  });

  const updateField = async (id: string, fieldName: keyof UpdateAboutMeMutationVariables, value: string) => {
    await updateAboutMe({
      variables: {
        cvId,
        id,
        [fieldName]: value,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateAboutMe: true,
      },
    });
  };

  return (
    <GetAboutMeComponent fetchPolicy={'cache-first'} variables={{ cvId }}>
      {({ data: { getAboutMe: aboutMe } = {}, loading }) =>
        loading || !aboutMe ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box>
            <EditableTypography
              id={`about-me-fieldName-${aboutMe.id}`}
              value={aboutMe.fieldName}
              onSave={(value) => updateField(aboutMe.id, 'fieldName', value)}
              variant="h5"
              gutterBottom
            />

            <EditableTypography
              id={`about-me-description-${aboutMe.id}`}
              value={aboutMe.description}
              onSave={(value) => updateField(aboutMe.id, 'description', value)}
              multiline
              variant="body1"
            />
          </Box>
        )
      }
    </GetAboutMeComponent>
  );
};
