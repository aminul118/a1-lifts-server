import { model, Schema } from 'mongoose';
import generateSlug from '../../middlewares/generateSlug';
import { IBlogs } from './blog.interface';

const blogsSchema = new Schema<IBlogs>(
  {
    title: { type: String, trim: true, required: true },
    slug: { type: String, trim: true, unique: true },
    content: { type: String, trim: true, required: true },
    thumbnail: { type: String },
  },
  { timestamps: true, versionKey: false },
);

generateSlug<IBlogs>(blogsSchema, 'title', 'slug');

const Blog = model<IBlogs>('Blog', blogsSchema);

export { Blog };
