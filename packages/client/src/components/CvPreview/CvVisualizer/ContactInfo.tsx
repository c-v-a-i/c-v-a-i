import React from 'react';
import { Box } from '@mui/material';
import type { GetCvInformationQuery } from '../../../generated/graphql';
import { EditableTypography } from '../EditableTypography';

type ContactInfoProps = {
  cvId: string;
  title: string;
  contactInfo: GetCvInformationQuery['getCv']['contactInfo'];
};

export const ContactInfo: React.FC<ContactInfoProps> = ({ cvId, title, contactInfo }) => {
  // const [updateCvTitle] = useUpdateCvTitleMutation();
  // const [updateContactInfo] = useUpdateContactInfoMutation();

  const handleTitleUpdate = async (value: string) => {
    // await updateCvTitle({ variables: { id: cvId, title: value } });
  };

  const handleContactInfoUpdate = async (field: 'email' | 'phone', value: string) => {
    // const input = { id: contactInfo.id, [field]: value };
    // await updateContactInfo({ variables: { input } });
  };

  return (
    <Box>
      <EditableTypography id={`cv-title-${cvId}`} value={title} onSave={handleTitleUpdate} variant="h3" />
      <EditableTypography
        id={`contact-info-email-${contactInfo.id}`}
        value={contactInfo.email}
        onSave={(value) => handleContactInfoUpdate('email', value)}
        variant="body1"
      />
      <EditableTypography
        id={`contact-info-phone-${contactInfo.id}`}
        value={contactInfo.phone}
        onSave={(value) => handleContactInfoUpdate('phone', value)}
        variant="body1"
      />
    </Box>
  );
};
