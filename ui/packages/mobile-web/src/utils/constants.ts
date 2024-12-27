import { QuestionDomain, QuestionSubdomain, SurveyTips } from '../types';

export const APP_CONFIG = {
  API_URL: import.meta.env.VITE_API_URL,
  COMPANY_ID: import.meta.env.VITE_COMPANY_ID,
  COGNITO_IDENTITY_POOL_ID: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
  COGNITO_USERPOOL_ID: import.meta.env.VITE_COGNITO_USERPOOL_ID,
  COGNITO_CLIENT_ID: import.meta.env.VITE_COGNITO_CLIENT_ID,
  COGNITO_REGION: import.meta.env.VITE_COGNITO_REGION,
};

export const AUTH_TOKEN_KEY = 'wellbe-mobile-auth';

type QuestionDomainLabel = {
  [key in QuestionDomain]: string;
};
export const QUESTION_DOMAIN_LABEL: QuestionDomainLabel = {
  'character-psychological-wellbeing': 'Character & Psychological Wellbeing',
  'career-workplace-wellbeing': 'Career & Workplace Wellbeing',
  'contentment-subjective-wellbeing-life-satisfaction':
    'Contentment & Subjective Wellbeing (Life Satisfaction)',
  'correctedness-subject-wellbeing-family-and-meaning':
    'Correctedness & Subject Wellbeing (Family and Meaning)',
};

type QuestionSubdomainLabel = {
  [key in QuestionSubdomain]: string;
};
export const QUESTION_SUBDOMAIN_LABEL: QuestionSubdomainLabel = {
  autonomy: 'Autonomy',
  competence: 'Competence',
  'environmental-clarity': 'Environmental Clarity',
  'filipino-wellbeing-family': 'Filipino Wellbeing (Family)',
  'filipino-wellbeing-good-economic-condition':
    'Filipino Wellbeing (Good Economic Condition)',
  'filipino-wellbeing-housing-and-quality-of-neighborhood':
    'Filipino Wellbeing (Housing and Quality of Neighborhood)',
  'filipino-wellbeing-religion-and-spiritual-life':
    'Filipino Wellbeing (Religion and Spiritual Life)',
  'life-satisfaction': 'Life Satisfaction',
  meaning: 'Meaning',
  'opportunity-for-interpersonal-contact':
    'Opportunity for Interpersonal Contact',
  'opportunity-for-skill-use': 'Opportunity for Skill Use',
  'physical-security': 'Physical Security',
  'positive-emotions-hope': 'Positive Emotions (Hope)',
  'positive-emotions-interest': 'Positive Emotions (Interest)',
  'supportive-supervision': 'Supportive Supervision',
  'valued-social-position': 'Valued Social Position',
  variety: 'Variety',
};

