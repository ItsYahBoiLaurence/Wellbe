import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Box, Container, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import GetStartedOverlay from '../../assets/getstarted-gradient-overlay.png';
import AppLogo from '../../assets/logo.svg';
import { SecondaryButton } from '../../components/Buttons/Buttons';

type SlideProps = {
  title?: string;
  subtitle?: string;
  hasAction?: boolean;
};

const Slide = (props: SlideProps) => {
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
        <Container style={{ height: '100%' }}>
          <Box
            style={{
              display: 'flex',
              height: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 61,
              paddingBottom: 61,
              flexDirection: 'column',
              zIndex: 2,
              position: 'relative',
            }}
          >
            <Box>
              {props.title && (
                <Title
                  order={1}
                  pt={108}
                  style={{ textAlign: 'center', maxWidth: 277 }}
                >
                  {props.title}
                </Title>
              )}
              {props.subtitle && (
                <Title
                  order={5}
                  pt={19}
                  style={{
                    textAlign: 'center',
                    maxWidth: 289,
                  }}
                >
                  {props.subtitle}
                </Title>
              )}
            </Box>
            {props.hasAction && (
              <Box component={Link} to="/sign-up" style={{ width: '100%' }}>
                <SecondaryButton
                  style={{
                    height: 48,
                    fontSize: 16,
                    fontWeight: 600,
                    width: '100%',
                  }}
                >
                  Get started
                </SecondaryButton>
              </Box>
            )}
          </Box>
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

const GetStartedPage = () => {
  return (
    <Box style={{ height: '100vh', widht: '100%', position: 'relative' }}>
      <Box
        component="img"
        src={AppLogo}
        alt="WellBe"
        style={{
          height: 65,
          width: '100%',
          margin: '0 auto',
          position: 'absolute',
          top: 61,
          zIndex: 1,
        }}
      />
      <Carousel withIndicators height={'100vh'} withControls={false}>
        <Carousel.Slide>
          <Slide
            title="You’re not alone, we are here."
            subtitle="New ways to find balance for you, work and your family."
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Slide
            title="From well-being, to being well."
            subtitle="Join us in building a community that supports each other."
            hasAction
          />
        </Carousel.Slide>
      </Carousel>
    </Box>
  );
};

export default GetStartedPage;
