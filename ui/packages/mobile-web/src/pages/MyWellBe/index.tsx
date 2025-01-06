import {
  Box,
  BoxProps,
  Container,
  ElementProps,
  Image,
  Text,
  Title,
} from '@mantine/core';
import MyWellBeIllustration from '../../assets/my-wellbe-illustration.png';
import { OutlineButton, PrimaryButton } from '../../components/Buttons/Buttons';
import CalendarTodayIcon from '../../components/icons/CalendarTodayIcon';
import ThumbDownIcon from '../../components/icons/ThumbDownIcon';
import ThumbUpIcon from '../../components/icons/ThumbUpIcon';
import { useAuth } from '../../hooks/useAuth';

type CardProps = BoxProps & ElementProps<'div', keyof BoxProps>;

export const Card = (props: CardProps) => (
  <Box
    {...props}
    style={[
      {
        width: '100%',
        backgroundColor: '#f2f7fe',
        padding: '38px 24px',
        borderRadius: 14,
      },
      props.style,
    ]}
  />
);

const MyWellBePage = () => {
  // const { currentUser } = useAuth();
  // const greetingMessage = currentUser?.firstName
  //   ? `Great job, ${currentUser.firstName}!`
  //   : 'Great job!';

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 80,
        overflowY: 'auto',
      }}
    >
      <Box
        style={(t) => ({
          display: 'flex',
          gap: 8,
          backgroundColor: t.colors.primary[4],
          color: t.white,
          borderRadius: 48,
          padding: '12px 24px',
          width: 'fit-content',
        })}
      >
        <CalendarTodayIcon />
        <Text>Today</Text>
      </Box>
      <Image src={MyWellBeIllustration} height={254} mt={24} />
      <Title order={2} mt={32} style={{ textAlign: 'center' }}>
        {/* {greetingMessage} */}
        Hello there!
      </Title>
      <Text mt={16}>Here’s your Wellbe result for today</Text>

      {/* TODO: use real data */}
      <Card mt={24}>
        <Text>
          <strong>Your results in the behavioral indicators is average.</strong>{' '}
          This suggests that your level of behavioral manifestations is within
          the normal range of the population. <br />
          <br />
          You are close to the population average in terms of your enthusiasm
          and alertness in daily functioning. <br />
          <br />
          Occassionally you may suffer from feelings of preooccupation and
          inattention, but you know that you can accomplish tasks once you set
          your mind on them. You are able to maintain your physical appearance
          and your difficulties do not interfere with your daily functioning.
        </Text>
      </Card>

      <Card
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <Text style={{ maxWidth: 115 }}>How do you like your results?</Text>
        <Box style={{ display: 'flex', gap: 13 }}>
          <PrimaryButton
            style={{ borderRadius: '50%', width: 48, height: 48, padding: 0 }}
          >
            <ThumbUpIcon />
          </PrimaryButton>
          <OutlineButton
            style={{ borderRadius: '50%', width: 48, height: 48, padding: 0 }}
          >
            <ThumbDownIcon />
          </OutlineButton>
        </Box>
      </Card>

      <Card mt={20}>
        <Title order={3}>Wellbe Consultants</Title>
        <Text mt={22}>
          For well-being planning and advice, our friends at Positive Workplace
          are more than willing to share their expertise.
        </Text>
        <PrimaryButton mt={43}>
          <Text>Schedule a Call</Text>
        </PrimaryButton>
      </Card>
    </Container>
  );
};

export default MyWellBePage;
