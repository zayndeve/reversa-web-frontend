import React, { useEffect, useState } from "react";
import "../../css/productsListPage.css";
import { Eye, ShoppingCart } from "lucide-react";
import Pagination from "../../../app/libs/data/Pagination";
import { Product, ProductInquiry } from "../../../app/libs/types/product";
import ProductService from "../../../app/service/ProductService";
import { serverApi } from "../../../app/libs/config";
import { useAppDispatch } from "../hooks";
import { addToCart } from "../../../app/components/headers/cartSlice";import { useNavigate } from "react-router-dom";


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
  }, [currentPage, sortOrder, filters,onMetadataUpdate]);

  const handleCardClick = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totalPages = Math.ceil(total / productsPerPage);
  const navigate = useNavigate();
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
        {products.map((product, index) => {
          const isSelected = selectedProductIds.includes(product.id);

          return (
            <div
              key={product.id || `product-${index}`}
              className={`antique-product-card ${
                viewMode === "list" ? "list-view" : "grid-view"
              } ${isSelected ? "selected" : ""}`}
              onClick={() => {
                handleCardClick(product.id);
                navigate(`/products/${product.id}`);
              }}
            >
              <div className="antique-product-image">
                {product.productTags?.length && product.productTags.length > 0 && (
                  <div className={`antique-product-tag ${product.productTags[0]}`}>
                    {formatTagName(product.productTags[0])}
                  </div>
                )}
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
              </div>

              <div className="antique-product-info">
                <div className="antique-product-price-title">
                  <div className="antique-price">
                    ${(product.productPrice || 0).toFixed(2)}
                  </div>
                  <h4>{product.productName || 'Unknown Product'}</h4>
                  <div className="antique-stars">
                    {"★".repeat(product.productRating || 4)}
                    {"☆".repeat(5 - (product.productRating || 4))}
                  </div>
                </div>

                {viewMode === "list" && (
                  <p className="antique-product-description">
                    {product.productDesc || 'No description available'}
                  </p>
                )}

                <div className="antique-product-actions">
                  <div className="antique-product-view-count">
                    <Eye size={16} /> {product.productViews || 0} views
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      animateToCart(e, product.productImages?.[0] ? `${serverApi}/uploads/products/${product.productImages[0]}` : 'no-image');
                      dispatch(
                        addToCart({
                          id: product.id,
                          name: product.productName || "Unknown Product",
                          price: product.productPrice,
                          image: Array.isArray(product.productImages)
                            ? product.productImages[0]
                            : product.productImages || "no-image",
                          quantity: 1,
                          size: product.productSize,
                          tag: product.productTags,
                          category: product.productCategory,
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