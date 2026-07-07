import mongoose from 'mongoose';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { productSearchableField } from './product.constant';
import { IProduct } from './product.interface';
import { Product, ProductCategory } from './product.model';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';

const createProducts = async (payload: IProduct) => {
  const res = await Product.create(payload);
  return res;
};

const createProductCategory = async (payload: IProduct) => {
  const res = await ProductCategory.create(payload);
  return res;
};
const getAllProductCategory = async () => {
  const res = await ProductCategory.find();
  return res;
};

const getAllProducts = async (query: Record<string, string>) => {
  const modifiedQuery = { ...query };

  // 🔥 Handle category filter (id | slug | title | number)
  if (query.category) {
    let categoryId;

    // 1️⃣ If ObjectId
    if (mongoose.Types.ObjectId.isValid(query.category)) {
      categoryId = query.category;
    }

    // 2️⃣ If number-like string (customId)
    else if (!isNaN(Number(query.category))) {
      const category = await ProductCategory.findOne({
        customId: Number(query.category),
      });
      if (!category) {
        return {
          data: [],
          meta: { page: 1, limit: 10, total: 0, totalPage: 0 },
        };
      }
      categoryId = category._id.toString();
    }

    //  If slug or title
    else {
      const category = await ProductCategory.findOne({
        $or: [{ slug: query.category }, { title: query.category }],
      });
      if (!category) {
        return {
          data: [],
          meta: { page: 1, limit: 10, total: 0, totalPage: 0 },
        };
      }
      categoryId = category._id.toString();
    }

    // ✅ Replace category with ObjectId string
    modifiedQuery.category = categoryId;
  }

  const queryBuilder = new QueryBuilder(
    Product.find().populate('category', 'title slug'),
    modifiedQuery,
  );

  const products = await queryBuilder
    .search(productSearchableField)
    .filter()
    .fields()
    .paginate()
    .sort();

  const [data, meta] = await Promise.all([
    products.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const deleteSingleProduct = async (id: string) => {
  const res = await Product.findByIdAndDelete(id);

  //  Delete image from Cloudinary
  if (res?._id && res.product_img) {
    await deleteImageFromCLoudinary(res.product_img);
  }

  return res;
};

export const ProductServices = {
  createProducts,
  createProductCategory,
  getAllProductCategory,
  getAllProducts,
  deleteSingleProduct,
};