const CAREER_TIPS: SurveyTips = {
  'career-workplace-wellbeing': {
    'opportunity-for-interpersonal-contact': {
      low: [
        `Your Career score is low. It’s okay, work might be stressful lately. You might be experiencing that you are alone with your tasks. Try doing one task at a time and reach out for help from colleagues when you’re overwhelmed. You don’t have to bear it all alone.`,
      ],
      'below-average': [
        `Your Career score is below average. Work would be better if you could connect with your colleagues. Try initiating a talk about your interests during break. Look for common interests and plan a day to do it. It takes time to be connected but it is already a progress!`,
      ],
      average: [
        `Your Career score is average. You are doing well to make your time with work count! Try collaborating more with your colleagues on different tasks to interact more. Having a stable stream of tasks can build your workplace relationship more. This could help work feel easier.`,
      ],
      'above-average': [
        `Your Career score is above average. Great job on maintaining a healthy work journey! How are your friendships at work lately? Be intentional today at work by offering to help a colleague with their tasks. Intentionality could help a lot with appreciating your relationships with colleagues!`,
      ],
    },
    variety: {
      low: [
        `Your Career score is low. It’s fine if work might be draining now. You might be feeling that work is repetitive and routinary. Try collaborating with a colleague with a task to add variety to your routine. You might learn a new skill from the task!`,
      ],
      'below-average': [
        `Your Career score is below average. Work could be better if you try to make systems in your working routine. Improving systems can make a difference in the repetitiveness of tasks. This could make work more efficient and less tedious!`,
      ],
      average: [
        `Your Career score is average. Keep it up, you’re making work seem more varied! Try to consult with your boss regarding different work opportunities. Take a stab by leading one opportunity if you can to learn new skills and competencies.  Changes can make work less repetitive!`,
      ],
      'above-average': [
        `Your Career score is above average. You are doing great in making work more fun by learning! Be more proactive by voicing out your ideas and suggestions during meetings to stimulate discussions. Maximize learning within the team to add more variety for better well-being.`,
      ],
    },
    'valued-social-position': {
      low: [
        `Your Career score is low. Work might not be so appealing to you right now, and that’s alright. Try getting to know more about your work, starting from its vision and mission statement, and see how it can align to your own. It can lead to a spark of connection!`,
      ],
      'below-average': [
        `Your Career score is below average. Ease into work by closely observing its culture and commitment to its goals. From there, you can discover something about your work that makes you appreciate it more. Have hope and an open mind, and work will feel much more rewarding this way!`,
      ],
      average: [
        `Your Career score is average. Well-done for identifying with your work in a positive and healthy manner! Keep the momentum going by checking in once in a while how work adds value into your life, and how you may give value back in your own unique ways.`,
      ],
      'above-average': [
        `Your Career score is above average. Amazingly, you are able to be in synergy with your work! Now that you have a great bond with your work, begin communicating its value with others so they can be on the same tight work alignment as you. Positivity and pride are powerful things, so pass them on!`,
      ],
    },
    'environmental-clarity': {
      low: [
        `Your Career score is low. You may be feeling lost about your day-to-day tasks, and that’s okay! Look into your job description and ask yourself, what is the purpose of my position? Having clear work expectations can allow you to be accountable and take ownership of your work.`,
      ],
      'below-average': [
        `Your Career score is below average. See things through by finding out about your coworkers' roles and responsibilities. Look around you, who’s there and what’s happening? A shared understanding of work can help you align your actions towards a singular goal for the organization.`,
      ],
      average: [
        `Your Career score is average. Your responsibilities at work come crystal clear to you, and that’s excellent! Increase your environmental clarity by promoting transparency and communication. Let people have the freedom to share their ideas and ask questions about their deliverables. Have everyone on the same page!`,
      ],
      'above-average': [
        `Your Career score is above average. It's fantastic that you can do what’s expected of you even in the face of rapid change and organizational shifts. Perform your best by contributing to the framework of norms in the workplace. Guide interactions and approaches to work. Plant trust this way!`,
      ],
    },
    'opportunity-for-skill-use': {
      low: [
        `Your career score is low. Work might feel more draining right now, but having difficulties is okay. Think about even small wins with what you do at work you can celebrate. This might help bring some momentum needed to breathe new life into your job`,
        `Your career score is low. That's completely fine, work can be overwhelming at times. You might notice that your unique skills are not used. In that case, try to ask a colleague if you can work on another project where you can demonstrate your strengths. You can now finally be yourself with your work!`,
      ],
      'below-average': [
        `Your career score is below average. You might be experience fatigue from your job, which is normal when things get fast-paced or repetitive. Adding some variety to your routine might help you get out of your slump, and taking time to slow down and regroup might give a more positive perspective on your responsibilities.`,
        `Your career score is below average. We can spice your work by finding areas where you can display your unique skills. Let's identify a specific part of your job where you can excel, and let's focus from there. We can always find a way to show our skills in the workplace!`,
      ],
      average: [
        `Your career score is average. Great job hanging in there! You must be well-adjusted at your job and have a good outlook at work. If you feel up to a challenge, try learning some new skills that you’d be able to apply at work. Building more capabilities can open up new opportunities for your career. `,
        `Your career score is average. Keep it up, you're finding ways to demonstrate your unique strengths and skills in your work! At this point, we can finally focus on improving ourselves. One suggestion would be the growth mindset. Those with a growth mindset don't let failures hold them back and instead grow through their challenges.`,
      ],
      'above-average': [
        `Your Career score is high. You’re doing great! You must be feeling energized and appreciated by people you work with. You’re able to keep passion in your craft, and you can share your passion with your peers. Reach out to your struggling co-workers and offer some advice with work tasks you have a lot of experience in.`,
        `Your career score is above average. I'm glad that you're using your skills to their fullest! You are now at the fun part of your career but don't let that stop you. We can always learn and improve upon our skills, even help those who are like us. Let's be an inspiration to others! `,
      ],
    },
    'supportive-supervision': {
      low: [
        `Your Career score is low. Work gets draining if you feel like you can’t approach others for help. Relationships with supervisors might not be the best, so try to find a support system or network of helpful mentors that can guide you through the struggles of the organization`,
      ],
      'below-average': [
        `Your Career score is below average. Work gets draining if you feel like you can’t approach others for help. It might be worth opening up to your supervisors about what you’re struggling with and the kind of support you need`,
      ],
      average: [
        `Your Career score is average. . You have an okay relationship with your supervisors, and you can strengthen this in work-appropriate ways. Show them you’re eager to learn and contribute to the organization, as most leaders and managers appreciate seeing effort from others, and maybe even lead to rewards and recognition.`,
      ],
      'above-average': [
        `Your Career score is above average. You feel that your workplace is a safe and open environment. It’s easy to approach almost anyone one of your co-workers, regardless of their rank. Hopefully you can spread this positive work culture to others around you, especially those who look like they need a helping hand.`,
      ],
    },
  },
};

