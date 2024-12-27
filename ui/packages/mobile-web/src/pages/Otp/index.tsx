import { Box, Container, PinInput, Stack, Text, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmSignup as confirmSignupApi } from '../../api/services/auth';
import { PrimaryButton } from '../../components/Buttons/Buttons';
import { PageHeader } from '../../components/PageHeader';
import { ConfirmSignupRequest } from '../../types';

const OtpPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get('email') as string;

  const { handleSubmit, control, formState } = useForm<ConfirmSignupRequest>({
    defaultValues: {
      code: '',
      email: decodeURIComponent(email),
    },
  });

  const { mutate: confirmSignup } = useMutation({
    mutationFn: (data: ConfirmSignupRequest) => confirmSignupApi(data),
    onSuccess: (data) => {
      if (data) navigate('/');
    },
  });

  const handleconfirmSignup = async (data: ConfirmSignupRequest) => {
    confirmSignup(data);
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 16,
        paddingBottom: 80,
        height: '100vh',
      }}
    >
      <PageHeader previousPage="/sign-up" />
      <Box
        component="form"
        display="flex"
        onSubmit={handleSubmit(handleconfirmSignup)}
        style={{
          justifyContent: 'space-between',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <Stack align="center" gap={0}>
          <Stack
            align="center"
            gap={0}
            style={{ paddingTop: 16, marginBottom: 32 }}
          >
            <Title order={3} style={{ marginTop: 0, marginBottom: 12 }}>
              Authentication code
            </Title>
            <Text style={{ textAlign: 'center' }}>
              Enter the 4-digit that we have sent to <b>{email}</b>
            </Text>
          </Stack>
          <Controller
            name="code"
            control={control}
            rules={{
              required: 'Code is required',
              minLength: {
                value: 6,
                message: 'Code must be 6 characters',
              },
            }}
            render={({ field }) => (
              <PinInput
                {...field}
                length={6}
                oneTimeCode
                style={{ marginBottom: 16 }}
              />
            )}
          />
        </Stack>
        <Box>
          <PrimaryButton
            disabled={!formState.isValid || !formState.isDirty}
            type="submit"
            style={{ width: '100%' }}
          >
            Continue
          </PrimaryButton>
        </Box>
      </Box>
    </Container>
  );
};

export default OtpPage;
