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
import api from '../../api/api';

// Choices with their values
const choices = [
    { label: 'Strongly Disagree', value: 1 },
    { label: 'Disagree', value: 2 },
    { label: 'Agree', value: 3 },
    { label: 'Strongly Agree', value: 4 },
];

// Transform the survey object into an array for easier processing


// Main Survey Component
const SurveyComponent = ({ changeStateFunction, status }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [carousel, setCarousel] = useState(null);
    const [responses, setResponses] = useState({});
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
    const [dummySurvey, setDummySurvey] = useState({})

    const surveyQuestions = Object.entries(dummySurvey).map(([id, text]) => ({
        id,
        text,
    }));
    // Update progress based on the current slide

    useEffect(() => {
        if (surveyQuestions.length > 0) {
            const progress = ((currentSlide + 1) / surveyQuestions.length) * 100;
            setProgressValue(progress);
            setSelectedChoice(responses[surveyQuestions[currentSlide]?.id] || null);
        }
    }, [currentSlide, responses]);

    // Fetch data (if required)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = { email: 'andrew@gmail.com' };
                const response = await api.get('/engine/generateQuestions', { params });
                console.log('Fetched Data:', response.data);
                setDummySurvey(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Handle choice selection
    const handleChoiceClicked = (value) => {
        setResponses((prev) => ({
            ...prev,
            [surveyQuestions[currentSlide].id]: value,
        }));
        setSelectedChoice(value);
        if (carousel) carousel.scrollNext();
    };

    function transformData(data: { [key: string]: number }): string {
        // Convert the data object into a JSON string with proper formatting
        const jsonString = JSON.stringify(data);

        // Return the transformed JSON string
        return jsonString;
    }

    // Handle survey submission
    const handleSubmit = () => {
        setIsSurveyCompleted(true);
        console.log('Survey Completed:', responses);
        const data = {
            "email": "andrew@gmail.com",
            ...responses
        }
        try {
            api.post('engine/recordAnswer', data).then((res) => console.log(res))

        } catch (error) {
            console.log(error)
        }

        changeStateFunction(status.COMPLETED);
    };

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
                <Box style={{ marginBottom: 32 }}>
                    <Progress value={progressValue} />
                </Box>

                {/* Carousel */}
                {surveyQuestions.length > 0 ? (
                    <Carousel
                        getEmblaApi={setCarousel}
                        withControls={false}
                        onSlideChange={(index) => setCurrentSlide(index)}
                        slideGap={32}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            '& .mantineCarouselViewport': { height: '100%' },
                            '& .mantineCarouselContainer': { height: '100%' },
                        }}
                    >
                        {surveyQuestions.map((question, index) => (
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
                                    {index === surveyQuestions.length - 1 && (
                                        <Button
                                            style={{ marginTop: 32 }}
                                            onClick={handleSubmit}
                                            disabled={!selectedChoice}
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </Card>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                ) : (
                    <Text color="red">No questions available to display.</Text>
                )}
            </Container>

            {/* Overlay (Optional Placeholder) */}
            <Box
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '50%',
                    background: 'rgba(0, 0, 0, 0.1)',
                    opacity: 0.5,
                }}
            />
        </Box>
    );
};

export default SurveyComponent;
