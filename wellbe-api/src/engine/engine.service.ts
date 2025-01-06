import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import { GenerateQuestionDTO } from './dto/generateQuestion.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { newAnswerSheet } from './schema/engine.schema';
import { CacheService } from 'src/cache/cache.service';
import { RecordAnswerDTO } from './dto/recordAnswer.dto';
import { OpenAIService } from 'src/openai/openai.service';

@Injectable()
export class EngineService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly cacheService: CacheService,
    private readonly openAIService: OpenAIService,
  ) {}

  async generateQuestions(
    _generateQuestionsDTO: GenerateQuestionDTO,
  ): Promise<object> {
    const answerCollection = await this.connection.collection('engine-answers');
    const email = _generateQuestionsDTO.email;

    let listQuestion = {};

    const findUser = await answerCollection.findOne({
      email: email,
    });
    if (findUser) {
      const answerList = Object.keys(findUser.answers);
      if (answerList.length <= 0) {
        await answerCollection.findOneAndUpdate(
          { email: email },
          {
            $set: {
              answers: {
                ['WEEK' + (answerList.length + 1).toString()]: newAnswerSheet,
              },
            },
          },
        );
        listQuestion = await answerCollection
          .findOne({ email: email })
          .then((collectionGathered) => {
            return collectionGathered.answers;
          });
      } else {
        listQuestion = findUser.answers;
      }
      const weekList = [];
      for (const [week, values] of Object.entries(listQuestion)) {
        const hasZero = Object.values(values).includes(0);
        if (hasZero) {
          weekList.push({ [week]: values });
        }
      }

      //Logic for new week

      if (weekList.length === 0) {
      }

      weekList.forEach((item) => {
        Object.keys(item).forEach((week) => {
          Object.keys(item[week]).forEach((key) => {
            if (item[week][key] !== 0) {
              delete item[week][key];
            }
          });
        });
      });

      weekList.forEach((item) => {
        Object.keys(item).forEach((week) => {
          listQuestion[week] = { P: [], W: [], SLS: [], SFM: [] };
          Object.keys(item[week]).forEach((key) => {
            if (key.startsWith('P')) {
              listQuestion[week].P.push(key);
            } else if (key.startsWith('W')) {
              listQuestion[week].W.push(key);
            } else if (key.startsWith('SLS')) {
              listQuestion[week].SLS.push(key);
            } else if (key.startsWith('SFM')) {
              listQuestion[week].SFM.push(key);
            }
          });
        });
      });
    } else {
      return new HttpException('Email not found', HttpStatus.NOT_ACCEPTABLE);
    }

    const rootKeys = Object.keys(listQuestion);
    const randomRootKey = rootKeys[Math.floor(Math.random() * rootKeys.length)];
    const rootData = listQuestion[randomRootKey];

    const randomizedSelection = {};

    Object.keys(rootData).forEach((category) => {
      const categoryArray = rootData[category];
      const randomIndex = Math.floor(Math.random() * categoryArray.length);
      randomizedSelection[category] = categoryArray[randomIndex];
    });

    const result = {};
    const listOfQuestions = await this.connection
      .collection('engine-questions')
      .find({})
      .toArray();

    type Question = {
      question: string;
      type: string;
    };
    type Reference = Record<string, Record<string, Question>>[];

    let input: Record<string, string>;
    let ref: Reference;

    // eslint-disable-next-line prefer-const
    input = randomizedSelection;
    // eslint-disable-next-line prefer-const
    ref = listOfQuestions;

    for (const [key, value] of Object.entries(input)) {
      const section = ref.find((r) => key in r)?.[key];
      result[key] = section?.[value]?.question || 'Question not found';
      if (result[key] === 'Question not found') {
      }
      Logger.log(value);
    }
    const storeSessionKey = _generateQuestionsDTO.email + '_A';
    const storeSessionValue = Object.values(randomizedSelection);
    Logger.log(storeSessionKey);
    Logger.log(storeSessionValue);

    // Logger.log(allNull);
    const values = Object.values(result);
    const firstValue = values[0];
    const allValuesSame = values.every((value) => value === firstValue);
    Logger.log(allValuesSame);
    if (allValuesSame) {
    } else {
    }

    try {
      await this.cacheService
        .set(storeSessionKey, storeSessionValue, 300)
        .then();
      return new HttpException(
        {
          questions: result,
        },
        HttpStatus.OK,
      );
    } catch (error) {
      return {
        message: 'Error generating question | ' + error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async recordAnswer(_recordAnswerDTO: RecordAnswerDTO): Promise<object> {
    let answeredQuestions = [];
    const answerCollection = await this.connection.collection('engine-answers');
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      answeredQuestions = await this.cacheService.get(
        _recordAnswerDTO.email + '_A',
      );
    } catch (error) {
      return new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: "Answer can't accepted, please try to generate question.",
        },
        HttpStatus.OK,
      );
    }

    const answerData = await answerCollection.findOne({
      email: _recordAnswerDTO.email,
    });
    const dataReceived = {
      P: _recordAnswerDTO.P,
      W: _recordAnswerDTO.W,
      SLS: _recordAnswerDTO.SLS,
      SFM: _recordAnswerDTO.SFM,
    };

    const resultDeclared: { [key: string]: number } = {};
    Logger.log(answeredQuestions);
    answeredQuestions.forEach((category) => {
      // Extract the category type (e.g., "P", "W", "SLS", "SFM")
      const categoryType = category.replace(/\d+/g, ''); // Remove numbers from the category string

      // If category type exists in the categoryValues object, map the value to the category
      if (dataReceived[categoryType] !== undefined) {
        resultDeclared[category] = dataReceived[categoryType];
      }
    });
    Logger.log('DOG');
    Logger.log(resultDeclared);

    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };

    // Iterate over the object's values
    for (const value of Object.values(resultDeclared)) {
      if (counts.hasOwnProperty(value)) {
        counts[value]++;
      }
    }
    // const pQuestions = '';
    // const pLevel = ''
    // const questionList = await this.connection.collection('engine-questions');
    // const findingPQuestions = await questionList.findOne({P : {}});
    // const pQuestion

    const tipData = await this.connection
      .collection('engine-tips')
      .find({})
      .toArray();

    Logger.log(tipData[0]);
    const tipObject = tipData[0];

    const updatedData = {};

    for (let key in resultDeclared) {
      if (tipObject[key] && tipObject[key][resultDeclared[key]]) {
        updatedData[key] = tipObject[key][resultDeclared[key]];
      } else {
        updatedData[key] = 'Data not found for ' + key;
      }
    }

    Logger.log('DOG');

    //list of advice
    Logger.log(updatedData);

    const ai = await this.openAIService.generateText(
      "Make me an one summarized paragraph advise based on this data. And I want you to respose like your're taking with Andrew Sanches His/her name is Andrew Sanchez, here's the data:" +
        JSON.stringify(updatedData),
    );
    Logger.log(ai);

    //Log the advise
    //

    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const dateToday = `${month}${day}${year}`;

    Logger.log(dateToday);

    const countSubmit: number = answerData.submitCount + 1;
    const numberWeeks: number = Math.ceil(countSubmit / 7); // Calculate number of weeks (1-based)
    const leftnumberDays: number = 7 - ((countSubmit - 1) % 7);
    Logger.log(numberWeeks);
    Logger.log(leftnumberDays);

    let submitLogs = [];
    submitLogs = answerData.submitLog;
    Logger.log(submitLogs);
    submitLogs.push(dateToday);

    for (const [key, value] of Object.entries(resultDeclared)) {
      const fieldName = 'WEEK' + numberWeeks.toString();
      const updateObject = {
        [`answers.${fieldName}.${key}`]: value,
        submitCount: countSubmit,
        submitLog: submitLogs,
      };
      await answerCollection.updateOne(
        { email: _recordAnswerDTO.email },
        { $set: updateObject },
      );
    }
  }
}
