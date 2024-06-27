import { FC } from 'react';
import { Controller, Control } from 'react-hook-form';
import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from '@mui/material';

type FormData = {
  title: string;
  firstName: string;
  lastName: string;
  street: string;
  zipcode: string;
  city: string;
  email: string;
  phone: string;
};

type TextFieldProps = {
  name: keyof FormData;
  control: Control<FormData>;
  rules: any;
} & Omit<MUITextFieldProps, 'name'>;

export const TextField: FC<TextFieldProps> = ({
  name,
  control,
  rules,
  ...muiProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <MUITextField
          {...muiProps}
          {...field}
          error={!!error}
          helperText={error ? error.message : muiProps.helperText}
        />
      )}
    />
  );
};
