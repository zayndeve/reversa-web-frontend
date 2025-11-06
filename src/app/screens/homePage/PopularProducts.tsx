import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../../libs/types/product';
import { ProductTag } from '../../libs/enums/products.enum';
import { serverApi } from '../../libs/config';
import Swiper from '../../components/common/Swiper';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../css/homePage.css';
import ProductService from '../../service/ProductService';

// ✅ Helper function to format tag names consistently
const formatTagName = (tag: string): string => {
  if (!tag) return "";
  
  // Map of known tags to their display names (ALL UPPERCASE, NO UNDERSCORES)
  const tagMap: Record<string, string> = {
    "hot": "HOT",
    "newArrival": "NEW ARRIVAL",
    "bestseller": "BESTSELLER",
    "limitedEdition": "LIMITED EDITION",
    "sale": "SALE",
    "exclusive": "EXCLUSIVE",
  };
  
  return tagMap[tag] || tag.toUpperCase();
};

// ✅ Stars render helper
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <>
      {'★'.repeat(fullStars)}
      {halfStar && '☆'}
      {'☆'.repeat(5 - fullStars - (halfStar ? 1 : 0))}
    </>
  );
};

// ✅ Product card with click-to-detail
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-img-wrapper">
        <img src={product.productImages?.[0] ? `${serverApi}/uploads/products/${product.productImages[0]}` : undefined} alt={product.productName || 'Product'} onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.no-image-placeholder')) {
              const placeholder = document.createElement('div');
              placeholder.className = 'no-image-placeholder';
              placeholder.innerHTML = '<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#ddd"/><text x="50%" y="50%" font-size="18" fill="#999" text-anchor="middle" dy=".3em">No Image</text></svg>';
              parent.appendChild(placeholder);
            }
          }} />
        {/* ✅ Show all product tags using formatter */}
        {product.productTags?.map((tag, idx) => (
          <span 
            key={idx} 
            className={`product-badge ${tag}`}
            style={{ color: '#fff', fontWeight: 'bold' }}
          >
            {formatTagName(tag)}
          </span>
        ))}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.productName || 'Unknown Product'}</h3>
        <div className="product-price">
          <span className="price-now">${product.productPrice || 0}</span>
          <span className="price-old">${(product.productPrice || 0) + 15}</span>
        </div>
        <div className="product-views">
          <Eye size={16} style={{ marginRight: '5px' }} />
          {product.productViews ?? 0} Views
        </div>
        <div className="product-rating">{renderStars(product.productRating ?? 4)}</div>
      </div>
    </div>
  );
};

export default function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    setNavReady(true);
    fetchPopularProducts();
  }, []);

  const fetchPopularProducts = async () => {
    try {
      const productService = new ProductService();
      const params = {
        order: 'productViews',
        page: 1,
        limit: 8,
      };
      const products = await productService.getPopularProducts(params);
      setProducts(products);
    } catch (error) {
      console.error('Error fetching popular products:', error);
    }
  };

  return (
    <section className="new-products-section">
      <div className="container">
        <div className="new-products-header">
          <h2>Popular Products</h2>
        </div>
        {navReady && products.length > 0 && (
          <Swiper
            slides={products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            slidesPerView={4}
            spaceBetween={30}
            loop
            navigation={{
              prevEl: prevRef.current!,
              nextEl: nextRef.current!,
            }}
          />
        )}
      </div>
    </section>
  );
}
