import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectNewProducts } from './selector';
import { Product } from '../../libs/types/product';
import { ProductTag } from '../../libs/enums/products.enum';

import '../../css/newProducts.css';
import Swiper from '../../components/common/Swiper';
import { Eye } from 'lucide-react';



const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="product-card">
    <div className="product-img-wrapper">
      <img src={product.productImages[0]} alt={product.productName} />
      {product.productTags?.includes(ProductTag.HOT) && <span className="product-badge hot">HOT</span>}
      {product.productTags?.includes(ProductTag.BESTSELLER) && <span className="product-badge bestseller">BESTSELLER</span>}
    </div>
    <div className="product-info">
      <h3 className="product-name">{product.productName}</h3>

      <div className="product-price">
        <span className="price-now">${product.productPrice}</span>
        <span className="price-old">${product.productPrice + 15}</span>
      </div>
      <div className="product-views">
  <Eye size={16} style={{ marginRight: '5px' }} />
  {product.productViews ?? 123} Views
</div>
      <div className="product-rating">★★★★☆</div>
    </div>
  </div>
);
export default function PopularProducts() {
  const products = useSelector(selectNewProducts) as Product[];
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    setNavReady(true); // Ensures refs are set before Swiper uses them
  }, []);

  const safeProducts = products.length
    ? products
    : [
        {
          _id: '1',
          productName: 'Adipisci voluptas',
          productPrice: 75.91,
          productImages: ['/img/sample1.jpg'],
          productTags: [ProductTag.HOT],
        },
        {
          _id: '2',
          productName: 'Possimus beatae',
          productPrice: 65.0,
          productImages: ['/img/sample2.jpg'],
          productTags: [ProductTag.BESTSELLER],
        },
        {
          _id: '2',
          productName: 'Possimus beatae',
          productPrice: 65.0,
          productImages: ['/img/sample2.jpg'],
          productTags: [ProductTag.BESTSELLER],
        },
        {
          _id: '2',
          productName: 'Possimus beatae',
          productPrice: 65.0,
          productImages: ['/img/sample2.jpg'],
          productTags: [ProductTag.BESTSELLER],
        },
        {
          _id: '2',
          productName: 'Possimus beatae',
          productPrice: 65.0,
          productImages: ['/img/sample2.jpg'],
          productTags: [ProductTag.BESTSELLER],
        }, {
          _id: '2',
          productName: 'Possimus beatae',
          productPrice: 65.0,
          productImages: ['/img/sample2.jpg'],
          productTags: [ProductTag.BESTSELLER],
        },
      ] as Product[];

  return (
    <section className="new-products-section">
      <div className="container">
        <div className="new-products-header">
          <h2>Popular Products</h2>
          
        </div>
        {navReady && (
          <Swiper
            slides={safeProducts.map((product) => (
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
