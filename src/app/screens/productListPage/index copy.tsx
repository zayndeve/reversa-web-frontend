import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Products from "./Products";
import ProductsBanner from "./ShopBanner";
import SidebarFilters from "./SideBar";
import ProductDetail from "./ProductDetail";
import { LayoutGrid, List } from "lucide-react";
import "../../css/productsListPage.css";

export default function ProductListPage() {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState("createdAt");

  const [filters, setFilters] = useState({
    category: [] as string[],
    size: [] as string[],
    tag: [] as string[],
  });

  const [resultMeta, setResultMeta] = useState({
    total: 0,
    start: 0,
    end: 0,
  });

  const handleFilterChange = (
    type: "category" | "size" | "tag",
    value: string
  ) => {
    setFilters((prev) => {
      const values = prev[type];
      const updated = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
      return { ...prev, [type]: updated };
    });
  };

  if (id) {
    return <ProductDetail />;
  }

  return (
    <>
      <ProductsBanner />

      <div className="antique-page-body">
        {/* === Sidebar === */}
        <SidebarFilters
          selectedCategories={filters.category}
          selectedSizes={filters.size}
          selectedTags={filters.tag}
          onFilterChange={handleFilterChange}
        />

        <div style={{ flex: 1 }}>
          {/* === Control Bar === */}
          <div className="antique-control-bar">
            <div className="antique-result-count">
              {resultMeta.total > 0 ? (
                <>
                  Showing {resultMeta.start}–{resultMeta.end} of{" "}
                  {resultMeta.total} results
                </>
              ) : (
                "No products found"
              )}
            </div>

            <div className="antique-sort-dropdown">
              <label htmlFor="sort">Sort By:</label>
              <select
                id="sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="createdAt">Recently arrived</option>
                <option value="productViews">Most Viewed</option>
                <option value="productPrice">Price: Low to High</option>
                <option value="productPriceDesc">Price: High to Low</option>
              </select>
            </div>

            <div className="antique-view-toggle">
              <button
                className={viewMode === "grid" ? "active" : ""}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={viewMode === "list" ? "active" : ""}
                onClick={() => setViewMode("list")}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* === Product Grid or List View === */}
          <Products
            viewMode={viewMode}
            sortOrder={sortOrder}
            filters={filters}
            onMetadataUpdate={setResultMeta}
          />
        </div>
      </div>
    </>
  );
}
