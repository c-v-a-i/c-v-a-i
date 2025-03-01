import { Box, Typography } from '@mui/material';
import { useGetCvsQuery } from '../../../generated/graphql';
import { useMemo } from 'react';
import { SelectList } from '../../atoms';
import { useCvCreationFlow } from '../../../contexts';

// TODO: add loading and error states. maybe
export const TemplateStep = () => {
  const { data: { getCvs: _resumeList = [] } = {} } = useGetCvsQuery({
    fetchPolicy: 'cache-only',
  });
  const { templateId, setTemplateId } = useCvCreationFlow();

  const resumeList = useMemo(
    () => _resumeList.map(({ _id, name }) => ({ id: _id, label: name })),
    [_resumeList]
  );

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <SelectList
        label={'CV Template'}
        items={resumeList}
        onSelect={setTemplateId}
        defaultState={templateId}
      />

      <Typography variant="body2" color="text.secondary">
        Creating from scratch is currently unavailable
      </Typography>
    </Box>
  );
};
