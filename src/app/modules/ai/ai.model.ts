import mongoose, { Schema } from 'mongoose';
import { IStats, AiTraining } from './ai.interface';

const StatSchema = new Schema<IStats>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const AiTraining = mongoose.model<IStats>('Stat', StatSchema);

export { AiTraining };
