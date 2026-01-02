import { Types } from 'mongoose';

export interface AiTraining {
  question: string;
  answer: string;
  tags?: string[];
  helpfulCount?: number;
}

export interface AiTrainingDoc extends AiTraining {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStats {
  question: string;
  answer: string;
}
