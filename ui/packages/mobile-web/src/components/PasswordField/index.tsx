import { TextInput, TextInputProps } from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useState } from 'react';
import { DefaultIconButton } from '../IconButton';

const PasswordField = (props: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      rightSection={
        <DefaultIconButton>
          {showPassword ? (
            <IconEyeOff onClick={() => setShowPassword(false)} />
          ) : (
            <IconEye onClick={() => setShowPassword(true)} />
          )}
        </DefaultIconButton>
      }
    />
  );
};

export default PasswordField;
