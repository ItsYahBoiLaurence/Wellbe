import { UseQueryOptions } from '@tanstack/react-query';
import { Auth } from 'aws-amplify';
import { Survey } from '../../types/survey';
import callApi from '../callApi';

export const QUERY_SURVEY_KEYS = {
  surveyDetails: (id?: string) => ['survey', id],
  latestSurvey: () => ['survey', 'latest'],
};

export const getLatestSurveyQuery = (): UseQueryOptions<
  Survey,
  Error,
  Survey
> => ({
  queryKey: QUERY_SURVEY_KEYS.latestSurvey(),
  queryFn: () => callApi<Survey>('/surveys/latest', { method: 'GET' }),
  enabled: !!Auth.currentAuthenticatedUser(),
  retry: false,
  staleTime: 10,
});

export const getSurveyByIdQuery = (
  id?: string
): UseQueryOptions<Survey, Error, Survey> => ({
  queryKey: QUERY_SURVEY_KEYS.surveyDetails(id),
  queryFn: () => callApi<Survey>(`/surveys/${id}`, { method: 'GET' }),
  enabled: !!id || !!Auth.currentAuthenticatedUser(),
  retry: false,
  staleTime: 10,
});

export const submitSurvey = (id: string, model: Partial<Survey>) =>
  callApi(`/surveys/${id}/submit`, {
    method: 'POST',
    data: model,
  });
