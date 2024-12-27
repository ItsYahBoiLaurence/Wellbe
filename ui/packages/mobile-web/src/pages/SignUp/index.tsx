import { Box, Container, Text, TextInput, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../../api/services/auth';
import { PrimaryButton, TextButton } from '../../components/Buttons/Buttons';
import { PageHeader } from '../../components/PageHeader';
import PasswordField from '../../components/PasswordField';
import { SignupRequest } from '../../types';
import { APP_CONFIG } from '../../utils/constants';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/validators';

const SignUpPage = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<SignupRequest>({
    defaultValues: {
      email: '',
      password: '',
      companyId: APP_CONFIG.COMPANY_ID,
    },
  });

  const { mutate: signup } = useMutation({
    mutationFn: (data: SignupRequest) => signupApi(data),
    onSuccess: (data, args) => {
      if (data.success) {
        navigate(`/otp?email=${encodeURIComponent(args.email)}`);
      }
    },
  });

  const handleSignup = async (data: SignupRequest) => {
    signup(data);
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
      <PageHeader previousPage="/login" />
      <Box
        component="form"
        display="flex"
        onSubmit={handleSubmit(handleSignup)}
        style={{
          justifyContent: 'space-between',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Box style={{ paddingTop: 12, paddingBottom: 12, marginBottom: 16 }}>
            <Title order={1}>Welcome!</Title>
            <Text>Create your account</Text>
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
            Sign up
          </PrimaryButton>
          <Box component={Link} to="/sign-in" style={{ width: '100%' }}>
            <TextButton style={{ width: '100%' }}>
              Already have an account?
            </TextButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
