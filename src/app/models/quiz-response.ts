import { Question } from './question';

export interface QuizResponse {
  id: number;
  name: string;
  timer: number;
  questions: Question[];
}
