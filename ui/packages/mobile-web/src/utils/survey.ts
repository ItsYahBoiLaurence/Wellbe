import { QuestionDomain, QuestionSubdomain, SurveyScore } from '../types';
import { SURVEY_TIPS } from './constants';

export function getSurveyTips(
  domain: QuestionDomain,
  subdomain: QuestionSubdomain,
  score: SurveyScore
): string {
  const domainObject = SURVEY_TIPS[domain];
  if (!domainObject) return '';

  const subdomainObj = domainObject[subdomain];
  if (!subdomainObj) return '';

  const tips = subdomainObj[score];
  return tips?.length ? tips[Math.floor(Math.random() * tips.length)] : '';
}
