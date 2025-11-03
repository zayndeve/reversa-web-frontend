import axios from "axios";
import { serverApi } from "../libs/config";
import { OrderInput, OrderResult } from "../libs/types/order";

class OrderService {
  private readonly path = serverApi;

  public async createOrder(input: OrderInput): Promise<OrderResult> {
    const url = `${this.path}/api/order`;
    const result = await axios.post(url, input, { withCredentials: true });
    return result.data;
  }
}

export default OrderService;
