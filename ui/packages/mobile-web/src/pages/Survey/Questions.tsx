// import { Carousel } from '@mantine/carousel';
// import {
//   Box,
//   Container,
//   Progress,
//   Stack,
//   Text,
//   Textarea,
//   Title,
// } from '@mantine/core';
// import { IconChevronLeft } from '@tabler/icons-react';
// import { useState } from 'react';
// import { Controller, useFormContext } from 'react-hook-form';
// import GetStartedOverlay from '../../assets/getstarted-gradient-overlay.png';
// import { OutlineButton, PrimaryButton } from '../../components/Buttons/Buttons';
// import { DefaultIconButton } from '../../components/IconButton';
// import {
//   EmblaCarousel,
//   QuestionOption,
//   QuestionWithAnswer,
//   Survey,
// } from '../../types';
// import { QUESTION_DOMAIN_LABEL } from '../../utils/constants';

// type Props = {
//   survey: Survey;
//   onComplete: () => void;
// };

// type QuestionOptionsProps = {
//   options: QuestionOption[];
//   value: number;
//   onChange: (value: number) => void;
// };

// type QuestionSlideProps = {
//   index: number;
//   question: QuestionWithAnswer;
//   prevDisabled: boolean;
//   onPrev?: () => void;
//   onNext?: () => void;
// };

// const QuestionOptions = ({
//   value,
//   options,
//   onChange,
// }: QuestionOptionsProps) => (
//   <Stack
//     style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
//   >
//     {options.map((opt, i) => (
//       <OutlineButton
//         style={(t) => ({
//           border: `1px solid ${t.colors.primary[value === opt.value ? 1 : 5]}`,
//           color: t.colors.primary[5],
//           backgroundColor:
//             value === opt.value ? t.colors.primary[0] : 'transparent',
//         })}
//         key={i}
//         onClick={() => onChange(opt.value)}
//       >
//         {opt.title}
//       </OutlineButton>
//     ))}
//   </Stack>
// );

// const QuestionSlide = ({
//   index,
//   question: { question },
//   prevDisabled,
//   onPrev,
//   onNext,
// }: QuestionSlideProps) => {
//   const { control, watch } = useFormContext();
//   const currentQuestion = watch(`questions.${index}`);

//   return (
//     <Stack style={{ height: '100%', justifyContent: 'space-between' }}>
//       <Stack gap={0}>
//         <Text
//           style={{
//             fontSize: 18,
//             fontWeight: 500,
//             lineHeight: '36px',
//             marginBottom: 8,
//           }}
//         >
//           {QUESTION_DOMAIN_LABEL[question.domain]}
//         </Text>
//         <Title
//           order={3}
//           style={{
//             fontSize: 20,
//             fontWeight: 500,
//             lineHeight: '30px',
//             marginBottom: 30,
//           }}
//         >
//           {question.question}
//         </Title>
//         <Box style={{ marginBottom: 40 }}>
//           <Controller
//             name={`questions.${index}.answer`}
//             control={control}
//             render={({ field }) => (
//               <QuestionOptions {...field} options={question.options} />
//             )}
//           />
//         </Box>
//         <Controller
//           name={`questions.${index}.remarks`}
//           control={control}
//           render={({ field }) => (
//             <Textarea
//               {...field}
//               rows={8}
//               placeholder="Feel free to share your thoughts about this questionRemarks"
//             />
//           )}
//         />
//       </Stack>
//       <Stack
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         <DefaultIconButton
//           disabled={prevDisabled}
//           onClick={() => onPrev?.()}
//           style={(t) => ({ border: 'none', color: t.colors.primary[5] })}
//         >
//           <IconChevronLeft />
//         </DefaultIconButton>
//         <PrimaryButton
//           disabled={!currentQuestion?.answer}
//           onClick={() => onNext?.()}
//           style={{ minWidth: 106 }}
//         >
//           Next
//         </PrimaryButton>
//       </Stack>
//     </Stack>
//   );
// };

// const SurveyQuestions = ({ survey, onComplete }: Props) => {
//   const [carousel, setCarousel] = useState<EmblaCarousel>();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const progressValue = ((currentSlide + 1) / survey.questions.length) * 100;

//   const handleSlideChanged = (index: number) => {
//     setCurrentSlide(index);
//   };

//   const handleNextClicked = (currentIndex: number) => {
//     if (currentIndex === survey.questions.length - 1) {
//       onComplete();
//       return;
//     }
//     carousel?.scrollNext();
//   };

//   return (
//     <Box style={() => ({ height: '100%', paddingTop: 24, paddingBottom: 24 })}>
//       <Container
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           position: 'relative',
//           zIndex: 50,
//           height: '100%',
//         }}
//       >
//         <Box style={{ marginBottom: 32 }}>
//           <Progress value={progressValue} />
//         </Box>
//         <Carousel
//           getEmblaApi={(embla) => setCarousel(embla)}
//           withControls={false}
//           onSlideChange={handleSlideChanged}
//           slideGap={32}
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             flexGrow: 1,
//             '& .mantine-Carousel-viewport': {
//               height: '100%',
//               '& .mantine-Carousel-container': {
//                 height: '100%',
//               },
//             },
//           }}
//         >
//           {survey.questions.map((question, index) => (
//             <Carousel.Slide>
//               <QuestionSlide
//                 onNext={() => handleNextClicked(index)}
//                 prevDisabled={currentSlide === 0}
//                 onPrev={carousel?.scrollPrev}
//                 index={index}
//                 question={question}
//               />
//             </Carousel.Slide>
//           ))}
//         </Carousel>
//       </Container>
//       <Box
//         component="img"
//         src={GetStartedOverlay}
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           width: '100%',
//           height: '50%',
//           opacity: 0.5,
//         }}
//       />
//     </Box>
//   );
// };

