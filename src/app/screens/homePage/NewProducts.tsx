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
          src={product.ProductImages?.[0] ? `${serverApi}/${product.ProductImages[0]}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='}
          alt={product.ProductName || 'Product'}
        />
        {product.ProductTags?.includes(ProductTag.HOT) && (
          <span className="product-badge hot">HOT</span>
        )}
        {product.ProductTags?.includes(ProductTag.BESTSELLER) && (
          <span className="product-badge bestseller">BESTSELLER</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.ProductName || 'Unknown Product'}</h3>
        <div className="product-price">
          <span className="price-now">${product.ProductPrice || 0}</span>
          <span className="price-old">${(product.ProductPrice || 0) + 15}</span>
        </div>
        <div className="product-rating">
          {renderStars(product.ProductRating ?? 4)}
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
