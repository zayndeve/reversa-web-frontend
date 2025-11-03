import axios from "axios";
import { serverApi } from "../libs/config";
import { Product, ProductInquiry } from "../libs/types/product";

class ProductService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  /** Get New Arrivals */
  public async getNewArrivals(input: ProductInquiry): Promise<Product[]> {
    try {
      let url = `${this.path}/product/new-arrivals?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.productCategory)
        url += `&productCategory=${input.productCategory}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url, { withCredentials: true });
      console.log("getNewArrivals", result);
      return result.data;
    } catch (err) {
      console.error("Error, getNewArrivals:", err);
      throw err;
    }
  }

  /** Get Popular Products */
  /** Get Popular Product by ID and increase views */
  public async getPopularProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/popular/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("getPopularProduct", result);
      return result.data;
    } catch (err) {
      console.error("Error, getPopularProduct:", err);
      throw err;
    }
  }
  /** Get All Products for Grid/List View */
  public async getProductList(
    input: ProductInquiry
  ): Promise<{ products: Product[]; total: number }> {
    try {
      const params = new URLSearchParams();

      params.append("order", input.order);
      params.append("page", String(input.page));
      params.append("limit", String(input.limit));

      if (input.productCategory)
        params.append("productCategory", input.productCategory);
      if (input.search) params.append("search", input.search);

      // ✅ Add these:
      if (input.category?.length) {
        input.category.forEach((val) => params.append("category", val));
      }
      if (input.size?.length) {
        input.size.forEach((val) => params.append("size", val));
      }
      if (input.tag?.length) {
        input.tag.forEach((val) => params.append("tag", val));
      }

      const url = `${this.path}/api/product/list?${params.toString()}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("getProductList", result);
      return result.data;
    } catch (err) {
      console.error("Error, getProductList:", err);
      throw err;
    }
  }
}

export default ProductService;
