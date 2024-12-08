import { useField } from 'formik';
import type { TextFieldProps } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material';

interface FormTextFieldProps extends Omit<TextFieldProps, 'name' | 'value' | 'onBlur' | 'error' | 'helperText'> {
  name: string;
  defaultHelperText?: string;
}

export const FormTextField = ({
  required,
  name,
  InputProps,
  onChange: onChangeProp,
  defaultHelperText,
  ...other
}: FormTextFieldProps) => {
  const [{ value, onBlur }, { error, touched }, { setValue }] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value).then(/* safe to ignore */);
    if (onChangeProp) {
      onChangeProp(event);
    }
  };

  return (
    <MuiTextField
      margin="normal"
      InputLabelProps={{ shrink: true, required }}
      variant="filled"
      error={touched && Boolean(error)}
      helperText={defaultHelperText ?? (touched && error)}
      fullWidth
      value={value ?? ''}
      onBlur={onBlur}
      onChange={handleChange}
      onWheel={(e) => (e.target as HTMLElement).blur()}
      InputProps={InputProps}
      {...other}
    />
  );
};
