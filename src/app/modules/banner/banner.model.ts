import { model, Schema } from 'mongoose';
import generateSlug from '../../middlewares/generateSlug';
import { IBanner } from './banner.interface';

const bannerSchema = new Schema<IBanner>(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    slug: { type: String, trim: true, unique: true },
    buttonText: { type: String, trim: true },
    url: { type: String, trim: true },
    photo: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

generateSlug<IBanner>(bannerSchema, 'title', 'slug');

const Banner = model<IBanner>('Banner', bannerSchema);

export { Banner };
