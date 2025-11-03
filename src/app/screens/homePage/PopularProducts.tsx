import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../libs/types/product';
import { ProductTag } from '../../libs/enums/products.enum';
import { serverApi } from '../../libs/config';
import Swiper from '../../components/common/Swiper';
import { Eye } from 'lucide-react';
import '../../css/homePage.css';

// ✅ Dynamic stars rendering logic
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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="product-card">
    <div className="product-img-wrapper">
      <img src={`${serverApi}/${product.productImages[0]}`} alt={product.productName} />
      {product.productTags?.includes(ProductTag.HOT) && (
        <span className="product-badge hot">HOT</span>
      )}
      {product.productTags?.includes(ProductTag.BESTSELLER) && (
        <span className="product-badge bestseller">BESTSELLER</span>
      )}
    </div>
    <div className="product-info">
      <h3 className="product-name">{product.productName}</h3>
      <div className="product-price">
        <span className="price-now">${product.productPrice}</span>
        <span className="price-old">${product.productPrice + 15}</span>
      </div>
      <div className="product-views">
        <Eye size={16} style={{ marginRight: '5px' }} />
        {product.productViews ?? 0} Views
      </div>
      <div className="product-rating">{renderStars(product.productRating ?? 4)}</div>
    </div>
  </div>
);

export default function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    setNavReady(true);
    fetchPopularProducts();
  }, []);

  // ✅ Fetching from your backend
  const fetchPopularProducts = async () => {
    try {
      const response = await axios.get(`${serverApi}/api/product/popular-products`, {
        params: {
          order: 'productViews',
          page: 1,
          limit: 8,
        },
        withCredentials: true,
      });
      setProducts(response.data);
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
              <ProductCard key={product._id} product={product} />
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
