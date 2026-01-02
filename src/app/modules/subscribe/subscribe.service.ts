import { QueryBuilder } from '../../utils/QueryBuilder';
import { subscribeSearchableField } from './subscribe.constant';
import { ISubscribe } from './subscribe.interface';
import { subscribe } from './subscribe.model';

const createSubscribe = async (payload: ISubscribe) => {
  const result = await subscribe.create(payload);
  return result;
};

const getAllSubscribers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(subscribe.find(), query);

  const events = await queryBuilder
    .search(subscribeSearchableField)
    .filter()
    .fields()
    .paginate()
    .sort();

  const [data, meta] = await Promise.all([
    events.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

export const SubscribeServices = {
  createSubscribe,
  getAllSubscribers,
};
