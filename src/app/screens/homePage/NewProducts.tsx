import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../../../app/libs/types/product';
import { ProductTag } from '../../../app/libs/enums/products.enum';
import { serverApi } from '../../../app/libs/config';
import Swiper from '../../../app/components/common/Swiper';
import '../../css/homePage.css';
import { useNavigate } from 'react-router-dom/dist';
import ProductService from '../../../app/service/ProductService';

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
      onClick={() => navigate(`/products/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-img-wrapper">
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
        {product.productTags?.includes(ProductTag.HOT) && (
          <span className="product-badge hot">HOT</span>
        )}
        {product.productTags?.includes(ProductTag.BESTSELLER) && (
          <span className="product-badge bestseller">BESTSELLER</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.productName || 'Unknown Product'}</h3>
        <div className="product-price">
          <span className="price-now">${product.productPrice || 0}</span>
          <span className="price-old">${(product.productPrice || 0) + 15}</span>
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
      const productService = new ProductService();
      const params = {
        order: 'createdAt',
        page: 1,
        limit: 8,
      };
      const products = await productService.getNewArrivals(params);
      setProducts(products);
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
