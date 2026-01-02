import httpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubscribeServices } from './subscribe.service';

const createSubscribe = catchAsync(async (req: Request, res: Response) => {
  const data = await SubscribeServices.createSubscribe(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Subscribe successfully',
    data,
  });
});

const getAllSubscriber = catchAsync(async (req: Request, res: Response) => {
  const data = await SubscribeServices.getAllSubscribers(
    req.query as Record<string, string>,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Subscribers retrieve successfully',
    data,
  });
});

export const SubscribeController = {
  createSubscribe,
  getAllSubscriber,
};
