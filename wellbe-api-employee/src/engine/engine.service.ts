import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  GenerateQuestionDTO,
  GenerateReport,
  SubmitAnswersDTO,
} from './dto/engine.dto';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { CacheService } from 'src/cache/cache.service';
import { OpenAIService } from 'src/openai/openai.service';

@Injectable()
export class EngineService {
  constructor(
    @InjectConnection() readonly connectionDB: Connection,
    private readonly cacheService: CacheService,
    private readonly openAIService: OpenAIService,
  ) {}

  async generateQuestions(
    generateQuestionsDTO: GenerateQuestionDTO,
  ): Promise<object> {
    const email = generateQuestionsDTO.email;
    const company = generateQuestionsDTO.company;
    //const data = mongoose.model('companies', CompanySchema);

    const resultsCompanyDB = await this.connectionDB
      .collection('companies')
      .findOne(
        {
          companyName: company,
          'users._id': email,
        },
        {
          projection: {
            'users.$': 1,
          },
        },
      );

    const { users } = resultsCompanyDB;
    const { answerSets } = users[0];
    const lenAnswerSets = answerSets.length;
    const latestAnswers = answerSets[lenAnswerSets - 1];
    const { Character, Career, Contentment, Connectedness, SessionNumber } =
      latestAnswers;

    if (SessionNumber >= 5) {
      return HttpException.createBody({
        message: 'Ready for statistics',
        HttpStatus: HttpStatus.CONFLICT,
      });
    }

    const unansweredCharacter = Character.map((value, index) =>
      value === 0 ? index : -1,
    ).filter((index) => index !== -1);

    const unansweredCareer = Career.map((value, index) =>
      value === 0 ? index : -1,
    ).filter((index) => index !== -1);

    const unansweredContentment = Contentment.map((value, index) =>
      value === 0 ? index : -1,
    ).filter((index) => index !== -1);

    const unansweredConnectedness = Connectedness.map((value, index) =>
      value === 0 ? index : -1,
    ).filter((index) => index !== -1);

    const unasweredDomain = [
      unansweredCharacter,
      unansweredCareer,
      unansweredContentment,
      unansweredConnectedness,
    ];

    //save cache indexes

    const resultsEngineDB = await this.connectionDB
      .collection('engine')
      .find()
      .toArray();

    const names = resultsEngineDB.map((item) => item.domain);
    Logger.log(names); // Output: ["a", "b"]
    const questions = [];

    for (let i = 0; names.length > i; i++) {
      const filteredData = resultsEngineDB
        .filter((item) => item.domain === names[i])
        .map((item) => item.questions);
      const collectedQuestions = [];

      for (let k = 0; k < unasweredDomain[i].length; k++) {
        const { question } = filteredData[0][unasweredDomain[i][k]];
        collectedQuestions.push(question);

        Logger.log(question);
        Logger.log(unasweredDomain[i][k] + ' ' + i + ' ' + k);
      }
      questions.push(collectedQuestions);
    }

    Logger.log(questions);

    const patternSession = [
      [2, 1, 1, 1],
      [1, 2, 1, 1],
      [1, 1, 2, 1],
      [2, 1, 1, 1],
      [1, 2, 1, 1],
    ];

    const selectedPattern = patternSession[SessionNumber];

    // eslint-disable-next-line prefer-const
    let questionAskList = [];
    for (let i = 0; i < selectedPattern.length; i++) {
      // eslint-disable-next-line prefer-const
      let selectedIndex = [];
      for (let j = 0; j < selectedPattern[i]; j++) {
        let doneSelection = true;
        let randomIndex;
        while (doneSelection) {
          Logger.log(selectedIndex);
          randomIndex = Math.floor(Math.random() * questions[i].length);
          if (selectedIndex.indexOf(randomIndex) === -1) {
            selectedIndex.push(randomIndex); // Push to the array
            doneSelection = false;
          }
        }

        const randomElement = questions[i][randomIndex];
        //DON'T REMOVE THIS
        //index - unasweredDomain[i][randomIndex]
        //domain - i

        questionAskList.push({
          indexQuestion: i + '_' + unasweredDomain[i][randomIndex],
          question: randomElement,
        });
      }
    }
    const storeSessionKey = generateQuestionsDTO.email + '_Questions';
    const storeSessionValue = company;

    Logger.log(storeSessionKey);

    try {
      await this.cacheService
        .set(storeSessionKey, storeSessionValue, 300)
        .then();
      return new HttpException(
        {
          questions: questionAskList,
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

  async submitAnswers(
    submitAnswers: SubmitAnswersDTO,
    email: string,
  ): Promise<object> {
    // const checkRequestQuestions = await this.cacheService.has(
    //   email + '_Questions',
    // );

    const checkRequestQuestions = await this.cacheService.get(
      email + '_Questions',
    );

    if (!checkRequestQuestions) {
      return HttpException.createBody({
        status: HttpStatus.FORBIDDEN,
        message: 'No Generated Question',
      });
    } else {
      await this.cacheService.del(email + '_Questions');
    }

    // eslint-disable-next-line prefer-const
    let domainList = [];
    // eslint-disable-next-line prefer-const
    let indexList = [];
    // eslint-disable-next-line prefer-const
    let answers = [];

    for (let i = 0; submitAnswers.answers.length > i; i++) {
      Logger.log(submitAnswers.answers[i]);

      const { indexQuestion, answer } = submitAnswers.answers[i];

      domainList.push(indexQuestion.split('_')[0]);
      indexList.push(indexQuestion.split('_')[1]);
      answers.push(answer);
    }

    const resultsEngineDB = await this.connectionDB
      .collection('engine')
      .find()
      .toArray();

    const flipNumber = {
      1: 4,
      2: 3,
      3: 2,
      4: 1,
    };
    const company = checkRequestQuestions;

    const resultsCompanyDB = await this.connectionDB
      .collection('companies')
      .findOne(
        {
          companyName: company,
          'users._id': email,
        },
        {
          projection: {
            'users.$': 1,
          },
        },
      );

    const { users } = resultsCompanyDB;
    const { answerSets } = users[0];
    const lenAnswerSets = answerSets.length;
    const latestAnswers = answerSets[lenAnswerSets - 1];
    const { Character, Career, Contentment, Connectedness, SessionNumber } =
      latestAnswers;

    const { adviseSets } = users[0];

    // eslint-disable-next-line prefer-const
    let dataDomains = [Character, Career, Contentment, Connectedness];

    // eslint-disable-next-line prefer-const
    let advisesList = [];

    for (let i = 0; domainList.length > i; i++) {
      const domainWholeData = resultsEngineDB[domainList[i]];
      //const { domain } = domainWholeData;

      dataDomains[domainList[i]][indexList[i]] = answers[i];
      Logger.log(dataDomains);

      const { questions } = domainWholeData;
      const selectedQuestions = questions[indexList[i]];
      const { type, advise } = selectedQuestions;
      let answer = answers[i];
      if (type === 'Negative') {
        answer = flipNumber[answer];
      }
      const adviseFromAnswer = advise[answer - 1];
      advisesList.push(adviseFromAnswer);

      //Logger.log(domainName);

      //Logger.log(adviseFromAnswer);
    }

    const ai = await this.openAIService.generateText(
      process.env.OPENAI_PROMPT.toString() + JSON.stringify(advisesList),
    );
    const currentDate = new Date();
    const isoString = currentDate.toISOString();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const advise = ai;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dateGenerate = isoString;

    Logger.log(ai);
    Logger.log(dateGenerate);

    const indexAnswers = lenAnswerSets - 1; // The index where you want to add the new entry
    //const indexAdvise = lenAdviseSets - 1;

    // New data to be updated
    const newAnswerSets = [
      {
        Character: dataDomains[0],
        Career: dataDomains[1],
        Contentment: dataDomains[2],
        Connectedness: dataDomains[3],
        SessionNumber: SessionNumber + 1,
      },
    ];

    adviseSets.push({
      dateGenerate: dateGenerate,
      advise: advise,
      feedback: '',
    });

    // Now, use the calculated index in the query
    const result = await this.connectionDB.collection('companies').updateOne(
      {
        companyName: company,
        'users._id': email,
      },
      {
        $set: {
          [`users.$.answerSets.${indexAnswers}`]: newAnswerSets[0], // Use the calculated index
          [`users.$.adviseSets`]: adviseSets, // Use the calculated index
        },
      },
    );

    return result;
  }

  async generateReport(generateReport: GenerateReport): Promise<object> {
    const email = generateReport.email;
    const company = generateReport.company;
    //const data = mongoose.model('companies', CompanySchema);

    const resultsCompanyDB = await this.connectionDB
      .collection('companies')
      .findOne(
        {
          companyName: company,
          'users._id': email,
        },
        {
          projection: {
            'users.$': 1,
          },
        },
      );

    const { users } = resultsCompanyDB;
    const { answerSets } = users[0];
    const { statisticSets } = users[0];

    Logger.log(answerSets);

    const latestIndex = answerSets.length - 1;
    const { Career, Character, Connectedness, Contentment, SessionNumber } =
      answerSets[latestIndex];

    if (SessionNumber < 5) {
      return HttpException.createBody({
        status: HttpStatus.FORBIDDEN,
        message: 'You are not completed 5 sessions',
      });
    }

    const sumCareer = Career.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    const averageCareer = sumCareer / Career.length;

    const sumCharacter = Character.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    const averageCharacter = sumCharacter / Character.length;

    const sumConnectedness = Connectedness.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    const averageConnectedness = sumConnectedness / Connectedness.length;

    const sumContentment = Contentment.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    const averageContentment = sumContentment / Contentment.length;

    const averageWellBe =
      (averageCareer +
        averageCharacter +
        averageConnectedness +
        averageContentment) /
      4;

    const currentDate = new Date();
    const isoString = currentDate.toISOString();

    answerSets.push({
      Character: [0, 0, 0, 0, 0, 0, 0],
      Career: [0, 0, 0, 0, 0, 0, 0],
      Contentment: [0, 0, 0, 0, 0, 0],
      Connectedness: [0, 0, 0, 0, 0],
      SessionNumber: 0,
    });

    const computedData = {
      dateGenerated: isoString,
      Character: averageCharacter,
      Career: averageCareer,
      Contentment: averageConnectedness,
      Connectedness: averageConnectedness,
      Wellbe: averageWellBe,
    };

    statisticSets.push(computedData);

    await this.connectionDB.collection('companies').updateOne(
      {
        companyName: company,
        'users._id': email,
      },
      {
        $set: {
          [`users.$.answerSets`]: answerSets, // Use the calculated index
          [`users.$.statisticsSets`]: statisticSets, // Use the calculated index
        },
      },
    );

    return computedData;
  }

  //Get All Messages
  //Get The Latest Message
  //Get The Statistics - Required to have minimum two entry
  //Get Profile
  //Study Auth
  //Notification
}
