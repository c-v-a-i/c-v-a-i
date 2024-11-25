import React from 'react';
import type { UpdateContactInfoMutationVariables } from '../../../generated/graphql';
import {
  GetContactInfoComponent,
  refetchGetContactInfoQuery,
  useUpdateContactInfoMutation,
} from '../../../generated/graphql';
import { Box, Typography } from '@mui/material';
import { EditableTypography } from '../EditableTypography';
import type { CvEntryComponentProps } from './types';

export const ContactInfo = ({ cvId }: CvEntryComponentProps) => {
  const [updateContactInfo] = useUpdateContactInfoMutation({
    refetchQueries: [
      refetchGetContactInfoQuery({
        cvId,
      }),
    ],
  });

  const updateField = async (id: string, fieldName: keyof UpdateContactInfoMutationVariables, value: string) => {
    await updateContactInfo({
      variables: {
        cvId,
        id,
        [fieldName]: value,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateContactInfo: true,
      },
    });
  };

  return (
    <GetContactInfoComponent
      fetchPolicy={'cache-first'}
      variables={{
        cvId,
      }}
    >
      {({ data: { getContactInfo: contactInfo } = {}, loading }) =>
        loading || !contactInfo ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box>
            <EditableTypography
              id={`contact-info-name-${contactInfo.id}`}
              value={contactInfo.name}
              onSave={(name) => updateField(contactInfo.id, 'name', name)}
              variant="h3"
            />
            <EditableTypography
              id={`contact-info-email-${contactInfo.id}`}
              value={contactInfo.email}
              onSave={(email) => updateField(contactInfo.id, 'email', email)}
              variant="body1"
            />
            <EditableTypography
              id={`contact-info-phone-${contactInfo.id}`}
              value={contactInfo.phone}
              onSave={(phone) => updateField(contactInfo.id, 'phone', phone)}
              variant="body1"
            />
          </Box>
        )
      }
    </GetContactInfoComponent>
  );
};
