import React from "react";
import "../../css/productsListPage.css"; // Make sure this path is correct
import { Link, useLocation } from "react-router-dom";

const ProductsBanner = () => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.startsWith("/order")) return "Order Page";
    if (location.pathname.startsWith("/account")) return "My Page";
    if (location.pathname.startsWith("/about")) return "About Us";
    if (location.pathname.startsWith("/contact")) return "Contact Us";
    return "Shop List";
  };

  return (
    <div className="antique-page-wrapper">
      <div className="antique-page-heading">
        <div className="antique-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{getTitle()}</span>
        </div>
        <h1 className="antique-heading-title">{getTitle()}</h1>
      </div>
    </div>
  );
};

export default ProductsBanner;
