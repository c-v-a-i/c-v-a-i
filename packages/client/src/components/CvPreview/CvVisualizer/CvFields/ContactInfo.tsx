import React from 'react';
import type { UpdateContactInfoMutationVariables } from '../../../../generated/graphql';
import {
  GetContactInfoComponent,
  refetchGetContactInfoQuery,
  useUpdateContactInfoMutation,
} from '../../../../generated/graphql';
import { Box, Typography } from '@mui/material';
import { EditableTypography } from '../../../atoms';
import type { CvEntryComponentProps, UpdateFieldProps } from '../types';

export const ContactInfo = ({ cvId }: CvEntryComponentProps) => {
  const [updateContactInfo] = useUpdateContactInfoMutation({
    refetchQueries: [
      refetchGetContactInfoQuery({
        cvId,
      }),
    ],
  });

  const updateField = async ({
    fieldName,
    value,
  }: UpdateFieldProps<UpdateContactInfoMutationVariables>) => {
    await updateContactInfo({
      variables: {
        cvId,
        [fieldName]: value,
      },
    });
  };

  return (
    <GetContactInfoComponent
      variables={{
        cvId,
      }}
    >
      {({ data: { getCv: { contactInfo } = {} } = {}, loading }) => {
        if (loading) {
          return <Typography>Loading...</Typography>;
        }
        if (!contactInfo) {
          return <Typography>No contact info available</Typography>;
        }

        return (
          <Box>
            <EditableTypography
              id={`contact-info-name-${contactInfo._id}`}
              value={contactInfo.name}
              onSave={(name) => updateField({ fieldName: 'name', value: name })}
              variant="h3"
            />
            <EditableTypography
              id={`contact-info-email-${contactInfo._id}`}
              value={contactInfo.email}
              onSave={(email) =>
                updateField({ fieldName: 'email', value: email })
              }
              variant="body1"
            />
            <EditableTypography
              id={`contact-info-phone-${contactInfo._id}`}
              value={contactInfo.phone}
              onSave={(phone) =>
                updateField({ fieldName: 'phone', value: phone })
              }
              variant="body1"
            />
          </Box>
        );
      }}
    </GetContactInfoComponent>
  );
};
