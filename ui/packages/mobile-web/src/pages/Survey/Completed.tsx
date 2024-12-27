import { Box, Container, Image, Text, Title } from '@mantine/core';
import SurverCompletedImage from '../../assets/survey-completed-illustration.png';
import { PrimaryButton } from '../../components/Buttons/Buttons';
import { useAuth } from '../../hooks/useAuth';

const Description =
  "Keep pushing forward, learning from every stumble, and you'll continually enhance your skills and resilience.";

type Props = {
  onComplete: () => void;
  isSaving?: boolean;
};

const Completed = ({ onComplete, isSaving }: Props) => {
  const { currentUser } = useAuth();

  const thankYouMessage = currentUser?.firstName
    ? `That’s great, ${currentUser.firstName}!`
    : 'That’s great!';

  return (
    <Container
      style={{
        paddingTop: 60,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 80,
        height: '100vh',
      }}
    >
      <Box flex={1}>
        <Image src={SurverCompletedImage} height={229} />
        <Title order={2} style={{ marginTop: 14, textAlign: 'center' }}>
          {thankYouMessage}
        </Title>
        <Text style={{ marginTop: 27, maxWidth: 255, textAlign: 'center' }}>
          {Description}
        </Text>
      </Box>
      <PrimaryButton
        loading={isSaving}
        loaderProps={{ type: 'dots' }}
        onClick={onComplete}
      >
        Next
      </PrimaryButton>
    </Container>
  );
};

export default Completed;
