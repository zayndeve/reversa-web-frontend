export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItemInput {
  productId: string;
  itemPrice: number;
  itemQuantity: number;
  productName: string; // ✅ NEW
  productImage: string;
}

export interface OrderInput {
  orderItems: OrderItemInput[];
  paymentMethod: string;
  shippingAddress: ShippingAddress;
}

export interface OrderResult {
  _id: string;
  memberId: string;
  orderTotal: number;
  orderDelivery: number;
  createdAt: string;
  updatedAt: string;
}
