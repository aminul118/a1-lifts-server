import httpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProducts = catchAsync(async (req: Request, res: Response) => {
  const parsedData = JSON.parse(req.body.data);

  const payload = {
    ...parsedData,
    product_img: req.file?.path,
  };

  console.log(payload);

  const data = await ProductServices.createProducts(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product create successfully',
    data,
  });
});

const createProductCategory = catchAsync(
  async (req: Request, res: Response) => {
    const data = await ProductServices.createProductCategory(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Product category create successfully',
      data,
    });
  },
);

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await ProductServices.getAllProducts(
    req.query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    data,
    meta,
  });
});

const getAllProductCategory = catchAsync(
  async (req: Request, res: Response) => {
    const data = await ProductServices.getAllProductCategory();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product category retrieved successfully',
      data,
    });
  },
);
const deleteSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await ProductServices.deleteSingleProduct(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product delete successfully',
    data,
  });
});

export const ProductControllers = {
  createProducts,
  createProductCategory,
  getAllProductCategory,
  getAllProducts,
  deleteSingleProduct,
};
