import httpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlogs = catchAsync(async (req: Request, res: Response) => {
  const parsedData = JSON.parse(req.body.data);
  const payload = {
    ...parsedData,
    photos: req.file,
  };

  console.log(payload);

  const data = await BlogServices.createBlogs(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blogs create successfully',
    data,
  });
});

const updateBlogs = catchAsync(async (req: Request, res: Response) => {
  const data = await BlogServices.updateBlogs(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blogs update successfully',
    data,
  });
});

const deleteSingleBlogs = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const data = await BlogServices.deleteSingleBlogs(slug);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blogs delete successfully',
    data,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const { data, meta } = await BlogServices.getAllBlogs(
    query as Record<string, string>,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blogss retrieve successfully',
    data,
    meta,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const data = await BlogServices.getSingleBlog(slug);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blogs retrieve successfully',
    data,
  });
});

export const BlogControllers = {
  createBlogs,
  updateBlogs,
  deleteSingleBlogs,
  getAllBlogs,
  getSingleBlog,
};
