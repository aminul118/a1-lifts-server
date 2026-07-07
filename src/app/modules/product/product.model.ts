import { model, Schema } from 'mongoose';
import { IProduct, IProductCategory } from './product.interface';
import generateSlug from '../../middlewares/generateSlug';

// Products

const ProductSchema = new Schema<IProduct>(
  {
    slug: { type: String, index: true },
    product_name: { type: String, required: true },
    productDetails: { type: String },

    // Product schema
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
      index: true,
    },

    subCategory: { type: String, default: null, index: true },
    product_img: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

generateSlug<IProduct>(ProductSchema, 'product_name', 'slug');

const Product = model<IProduct>('Product', ProductSchema);

// Product Category

const ProductCategorySchema = new Schema<IProductCategory>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String },
  },
  { timestamps: true, versionKey: false },
);

generateSlug<IProductCategory>(ProductCategorySchema, 'title', 'slug');

const ProductCategory = model<IProductCategory>(
  'ProductCategory',
  ProductCategorySchema,
);

export { Product, ProductCategory };
