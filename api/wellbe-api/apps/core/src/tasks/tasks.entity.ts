import { Question, QuestionDomain } from '../questions';

export type GroupedQuestions = {
  [key in QuestionDomain]: Question[];
};
