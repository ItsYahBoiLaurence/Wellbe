import { Carousel } from '@mantine/carousel';
import { Box, Container, Stack, Text, Title } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import GetStartedOverlay from '../../assets/getstarted-gradient-overlay.png';
import { PrimaryButton } from '../../components/Buttons/Buttons';
import { Link } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';

type QuoteCardProps = {
  title: string;
  subtitle: string;
};

const QuoteCard = ({ title, subtitle }: QuoteCardProps) => (
  <Stack
    gap={0}
    style={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 188,
      padding: 30,
      borderRadius: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    }}
  >
    <Title
      order={2}
      style={{
        marginTop: 0,
        marginBottom: 15,
        fontSize: 32,
        fontWeight: 500,
      }}
    >
      {title}
    </Title>
    <Text style={{ fontSize: 16 }}>{subtitle}</Text>
  </Stack>
);

const HomePage = () => {
  const { latestSurvey } = useProfile();
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <Box
      style={(t) => ({
        height: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '60%',
          background: `linear-gradient(to bottom, ${t.colors.gray[3]} 0%, ${t.colors.gray[3]} 50%, transparent 100%)`,
        },
      })}
    >
      <Box
        style={{
          width: '100%',
          height: '100%',
          background: 'url(https://picsum.photos/200/300)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 58,
            paddingBottom: 58,
            height: '100%',
          }}
        >
          <Carousel
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            withIndicators
            slideGap="md"
            withControls={false}
            style={(t) => ({
              '& .mantine-Carousel-indicators': {
                top: -32,
                '& .mantine-Carousel-indicator': {
                  width: 8,
                  height: 8,
                  opacity: 0.5,
                  backgroundColor: t.colors.primary[4],
                  '&:not(:last-of-type)': {
                    marginRight: 8,
                  },
                  '&[data-active="true"]': {
                    opacity: 1,
                  },
                },
              },
            })}
          >
            <Carousel.Slide>
              <QuoteCard
                title="You are enough"
                subtitle="Your are strong enough to handle your challenges, wise enough to find a solution to your problems, and capable enough to do whatever needs to be done."
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <QuoteCard
                title="Quote of the day"
                subtitle="The truth is, they will never realize how big of a part you played...until you’re not playing it anymore."
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <QuoteCard
                title="From well-being, to being well."
                subtitle="Join us in building a community that supports each other."
              />
            </Carousel.Slide>
          </Carousel>
          {latestSurvey && (
            <Box
              style={{ display: 'flex', justifyContent: 'center', zIndex: 50 }}
            >
              <Link to={`/survey/${latestSurvey.id}`}>
                <PrimaryButton>Start Your Well-being Journey</PrimaryButton>
              </Link>
            </Box>
          )}
        </Container>
        <Box
          component="img"
          src={GetStartedOverlay}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '50%',
          }}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
