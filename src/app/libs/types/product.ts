import {
  ProductCategory,
  ProductSize,
  ProductStatus,
  ProductTag,
} from "../enums/products.enum";

// Main product model (from backend)
export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize?: ProductSize;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  productVolume?: number;
  productTags?: ProductTag[];
  productRating?: number;
  updatedAt: Date;
}
export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCategory?: ProductCategory;
  search?: string;
  category?: string[]; // new
  size?: string[]; // new
  tag?: string[];
}
// Product creation input (for forms, admin panels, API calls)
export interface ProductInput {
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize?: ProductSize;
  productDesc?: string;
  productImages: string[];
  productVolume?: number;
  productTags?: ProductTag[];
}

// Product update input (for update APIs)
export interface ProductUpdateInput {
  _id: string;
  productStatus?: ProductStatus;
  productCategory?: ProductCategory;
  productName?: string;
  productPrice?: number;
  productLeftCount?: number;
  productSize?: ProductSize;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
  productVolume?: number;
  productTags?: ProductTag[];
}
