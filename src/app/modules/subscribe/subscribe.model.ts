import { model, Schema } from 'mongoose';
import { ISubscribe } from './subscribe.interface';

const subscribeSchema = new Schema<ISubscribe>(
  {
    email: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const subscribe = model<ISubscribe>('subscribe', subscribeSchema);

export { subscribe };
