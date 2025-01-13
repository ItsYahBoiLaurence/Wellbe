import mongoose from 'mongoose';
export const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  departmentNames: { type: [String], required: true },
  users: {
    type: [
      {
        _id: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: { type: String, required: true },
        department: { type: String, required: true },
        profileImage: { type: String },
        answerSets: {
          type: [
            {
              Character: { type: [Number] },
              Career: { type: [Number] },
              Contentment: { type: [Number] },
              Connectedness: { type: [Number] },
            },
          ],
          default: [],
        },

        statisticSets: {
          type: [
            {
              dateGenerated: { type: Date, required: true },
              Character: { type: Number, required: true },
              Career: { type: Number, required: true },
              Contentment: { type: Number, required: true },
              Connectedness: { type: Number, required: true },
              Wellbe: { type: Number, required: true },
            },
          ],
          default: [],
        },

        adviseSets: {
          type: [
            {
              dateGenerated: { type: Date, required: true },
              advise: { type: String, required: true },
              feedback: { type: String },
            },
          ],
          default: [],
        },
        frequencySets: {
          type: {
            frequency: { type: String, required: true },
            initialDate: { type: Date, required: true },
          },
        },
      },
    ],
    required: true,
    default: [],
  },
});

import { Document } from 'mongoose';

interface AnswerSet {
  Character: number[];
  Career: number[];
  Contentment: number[];
  Connectedness: number[];
}

interface StatisticSet {
  dateGenerated: Date;
  Character: number;
  Career: number;
  Contentment: number;
  Connectedness: number;
  Wellbe: number;
}

interface AdviseSet {
  dateGenerated: Date;
  advise: string;
  feedback?: string;
}

interface FrequencySet {
  frequency: string;
  initialDate: Date;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  profileImage?: string;
  answerSets: AnswerSet[];
  statisticSets: StatisticSet[];
  adviseSets: AdviseSet[];
  frequencySets: FrequencySet;
}

export interface CompanySchema extends Document {
  companyName: string;
  departmentNames: string[];
  users: User[];
}

// const EngineSchema = new mongoose.Schema({
//   domain: { type: String, required: true },
//   questions: [
//     {
//       subDomain: { type: String, required: true },
//       questions: { type: String, required: true },
//       type: { type: String, required: true },
//       advise: [
//         {
//           level: { type: String, required: true },
//           text: { type: String, required: true },
//         },
//       ],
//     },
//   ],
// });

// Create and export the mode
