import { LoadingOverlay } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState, createContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getSurveyByIdQuery,
  submitSurvey as submitSurveyApi,
} from '../../api/services/survey';
import { Survey } from '../../types';
import SurveyCompleted from '../Survey/Completed';
import SurveyError from './Error';
import SurveyQuestions from '../Survey/Questions'
import SurveyStartPage from '../Survey/Start';
// import { SurveyForm, SurveyState } from './types';

// const getDefaultValues = (survey?: Survey): SurveyForm => ({
//   questions:
//     survey?.questions?.map((item) => ({
//       question: item.question.id,
//       answer: 0,
//       remarks: '',
//     })) ?? [],
// });

enum SurveyStatus {
  START = 'survey-start',
  IN_PROGRESS = 'survey-in-progress',
  COMPLETED = 'survey-complete'
}

const SurveyPage = () => {

  // const navigate = useNavigate();
  // const { id } = useParams();
  // const { data: survey } = useQuery(getSurveyByIdQuery(id));
  // const form = useForm<SurveyForm>({
  //   defaultValues: getDefaultValues(survey),
  // });
  // const { mutate: submitSurvey, isPending } = useMutation({
  //   mutationFn: (data: SurveyForm) =>
  //     submitSurveyApi(id!, data as unknown as Survey),
  //   onSuccess: () => {
  //     navigate('/my-wellbe');
  //   },
  // });
  // const [surveyState, setSurveyState] = useState<SurveyState>('not-started');

  // const handleSubmit = () => {
  //   submitSurvey(form.getValues());
  // };

  // useEffect(() => {
  //   if (!survey) return;

  //   if (survey.status === 'cancelled' || survey.status === 'expired') {
  //     setSurveyState('error');
  //     return;
  //   }

  //   if (survey.status === 'completed') {
  //     navigate('/my-wellbe');
  //     return;
  //   }

  //   form.reset(getDefaultValues(survey));
  // }, [survey, form, navigate]);

  const [surveyStatus, setSurveyStatus] = useState(SurveyStatus.START)

  const handleChange = (status) => {
    setSurveyStatus(status)
  }


  return (
    // <FormProvider {...form}>
    //   {survey ? (
    //     <>
    //       {surveyState === 'active' && (
    //         <SurveyQuestions
    //           survey={survey}
    //           onComplete={() => setSurveyState('completed')}
    //         />
    //       )}
    //       {surveyState === 'completed' && (
    //         <SurveyCompleted onComplete={handleSubmit} isSaving={isPending} />
    //       )}
    //       {surveyState === 'not-started' && (
    //         <SurveyStartPage onStart={() => setSurveyState('active')} />
    //       )}
    //       {surveyState === 'error' && <SurveyError survey={survey} />}
    //     </>
    //   ) : (
    //     <LoadingOverlay visible />
    //   )}
    // </FormProvider>

    <>
      {surveyStatus === SurveyStatus.START && (
        <SurveyStartPage changeStateFunction={handleChange} status={SurveyStatus} />
        // <div><h1>Start</h1>
        //   <button onClick={() => setSurveyStatus(SurveyStatus.IN_PROGRESS)}>Start</button></div>

      )}
      {surveyStatus === SurveyStatus.IN_PROGRESS && (
        <SurveyQuestions changeStateFunction={handleChange} status={SurveyStatus} />
        // <div><h1>In Progress</h1>
        //   <button onClick={() => setSurveyStatus(SurveyStatus.COMPLETED)}>End</button></div>
      )}
      {surveyStatus === SurveyStatus.COMPLETED && (
        <SurveyCompleted />
        // <div><h1>Completed</h1>
        //   <button onClick={() => setSurveyStatus(SurveyStatus.START)}>Retry</button></div>
      )}
    </>
  );
};

export default SurveyPage;
