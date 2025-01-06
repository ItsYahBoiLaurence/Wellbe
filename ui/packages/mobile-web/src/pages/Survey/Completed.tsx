import { Box, Button, Container, Image, Text, Title } from '@mantine/core';
import SurverCompletedImage from '../../assets/survey-completed-illustration.png';
import { PrimaryButton } from '../../components/Buttons/Buttons';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Description =
    "Keep pushing forward, learning from every stumble, and you'll continually enhance your skills and resilience.";

type Props = {
    onComplete: () => void;
    isSaving?: boolean;
};

const Completed = () => {
    // const { currentUser } = useAuth();

    const thankYouMessage = `That’s great`
    const navigate = useNavigate()
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
            {/* <PrimaryButton
                loaderProps={{ type: 'dots' }}
            >
                Next
            </PrimaryButton> */}
            <Button loaderProps={{ type: 'dots' }} onClick={() => navigate('/my-wellbe')}>Next</Button>
        </Container>

    );
};

export default Completed;



