import React from "react";
import { ShoppingCart } from "lucide-react";
import "../../css/productDetail.css";

const ProductDetail = () => {
  const product = {
    id: 1,
    title: "Brown Wool Sweater",
    price: 46.91,
    originalPrice: 59.99,
    image: "/img/sample1.jpg",
    description:
      "This brown wool sweater is crafted from premium threads, providing exceptional warmth and timeless style for your seasonal outfits.",
    views: 324,
  };

  return (
    <div className="antique-product-detail-wrapper">
      <div className="antique-product-detail-image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="antique-product-detail-info">
        <h1 className="antique-product-title">{product.title}</h1>

        <p className="antique-product-description">{product.description}</p>

        <p className="antique-price">
          ${product.price.toFixed(2)}
          <span className="original-price">
            ${product.originalPrice.toFixed(2)}
          </span>
        </p>

        <div className="antique-detail-bottom">
          <div className="antique-views">👁️ {product.views} views</div>
          <button className="antique-cart-button">
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
