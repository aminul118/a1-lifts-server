import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { bannerSearchableField } from './banner.constant';
import { IBanner } from './banner.interface';
import { Banner } from './banner.model';

const createBanner = async (payload: IBanner) => {
  const res = await Banner.create(payload);
  return res;
};

const getAllBanners = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Banner.find(), query);

  const banners = await queryBuilder
    .search(bannerSearchableField)
    .filter()
    .fields()
    .paginate()
    .sort();

  const [data, meta] = await Promise.all([
    banners.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const deleteSingleBanner = async (id: string) => {
  const res = await Banner.findByIdAndDelete(id);

  //  Delete image from Cloudinary
  if (res?._id && res.photo) {
    await deleteImageFromCLoudinary(res.photo);
  }

  return res;
};

export const BannerServices = {
  createBanner,
  getAllBanners,
  deleteSingleBanner,
};
