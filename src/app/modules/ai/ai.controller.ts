import httpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AIServices } from './ai.service';

const createStats = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await AIServices.createStats(payload); // ✅ Correct service
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'AI Data added',
    data,
  });
});

const getStats = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const { data, meta } = await AIServices.getStats(
    query as Record<string, string>,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stats fetched successfully',
    data,
    meta,
  });
});

const createChat = catchAsync(async (req: Request, res: Response) => {
  const { message } = req.body;
  const data = await AIServices.createChat(message);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AI Response',
    data,
  });
});

const deleteAiData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await AIServices.deleteAiData(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AI Data Delete',
    data,
  });
});

export const AIControllers = {
  createChat,
  createStats,
  getStats,
  deleteAiData,
};
