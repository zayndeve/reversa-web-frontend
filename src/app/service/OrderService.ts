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
      {
        withCredentials: true, // ✅ Send session cookie
      }
    );
    return result.data;
  }
  public async saveOrderToDatabase(orderInput: OrderInput): Promise<any> {
    const url = `${this.path}/api/order/save-paid-order`;
    const result = await axios.post(url, orderInput, {
      withCredentials: true, // ✅ Send session cookie
    });
    return result.data;
  }
  public async getMyOrders(): Promise<any[]> {
    const url = `${this.path}/api/order/my-orders`;
    console.log("🧾 My Orders API URL:", url);
    console.log("🧾 Sending session cookie");
    const result = await axios.get(url, {
      withCredentials: true, // ✅ Send session cookie
    });
    console.log("🧾 Raw response:", result);
    console.log("🧾 Response data:", result.data);
    const orders = result.data.data || result.data || [];
    console.log("🧾 Processed orders:", orders);
    return orders;
  }
}

export default OrderService;
