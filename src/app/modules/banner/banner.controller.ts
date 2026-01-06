import httpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BannerServices } from './banner.service';

const createBanners = catchAsync(async (req: Request, res: Response) => {
  const parsedData = JSON.parse(req.body.data);

  const payload = {
    ...parsedData,
    photo: req.file?.path,
  };

  const data = await BannerServices.createBanner(payload);
  console.log(data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Banner create successfully',
    data,
  });
});

const deleteSingleBanner = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await BannerServices.deleteSingleBanner(id);
  console.log(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner delete successfully',
    data,
  });
});

const getAllBanners = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await BannerServices.getAllBanners(
    req.query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Banners retrieved successfully.',
    data,
    meta,
  });
});

export const BannerControllers = {
  createBanners,
  getAllBanners,
  deleteSingleBanner,
};
