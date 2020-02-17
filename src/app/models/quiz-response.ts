import { Question } from './question';

export interface QuizResponse {
  id: number;
  name: string;
  questions: Question[];
}