// export default SurveyQuestions;

import React, { useState, useEffect } from 'react';
import { Box, Container, Progress, Button, Text, Card, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useNavigate } from 'react-router-dom';
import api from './api'

// Dummy survey data
const dummySurvey = {
    questions: [
        { id: 1, text: 'I view setbacks as an opportunity to improve my skills' },
        { id: 2, text: 'My responsibilities at work are clear to me' },
        { id: 3, text: 'I feel financially secure' },
        { id: 4, text: 'My family plays a big role in my life' },
    ],
};



// Choices with their values
const choices = [
    { label: 'Strongly Disagree', value: 1 },
    { label: 'Disagree', value: 2 },
    { label: 'Agree', value: 3 },
    { label: 'Strongly Agree', value: 4 },
];

// Main Survey Component
const SurveyComponent = ({ changeStateFunction, status }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [carousel, setCarousel] = useState(null);
    const [responses, setResponses] = useState({});
    const [selectedChoice, setSelectedChoice] = useState(null); // Track the selected choice
    const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
    const [dataQ, setData] = useState(null);
    const [questions, setQuestions] = useState({})


    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = 'andrew@gmail.com';
                const response = await api.get('http://localhost:2000/engine/generateQuestions', {
                    params: { email } // Pass the email as a query parameter
                });

                setData(response.data); // Access response data directly
                console.log(response.data); // Log the data to console
            } catch (error) {
                console.error(error); // Log error to console
            }
        };

        fetchData();
    }, []);

    // Update progress based on the current slide
    useEffect(() => {
        if (dummySurvey.questions.length > 0) {
            const progress = ((currentSlide + 1) / (dummySurvey.questions.length)) * 100; // Include the "Thank You" slide
            setProgressValue(progress);
        }
        // Reset selected choice when slide changes
        setSelectedChoice(responses[dummySurvey.questions[currentSlide]?.id] || null);
    }, [currentSlide]);






    // Handle choice selection
    const handleChoiceClicked = (value) => {
        setResponses((prev) => ({
            ...prev,
            [dummySurvey.questions[currentSlide].id]: value,
        }));
        setSelectedChoice(value);
        carousel.scrollNext();
    };

    // Handle submit action
    const handleSubmit = () => {
        setIsSurveyCompleted(true);
        console.log('Survey Completed:', responses);
        changeStateFunction(status.COMPLETED)
    };
    console.log(dataQ)
    const navigate = useNavigate();
    return (

        <Box style={{ height: '100%', paddingTop: 24, paddingBottom: 24 }}>
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 50,
                    height: '100%',
                }}
            >
                <Text style={{ fontSize: '32px', marginBottom: '32px' }}>Questions</Text>
                {/* Progress Bar */}
                <Box style={{ marginBottom: 32 }}>
                    <Progress value={progressValue} />
                </Box>

                {/* Carousel */}
                <Carousel
                    getEmblaApi={(embla) => setCarousel(embla)}
                    withControls={false}
                    onSlideChange={(index) => setCurrentSlide(index)}
                    slideGap={32}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        '& .mantineCarouselViewport': {
                            height: '100%',
                            '& .mantine-Carousel-container': {
                                height: '100%',
                            },
                        },
                    }}
                >
                    {dummySurvey.questions.map((question, index) => (
                        <Carousel.Slide key={question.id}>
                            <Card
                                shadow="md"
                                radius="lg"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    padding: 32,
                                }}
                            >
                                <Text size="xl" weight={700} align="center" mb="md">
                                    {question.text}
                                </Text>
                                <Group style={{ marginTop: 24 }}>
                                    {choices.map((choice) => (
                                        <Button
                                            key={choice.value}
                                            variant={selectedChoice === choice.value ? 'filled' : 'outline'}
                                            color={selectedChoice === choice.value ? 'blue' : 'gray'}
                                            onClick={() => handleChoiceClicked(choice.value)}
                                        >
                                            {choice.label}
                                        </Button>
                                    ))}
                                </Group>
                                {index === dummySurvey.questions.length - 1 && (
                                    <Button
                                        style={{ marginTop: 32 }}
                                        onClick={handleSubmit}
                                        disabled={!selectedChoice} // Disable if no choice is selected
                                    >
                                        Submit
                                    </Button>
                                )}
                            </Card>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </Container>

            {/* Overlay (Optional Placeholder) */}
            <Box
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '50%',
                    background: 'rgba(0, 0, 0, 0.1)', // Placeholder for an overlay
                    opacity: 0.5,
                }}
            />
        </Box>
    );
};

export default SurveyComponent;


