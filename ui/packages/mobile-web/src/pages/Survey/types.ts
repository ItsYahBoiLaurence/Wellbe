export type SurveyState = 'not-started' | 'active' | 'completed' | 'error';

export type SurveyQuestionForm = {
  question: string;
  answer: number;
  remarks?: string;
};

export type SurveyForm = {
  questions: SurveyQuestionForm[];
};