const CHARACTER_TIPS: SurveyTips = {
  'character-psychological-wellbeing': {
    autonomy: {
      low: [
        `You Character score is low. Things may be difficult right now so it's completely okay to start small. Just focus on the things that you can control, and don't blame yourself for the things that you can't. Take a deep breath, slowly build yourself back up before jumping into things again. Patience is key! `,
        `Your Character score is low. You may be doubting your capabilities right now. Your thoughts and opinions are valuable in the workplace, so the best way you can practice expressing this is by writing in a journal; vocalizing your thoughts in a discussion; or pursuing artistic activities (drawing, making music, dancing, etc.) Don't undermine the things you can contribute at work!`,
        `Your Character Score is low. It's alright to feel uncertain about ourselves. To start, identify issues in your environment and see how they affect you. Do you feel safe? Feel confident or anxious? Building awareness will guide you in solving the factors that wear away your confidence. Focusing on them is a great start!`,
      ],
      'below-average': [
        `Your Character score is below average. You would do well to improve your control over things and strengthen your sense of autonomy. List down the things you can control and those that you can't. Focus on the former, and if you can do that with consistency, you will slowly strengthen your wellbeing!`,
        `Your Character score is below average. There may be times when you don't feel like you are on your A-game, and that's okay. Try to set goals for the situation at hand, and come up with ways to attain them. Your objectives will help you pursue your decisions, and see where you can further improve on them in the long run. Its never bad to take initiative!`,
        `Your Character Score is below average. Developing self-confidence is a long journey. With that in mind, giving yourself positive affirmations will help boost your confidence. "My work matters" or "My ideas are valuable." Incorporating these ideas into your daily routine will help remind you of your worth. A daily dose of positivity helps a lot!`,
      ],
      average: [
        `Your Character score is average. Keep it up, you are doing well to maintain your psychological wellbeing! Keep doing what you are good at and focusing on the things you can control. Things feel much more stable and manageable because you have a good sense of autonomy. `,
        `Your Character score is average. Keep it up, it's important to trust your own choices as well! Find a coping strategy that works for you when things don't go as planned. Learn how to turn loss into motivation, and use these weaknesses as an opportunity to build on your next course of action. There is always a way to improve on your decision making skills!`,
        `Your Character Score is average. We're proud of your progress so far! To take it up a notch, how about listing your strengths and skills that come naturally to you? Identify them and analyze how they help you excel. Focusing on these strengths will help you further develop your skills and confidence.`,
      ],
      'above-average': [
        `Your Character score is above average and you are doing better than most of the population. Your excellent sense of autonomy and ownership over what you can control has bolstered your psychological wellbeing. What are you grateful for? Give appreciation to the people and experiences that have allowed you to maximize your wellbeing!`,
        `Your Character score is above average. Good job, continue having confidence in the choices that you make! Creating avenues where you can discuss your options with your team mates could be a great way to enchance understanding, and overcome challenges with one another. Inspire the same autonomy in others by allowing them to express their thoughts, in return. It's always good to build rapport with the team!`,
        `Your Character Score is above average. You are now fully comfortable and confident in your abilities! Continue bringing positivity to your journey throughout life. Filled with comfort and confidence, how about sharing it with others? Be an inspiration to your environment in sharing inclusion and safety. Autonomy doesn't stop with yourself; it fully blossoms with others!`,
      ],
    },
    'positive-emotions-hope': {
      low: [
        `You scored low in Character. It can be quite hard to come across positive emotions recently, you might be easily frustrated, feeling tired, or in a slump. Let's start small by giving yourself something to look forward to. What's one thing you are looking forward to this week?`,
        `Your Character score is low. There may be times where you feel as if the future is bleak. Step back and take deep breaths! Don't let the uncertainty of the future scare you from moving forward. You don't have to meticulously plan for the future at all times. Take one step at a time, and live in the moment!`,
      ],
      'below-average': [
        `Your Character score is below average. Let's turn that frown upside down! Make time this week for intentional rest, even just an hour of engaging in your hobbies or interests. Watch that movie, go on that jog, pick up that novel again, or tune in to your favorite playlist.`,
        `Your Character score is below average. You may feel unprepared for what the future has in store for you, and it's normal to feel like that. No one can be completely prepared for the future, but you can take certain precautions to make sure you're prepared for set backs. Make sure to think things thoroughly and not kick yourself too hard for not being as prepared as you would have liked. Just remember to keep moving forward! `,
      ],
      average: [
        `Great job, your Character score is average! Research shows that to feel at your best, it is ideal to have 3 positive interactions for every negative interaction. This is called the 3:1 positivty ratio, keep this in mind and you will surely elevate your experience of positive emotions.`,
        `Your Character score is average. You are prepared and you are confident! Just remember to not stay knocked down when things don't go your way. Make back up plans and contingencies in order to stay afloat. What's important is that you find a way to continue moving forward no matter what obstacles were put in your way.`,
      ],
      'above-average': [
        `Amazing! Your Character score is excellent! Your best self is definitely within reach and you have everything you need to flourish! Think about how you can share this experience others, and how you can help them experience positive emotions as well. Bring along everyone with you and spread the positivity! `,
        `Your Character score is above average. You are ready to take on whatever challenge life throws at you! You are determined to make sure that every decision you make today brings about a better tomorrow. Always remember that being unprepared for the unexpected is not the end of the world. Just adjust and come up with a solution to get yourself back on track. Keep your head up high because the future is looking good!`,
      ],
    },
    'positive-emotions-interest': {
      low: [
        `Your Character score is low. Negative thoughts are overwhelming you, affecting your wellbeing. Sometimes your daily functions are affected by negative thinking, but don't worry! Stop for a moment, take a breather and unwind. Try surrounding yourself with positivity and avoid negative triggers.`,
      ],
      'below-average': [
        `Your Character score is below average. Positivity is surrounding you but it seems as if it yields no effect, don't worry! Everything is a process. For starters, try incorporating positive triggers in your daily routine. Find something that makes you happy and add it in your daily routine. Keep the positivity flowing!`,
      ],
      average: [
        `Your Character score is average. Great job for working on sustaining positive practices! Remember that your well being brings the best out of you. Keep yourself surrounded with positive emotions, and have a strong support group to keep you standing.`,
      ],
      'above-average': [
        `Your Character score of above average. You are at the peak of positive emotions! You might face some challenges, but that doesn't bother you because of your resiliency. To better sustain this, why not try to promote a positive environment? Be the ripple of positive change in your environment to promote positive emotions.`,
      ],
    },
    competence: {
      low: [
        `Your Character score is low. You may be doubting your abilities and it's normal to feel that way sometimes. Remember that you're where you are at right now because you are good at what you do. Think back to all your previous accomplishments as they are proof of your growth over the years. `,
        `Your Character score is low. There are times when we may feel helpless in the face of problems, so let's take a moment to calm down. Deep breaths — 1, 2,3. Look at the problem, think about it, but don't let it overcome you. You don't have to face these problems alone. You may consult the Internet, your co-workers, bosses, and others to help you find the information and solutions needed.`,
        `Your Character score is low. It's alright to feel overwhelmed with all the responsibilities you carry. We can lessen this burden by analyzing our current situation. Let's focus on one single problem at a time. How about we do the most urgent task for this week? Let's slowly grow and work around problems over time.`,
      ],
      'below-average': [
        `Your Character score is below average. There will be times where we don't perform the way we want to, and that's okay. Take a step back, evaluate where things may be going wrong, and find ways to improve. Don't let this temporary setback keep you down for long. You can always bounce back!`,
        `Your Character score is below average. You may not feel like it yet but you, as an individual, can bring about positive changes for others. Compass needles only move when you do, so take the advice you gained from other people and the knowledge that you have to execute the solution in mind. Implement it, and see where it goes. You would never know if it works, if you don't try.`,
        `Your Character score is below average. Feeling inadequate about your skills is completely valid. Sometimes working harder isn't always the answer. Taking a break is normal and would help avoid burnout. In the meantime, how about planning your short-term and long-term goals and working toward them? Taking a rest and evaluating our journey is essential!`,
      ],
      average: [
        `Your Character score is average. You're utilizing your capabilities well and are able to get yourself out of situations that others struggle with. Best of all, you can still find more opportunities to grow! Attend a workshop, find a mentor, take a free online course; any opportunity to broaden your horizons and expand your skills!`,
        `Your Character score is average. You are a persevering and adaptive individual! When things don't go as planned, however, do not lose hope. Obstacles will get in our way more often than not, so it is always good to prepare Plan A, Plan B, and Plan C. Anticipate other problems that may arise, and attempt to foresee the ways you can resolve them. Before you know it, untangling these problems have helped your project grow better in quality.`,
        `Your Character score is average. It's good you're handling your responsibilities well, but we can take things up a notch. How about looking at challenges as opportunities for us to improve our skills? Having a growth mindset will help us realize that our skills can be improved as time pass by! Good luck!`,
      ],
      'above-average': [
        `Your Character score is above average. There's no setback or challenge that can bring you down! You are at peak performance and you know that you are good at what you do. Still, don't let this stop you from finding ways to improve your skills. Let's always strive to be the best version of ourselves!`,
        `Your Character score is above average, you are positively relentless in your ways! With relentlessness comes assurance, but never forget that there are myriad of ways to solve problems. Always be open-minded to different strategies, evolve in your solution-making, and weigh the pros and cons fairly. Learn to be receptive of unique, or new solutions.`,
        `Your Character score is above average. Congratulations on coming a long way! The journey of developing competence never stops. Now that you've accomplished yourself, why not share the positivity? Share your insights and recommendations with others who share the same path as you. Guiding and helping others is another journey itself. I wish you luck!`,
      ],
    },
  },
};

const CONTENTMENT_TIPS: SurveyTips = {
  'contentment-subjective-wellbeing-life-satisfaction': {
    'life-satisfaction': {
      low: [``],
      'below-average': [``],
      average: [``],
      'above-average': [``],
    },
    'filipino-wellbeing-housing-and-quality-of-neighborhood': {
      low: [``],
      'below-average': [``],
      average: [``],
      'above-average': [``],
    },
    'filipino-wellbeing-good-economic-condition': {
      low: [``],
      'below-average': [``],
      average: [``],
      'above-average': [``],
    },
  },
};

export const SURVEY_TIPS: SurveyTips = {
  ...CAREER_TIPS,
  ...CHARACTER_TIPS,
  ...CONTENTMENT_TIPS,
};
