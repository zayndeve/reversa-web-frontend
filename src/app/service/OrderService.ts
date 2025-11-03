import axios from "axios";
import { serverApi } from "../libs/config";
import { OrderInput } from "../libs/types/order";

class OrderService {
  private readonly path = serverApi;

  public async createPaymentIntent(
    totalAmount: number
  ): Promise<{ clientSecret: string }> {
    const url = `${this.path}/api/order/create-payment-intent`;
    const result = await axios.post(
      url,
      { totalAmount },
      { withCredentials: true }
    );
    return result.data;
  }
  public async saveOrderToDatabase(orderInput: OrderInput): Promise<any> {
    const url = `${this.path}/api/order/save-success`;
    const result = await axios.post(url, orderInput, { withCredentials: true });
    return result.data;
  }
  public async getOrdersByMember(memberId: string): Promise<any[]> {
    const url = `${this.path}/api/order/member/${memberId}`;
    const result = await axios.get(url, { withCredentials: true });
    return result.data;
  }
}

export default OrderService;
