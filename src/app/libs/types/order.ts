export interface ShippingAddress {
  FullName: string;
  Phone: string;
  Address: string;
  City: string;
  PostalCode: string;
  Country: string;
}

export interface OrderItemInput {
  ProductId: string;
  ItemPrice: number;
  ItemQuantity: number;
  ProductName: string; // ✅ NEW
  ProductImage: string;
}

export interface OrderInput {
  OrderItems: OrderItemInput[];
  PaymentMethod: string;
  ShippingAddress: ShippingAddress;
}

export interface OrderResult {
  Id: string;
  MemberId: string;
  TotalAmount: number;
  PaymentMethod: string;
  OrderStatus: string;
  ShippingAddress: ShippingAddress;
  PreviewItem: {
    Name: string;
    Image: string;
  };
  CreatedAt: string;
  UpdatedAt: string;
}
