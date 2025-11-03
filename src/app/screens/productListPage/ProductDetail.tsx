import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, ShoppingCart } from "lucide-react";

import { Product } from "../../../app/libs/types/product";
import ProductService from "../../../app/service/ProductService";
import { serverApi } from "../../../app/libs/config";
import { useAppDispatch } from "../hooks";
import { addToCart } from "../../../app/components/headers/cartSlice";
import "../../css/productDetail.css";


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useAppDispatch();
    const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await new ProductService().getProductById(id); // ✅ use correct method
          // assumes this fetches and increases view count
          setProduct(res);
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchData();
  }, [id]);
  const LoadingSpinner = () => (
    <div className="antique-loader-overlay">
      <div className="antique-loader" />
    </div>
  );
  

  if (!product) {
    return <LoadingSpinner />;
  }
  const handleBack = () => {
    navigate("/products");
  };
  return (
    <div className="antique-product-detail-wrapper">
       <div className="antique-product-detail-container">
      <div className="antique-product-detail-image">
        <img
          src={`${serverApi}/${product.ProductImages?.[0] || 'placeholder.jpg'}`}
          alt={product.ProductName || 'Product'}
        />
        {product.ProductTags?.length && (
          <div className="antique-product-tag-badge">
            {product.ProductTags[0].replace("_", " ")}
          </div>
        )}
      </div>

      <div className="antique-product-detail-info">
        <h1 className="antique-product-title">{product.ProductName || 'Unknown Product'}</h1>

        <p className="antique-product-description">{product.ProductDesc || 'No description available'}</p>

        <p className="antique-price">
          ${(product.ProductPrice || 0).toFixed(2)}
        </p>

        <div className="antique-detail-bottom">
        <div className="antique-views">
  <Eye size={16} /> {product.ProductViews || 0} views
</div>

          <button
            className="antique-cart-button"
            onClick={() =>
              dispatch(
                addToCart({
                  id: product._id,
                  name: product.ProductName || 'Unknown Product',
                  price: product.ProductPrice || 0,
                  image: product.ProductImages?.[0] || 'placeholder.jpg',
                  quantity: 1,
                  size: product.ProductSize, 
                  tag: product.ProductTags,
                  category: product.ProductCategory,
                })
              )
            }
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
        <button className="back-btnn" onClick={handleBack}>← Back to Cart</button>
      </div>
      </div>
    </div>
  );
};

export default ProductDetail;