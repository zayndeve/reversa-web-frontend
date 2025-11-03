import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../../app/libs/types/product';
import { ProductTag } from '../../../app/libs/enums/products.enum';
import { serverApi } from '../../../app/libs/config';
import Swiper from '../../../app/components/common/Swiper';
import '../../css/homePage.css';
import { useNavigate } from 'react-router-dom/dist';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

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

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product._id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-img-wrapper">
        <img
          src={`${serverApi}/${product.productImages[0]}`}
          alt={product.productName}
        />
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
        <div className="product-rating">
          {renderStars(product.productRating ?? 4)}
        </div>
      </div>
    </div>
  );
};


export default function NewProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    setNavReady(true);
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(`${serverApi}/api/product/new-arrivals`, {
        params: {
          order: 'createdAt',
          page: 1,
          limit: 8,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
    }
  };

  return (
    <section className="new-products-section">
      <div className="container">
        <div className="new-products-header">
          <h2>New Arrivals</h2>
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
