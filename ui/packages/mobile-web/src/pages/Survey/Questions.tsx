import { Carousel } from '@mantine/carousel';
import {
  Box,
  Container,
  Progress,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import GetStartedOverlay from '../../assets/getstarted-gradient-overlay.png';
import { OutlineButton, PrimaryButton } from '../../components/Buttons/Buttons';
import { DefaultIconButton } from '../../components/IconButton';
import {
  EmblaCarousel,
  QuestionOption,
  QuestionWithAnswer,
  Survey,
} from '../../types';
import { QUESTION_DOMAIN_LABEL } from '../../utils/constants';

type Props = {
  survey: Survey;
  onComplete: () => void;
};

type QuestionOptionsProps = {
  options: QuestionOption[];
  value: number;
  onChange: (value: number) => void;
};

type QuestionSlideProps = {
  index: number;
  question: QuestionWithAnswer;
  prevDisabled: boolean;
  onPrev?: () => void;
  onNext?: () => void;
};

const QuestionOptions = ({
  value,
  options,
  onChange,
}: QuestionOptionsProps) => (
  <Stack
    style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
  >
    {options.map((opt, i) => (
      <OutlineButton
        style={(t) => ({
          border: `1px solid ${t.colors.primary[value === opt.value ? 1 : 5]}`,
          color: t.colors.primary[5],
          backgroundColor:
            value === opt.value ? t.colors.primary[0] : 'transparent',
        })}
        key={i}
        onClick={() => onChange(opt.value)}
      >
        {opt.title}
      </OutlineButton>
    ))}
  </Stack>
);

const QuestionSlide = ({
  index,
  question: { question },
  prevDisabled,
  onPrev,
  onNext,
}: QuestionSlideProps) => {
  const { control, watch } = useFormContext();
  const currentQuestion = watch(`questions.${index}`);

  return (
    <Stack style={{ height: '100%', justifyContent: 'space-between' }}>
      <Stack gap={0}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            lineHeight: '36px',
            marginBottom: 8,
          }}
        >
          {QUESTION_DOMAIN_LABEL[question.domain]}
        </Text>
        <Title
          order={3}
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: '30px',
            marginBottom: 30,
          }}
        >
          {question.question}
        </Title>
        <Box style={{ marginBottom: 40 }}>
          <Controller
            name={`questions.${index}.answer`}
            control={control}
            render={({ field }) => (
              <QuestionOptions {...field} options={question.options} />
            )}
          />
        </Box>
        <Controller
          name={`questions.${index}.remarks`}
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              rows={8}
              placeholder="Feel free to share your thoughts about this questionRemarks"
            />
          )}
        />
      </Stack>
      <Stack
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <DefaultIconButton
          disabled={prevDisabled}
          onClick={() => onPrev?.()}
          style={(t) => ({ border: 'none', color: t.colors.primary[5] })}
        >
          <IconChevronLeft />
        </DefaultIconButton>
        <PrimaryButton
          disabled={!currentQuestion?.answer}
          onClick={() => onNext?.()}
          style={{ minWidth: 106 }}
        >
          Next
        </PrimaryButton>
      </Stack>
    </Stack>
  );
};

const SurveyQuestions = ({ survey, onComplete }: Props) => {
  const [carousel, setCarousel] = useState<EmblaCarousel>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const progressValue = ((currentSlide + 1) / survey.questions.length) * 100;

  const handleSlideChanged = (index: number) => {
    setCurrentSlide(index);
  };

  const handleNextClicked = (currentIndex: number) => {
    if (currentIndex === survey.questions.length - 1) {
      onComplete();
      return;
    }
    carousel?.scrollNext();
  };

  return (
    <Box style={() => ({ height: '100%', paddingTop: 24, paddingBottom: 24 })}>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 50,
          height: '100%',
        }}
      >
        <Box style={{ marginBottom: 32 }}>
          <Progress value={progressValue} />
        </Box>
        <Carousel
          getEmblaApi={(embla) => setCarousel(embla)}
          withControls={false}
          onSlideChange={handleSlideChanged}
          slideGap={32}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            '& .mantine-Carousel-viewport': {
              height: '100%',
              '& .mantine-Carousel-container': {
                height: '100%',
              },
            },
          }}
        >
          {survey.questions.map((question, index) => (
            <Carousel.Slide>
              <QuestionSlide
                onNext={() => handleNextClicked(index)}
                prevDisabled={currentSlide === 0}
                onPrev={carousel?.scrollPrev}
                index={index}
                question={question}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
      <Box
        component="img"
        src={GetStartedOverlay}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '50%',
          opacity: 0.5,
        }}
      />
    </Box>
  );
};

export default SurveyQuestions;
