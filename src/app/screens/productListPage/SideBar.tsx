import React, { useState } from "react";
import "../../css/productsListPage.css";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SidebarFiltersProps {
  selectedCategories: string[];
  selectedSizes: string[];
  selectedTags: string[];
  onFilterChange: (type: "category" | "size" | "tag", value: string) => void;
}

const categoryOptions = [
  "TOPS",
  "BOTTOMS",
  "OUTERWEAR",
  "SHOES",
  "ACCESSORIES",
  "DRESSES"
];
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const tagOptions = ["HOT", "SALE", "NEW_ARRIVAL", "LIMITED_EDITION"];

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  selectedCategories,
  selectedSizes,
  selectedTags,
  onFilterChange,
}) => {
  const [openSection, setOpenSection] = useState<"category" | "size" | "tag" | null>("category");

  const toggleSection = (section: "category" | "size" | "tag") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleCheckboxChange = (type: "category" | "size" | "tag", value: string) => {
    onFilterChange(type, value);
  };

  return (
    <aside className="antique-sidebar-wrapper">
      {/* Category Filter */}
      <div className="antique-filter-block">
        <h3
          className="antique-filter-title toggle-header"
          onClick={() => toggleSection("category")}
        >
          Categories {openSection === "category" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </h3>
        {openSection === "category" && (
          <ul className="antique-filter-list">
            {categoryOptions.map((cat) => (
              <li key={cat}>
                <input
                  type="checkbox"
                  id={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCheckboxChange("category", cat)}
                />
                <label htmlFor={cat}>{cat}</label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Size Filter */}
      <div className="antique-filter-block">
        <h3
          className="antique-filter-title toggle-header"
          onClick={() => toggleSection("size")}
        >
          Size {openSection === "size" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </h3>
        {openSection === "size" && (
          <ul className="antique-filter-list">
            {sizeOptions.map((size) => (
              <li key={size}>
                <input
                  type="checkbox"
                  id={size}
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleCheckboxChange("size", size)}
                />
                <label htmlFor={size}>{size}</label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tags Filter */}
      <div className="antique-filter-block">
        <h3
          className="antique-filter-title toggle-header"
          onClick={() => toggleSection("tag")}
        >
          Tags {openSection === "tag" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </h3>
        {openSection === "tag" && (
          <div className="antique-tags">
            {tagOptions.map((tag) => (
              <span
                key={tag}
                className={`tag ${selectedTags.includes(tag) ? "selected" : ""}`}
                onClick={() => handleCheckboxChange("tag", tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarFilters;