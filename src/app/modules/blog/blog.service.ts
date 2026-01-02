import httpStatus from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import { Blog } from './blog.model';
import { IBlogs } from './blog.interface';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { blogsSearchableField } from './blog.constant';

const createBlogs = async (payload: IBlogs) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogs = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Blog.find(), query);

  const events = await queryBuilder
    .search(blogsSearchableField)
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

const getSingleBlog = async (slug: string) => {
  if (!slug) {
    throw new AppError(httpStatus.NOT_FOUND, 'Give Slug and get single event');
  }
  const result = await Blog.findOne({ slug });
  return result;
};

const updateBlogs = async (payload: Partial<IBlogs>) => {
  const result = await Blog.findOneAndUpdate({ slug: payload.slug }, payload);
  return result;
};

const deleteSingleBlogs = async (slug: string) => {
  if (!slug) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Give Slug and delete single Blogs',
    );
  }
  const BlogsExits = await Blog.findOne({ slug });

  if (BlogsExits?.slug !== slug) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Give valid slug and delete single Blogs',
    );
  }
  const result = await Blog.deleteOne({ slug });
  return result;
};

export const BlogServices = {
  createBlogs,
  getAllBlogs,
  getSingleBlog,
  updateBlogs,
  deleteSingleBlogs,
};
