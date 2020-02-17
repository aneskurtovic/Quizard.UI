import { Answers } from './answers';
export interface Question {
  id: number;
  text: string;
  categories: string[];
  answers: Answers[];
}
