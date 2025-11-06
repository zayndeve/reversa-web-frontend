import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, ShoppingCart } from "lucide-react";

import { Product } from "../../../app/libs/types/product";
import ProductService from "../../../app/service/ProductService";
import { serverApi } from "../../../app/libs/config";
import { useAppDispatch } from "../hooks";
import { addToCart } from "../../../app/components/headers/cartSlice";
import "../../css/productDetail.css";

// ✅ Helper function to format tag names consistently
const formatTagName = (tag: string): string => {
  if (!tag) return "";
  
  // Map of known tags to their display names (ALL UPPERCASE, NO UNDERSCORES)
  const tagMap: Record<string, string> = {
    "hot": "HOT",
    "NEW_ARRIVAL": "NEW ARRIVAL",
    "newArrival": "NEW ARRIVAL",
    "bestseller": "BESTSELLER",
    "LIMITED_EDITION": "LIMITED EDITION",
    "limitedEdition": "LIMITED EDITION",
    "sale": "SALE",
    "exclusive": "EXCLUSIVE",
  };
  
  return tagMap[tag] || tag.toUpperCase().replace(/_/g, ' ');
};

// ✅ Helper to convert tag format to CSS class name
const getTagClassName = (tag: string): string => {
  const classMap: Record<string, string> = {
    "hot": "hot",
    "HOT": "hot",
    "NEW_ARRIVAL": "newArrival",
    "newArrival": "newArrival",
    "BESTSELLER": "bestseller",
    "bestseller": "bestseller",
    "LIMITED_EDITION": "limitedEdition",
    "limitedEdition": "limitedEdition",
    "SALE": "sale",
    "sale": "sale",
    "EXCLUSIVE": "exclusive",
    "exclusive": "exclusive",
  };
  return classMap[tag] || tag;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useAppDispatch();
    const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
        const res = await new ProductService().getPopularProduct(id);
// ✅ use correct method
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
          src={product.productImages?.[0] ? `${serverApi}/uploads/products/${product.productImages[0]}` : undefined}
          alt={product.productName || 'Product'}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.no-image-placeholder')) {
              const placeholder = document.createElement('div');
              placeholder.className = 'no-image-placeholder';
              placeholder.innerHTML = '<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#ddd"/><text x="50%" y="50%" font-size="18" fill="#999" text-anchor="middle" dy=".3em">No Image</text></svg>';
              parent.appendChild(placeholder);
            }
          }}
        />
        {product.productTags?.length && (
          <div className={`antique-product-tag-badge ${getTagClassName(product.productTags[0])}`}>
            {formatTagName(product.productTags[0])}
          </div>
        )}
      </div>

      <div className="antique-product-detail-info">
        <h1 className="antique-product-title">{product.productName || 'Unknown Product'}</h1>

        <p className="antique-product-description">{product.productDesc || 'No description available'}</p>

        <p className="antique-price">
          ${(product.productPrice || 0).toFixed(2)}
        </p>

        <div className="antique-detail-bottom">
        <div className="antique-views">
  <Eye size={16} /> {product.productViews || 0} views
</div>

          <button
            className="antique-cart-button"
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.productName || 'Unknown Product',
                  price: product.productPrice || 0,
                  image: product.productImages?.[0] || 'no-image',
                  quantity: 1,
                  size: product.productSize, 
                  tag: product.productTags,
                  category: product.productCategory,
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