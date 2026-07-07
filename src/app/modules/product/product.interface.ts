import { Types } from 'mongoose';

export interface IProduct {
  _id?: string;
  slug?: string;
  product_name: string;
  productDetails?: string;
  category: Types.ObjectId; // 👈 reference
  subCategory?: string | null;
  product_img: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductCategory {
  _id?: string;
  title: string;
  slug?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
