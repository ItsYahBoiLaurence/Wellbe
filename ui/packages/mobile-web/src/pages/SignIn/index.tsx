import { Box, Container, Text, TextInput, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../api/services/auth';
import { PrimaryButton, TextButton } from '../../components/Buttons/Buttons';
import { PageHeader } from '../../components/PageHeader';
import PasswordField from '../../components/PasswordField';
import { LoginRequest } from '../../types';
import { APP_CONFIG } from '../../utils/constants';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/validators';

const SignInPage = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LoginRequest>({
    defaultValues: {
      email: '',
      password: '',
      companyId: APP_CONFIG.COMPANY_ID,
    },
  });

  const { mutate: login } = useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: (data) => {
      if (data) navigate('/');
    },
  });

  const handleLogin = async (data: LoginRequest) => {
    login(data);
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 16,
        paddingBottom: 16,
        height: '100vh',
      }}
    >
      <PageHeader previousPage="/get-started" />
      <Box
        component="form"
        display="flex"
        onSubmit={handleSubmit(handleLogin)}
        style={{
          justifyContent: 'space-between',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Box style={{ paddingTop: 12, paddingBottom: 12, marginBottom: 16 }}>
            <Title order={1}>Welcome back.</Title>
            <Text>Log in to your account</Text>
          </Box>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Invalid email address',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                error={error?.message}
                placeholder="Email Address"
                style={{ marginBottom: 16 }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              pattern: {
                value: PASSWORD_REGEX,
                message: 'Invalid password',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <PasswordField
                {...field}
                error={error?.message}
                placeholder="Password"
                style={{ marginBottom: 24 }}
              />
            )}
          />
          <Text
            style={(t) => ({
              fontSize: 12,
              color: t.colors.gray[6],
            })}
          >
            You will receive an email verification with a 4-digit number to
            authenticate your account
          </Text>
        </Box>
        <Box>
          <PrimaryButton
            type="submit"
            style={{ width: '100%', marginBottom: 16 }}
          >
            Log in
          </PrimaryButton>
          <Box component={Link} to="/forgot-password" style={{ width: '100%' }}>
            <TextButton style={{ width: '100%' }}>
              Having trouble with your account?
            </TextButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
