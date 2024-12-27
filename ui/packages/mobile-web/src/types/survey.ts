import { Employee } from './employees';

export type SurveyScore = 'low' | 'below-average' | 'average' | 'above-average';

export type QuestionSubdomain =
  | 'autonomy'
  | 'competence'
  | 'environmental-clarity'
  | 'filipino-wellbeing-family'
  | 'filipino-wellbeing-good-economic-condition'
  | 'filipino-wellbeing-housing-and-quality-of-neighborhood'
  | 'filipino-wellbeing-religion-and-spiritual-life'
  | 'life-satisfaction'
  | 'meaning'
  | 'opportunity-for-interpersonal-contact'
  | 'opportunity-for-skill-use'
  | 'physical-security'
  | 'positive-emotions-hope'
  | 'positive-emotions-interest'
  | 'supportive-supervision'
  | 'valued-social-position'
  | 'variety';

export type QuestionDomain =
  | 'character-psychological-wellbeing'
  | 'career-workplace-wellbeing'
  | 'contentment-subjective-wellbeing-life-satisfaction'
  | 'correctedness-subject-wellbeing-family-and-meaning';

export type QuestionLabel = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7';

export type SurveyStatus = 'pending' | 'completed' | 'cancelled' | 'expired';

export type QuestionOption = {
  title: string;
  subtitle: string;
  value: number;
};

export type Question = {
  id: string;
  question: string;
  domain: QuestionDomain;
  subdomain: QuestionSubdomain;
  label: QuestionLabel;
  options: QuestionOption[];
};

export type QuestionWithAnswer = {
  question: Question;
  answer: number;
  remarks?: string;
};

export type SurveyResult = {
  score?: number;
};

export type Survey = {
  id: string;
  employee: Employee;
  questions: QuestionWithAnswer[];
  status: SurveyStatus;
  remarks?: string;
  result?: SurveyResult;
};

export type SurveyTips = {
  [key in QuestionDomain]?: {
    [key in QuestionSubdomain]?: {
      [key in SurveyScore]?: string[];
    };
  };
};
