import OpenAI from 'openai';
import envVars from '../../config/env';
import { IStats } from './ai.interface';
import { AiTraining } from './ai.model';
import { aiSearchableField } from './ai.constanst';
import { QueryBuilder } from '../../utils/QueryBuilder';

const openai = new OpenAI({ apiKey: envVars.OPENAI_API_KEY });

const createStats = async (payload: IStats) => {
  const result = await AiTraining.create(payload);
  return result;
};

/**
 * Chat with GPT, injecting stats if available
 */
const createChat = async (payload: string) => {
  if (typeof payload !== 'string' || !payload.trim()) {
    throw new Error('Payload must be a non-empty string');
  }

  // 1. Find related stats (can return multiple)
  const stats = await AiTraining.find({
    question: { $regex: payload, $options: 'i' },
  }).limit(5);

  let systemPrompt =
    'You are a helpful assistant. If the user asks about stored stats, answer using them.\n';

  if (stats.length > 0) {
    systemPrompt += '\nKnown stats:\n';
    stats.forEach((s, i) => {
      systemPrompt += `${i + 1}. Q: ${s.question} → A: ${s.answer}\n`;
    });
  }

  // 2. Call GPT
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: payload },
    ],
  });

  return response.choices[0].message.content;
};

const getStats = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(AiTraining.find(), query);

  const tours = await queryBuilder
    .search(aiSearchableField)
    .filter()
    .fields()
    .paginate()
    .sort();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const deleteAiData = async (id: string) => {
  const result = await AiTraining.findByIdAndDelete(id);
  return result;
};

export const AIServices = {
  createChat,
  createStats,
  getStats,
  deleteAiData,
};
