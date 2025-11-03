import React, { useEffect, useState, useRef } from "react";
import "../../css/productsListPage.css";
import { Eye, ShoppingCart } from "lucide-react";
import Pagination from "../../../app/libs/data/Pagination";
import { Product, ProductInquiry } from "../../../app/libs/types/product";
import ProductService from "../../../app/service/ProductService";
import { serverApi } from "../../../app/libs/config";
import { useAppDispatch } from "../hooks";
import { addToCart } from "../../../app/components/headers/cartSlice";

type ViewMode = "grid" | "list";

interface ProductsProps {
  viewMode: ViewMode;
  sortOrder: string;
  filters: {
    category: string[];
    size: string[];
    tag: string[];
  };
  onMetadataUpdate?: (data: { total: number; start: number; end: number }) => void;
}

const productService = new ProductService();

const Products: React.FC<ProductsProps> = ({
  viewMode,
  sortOrder,
  filters,
  onMetadataUpdate,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const productsPerPage = 6;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params: ProductInquiry = {
          order: sortOrder,
          page: currentPage,
          limit: productsPerPage,
          category: filters.category,
          size: filters.size,
          tag: filters.tag,
        };

        const result = await productService.getProductList(params);

        if (Array.isArray(result.products)) {
          setProducts(result.products);
          setTotal(result.total);

          if (onMetadataUpdate) {
            const start = (currentPage - 1) * productsPerPage + 1;
            const end = start + result.products.length - 1;
            onMetadataUpdate({ total: result.total, start, end });
          }
        } else {
          console.warn("Products response is not in expected format:", result);
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };

    fetchData();
  }, [currentPage, sortOrder, filters]);

  const handleCardClick = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totalPages = Math.ceil(total / productsPerPage);

  const animateToCart = (e: React.MouseEvent, imageSrc: string) => {
    const cartIcon = document.querySelector(".cart-icon");
    if (!cartIcon) return;

    const img = document.createElement("img");
    img.src = imageSrc;
    img.className = "flying-image";
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    img.style.top = `${rect.top}px`;
    img.style.left = `${rect.left}px`;

    document.body.appendChild(img);

    const cartRect = cartIcon.getBoundingClientRect();

    requestAnimationFrame(() => {
      img.style.transform = `translate(${cartRect.left - rect.left}px, ${
        cartRect.top - rect.top
      }px) scale(0.2)`;
      img.style.opacity = "0";
    });

    setTimeout(() => {
      document.body.removeChild(img);
    }, 600);
  };

  return (
    <>
      <div className={`antique-products-wrapper ${viewMode}`}>
        {products.map((product) => {
          const isSelected = selectedProductIds.includes(product._id);

          return (
            <div
              key={product._id}
              className={`antique-product-card ${
                viewMode === "list" ? "list-view" : "grid-view"
              } ${isSelected ? "selected" : ""}`}
              onClick={() => handleCardClick(product._id)}
            >
              <div className="antique-product-image">
                {product.productTags?.length && product.productTags.length > 0 && (
                  <div className="antique-product-tag">
                    {product.productTags?.[0]?.replace("_", " ")}
                  </div>
                )}
                <img
                  src={`${serverApi}/${product.productImages[0]}`}
                  alt={product.productName}
                />
              </div>

              <div className="antique-product-info">
                <div className="antique-product-price-title">
                  <div className="antique-price">
                    ${product.productPrice.toFixed(2)}
                  </div>
                  <h4>{product.productName}</h4>
                  <div className="antique-stars">
                    {"★".repeat(product.productRating || 4)}
                    {"☆".repeat(5 - (product.productRating || 4))}
                  </div>
                </div>

                {viewMode === "list" && (
                  <p className="antique-product-description">
                    {product.productDesc}
                  </p>
                )}

                <div className="antique-product-actions">
                  <div className="antique-product-view-count">
                    <Eye size={16} /> {product.productViews} views
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      animateToCart(e, `${serverApi}/${product.productImages[0]}`);
                      dispatch(
                        addToCart({
                          id: product._id,
                          name: product.productName,
                          price: product.productPrice,
                          image: product.productImages[0],
                          quantity: 1,
                        })
                      );
                    }}
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Products;