import React from "react";
import "../../css/productsListPage.css"; // Make sure this path is correct
import { Link } from "react-router-dom";

const ProductsBanner = () => {
  console.log("ProductsListPage loaded");
  return (
    <div className="antique-page-wrapper">
      <div className="antique-page-heading">
        <div className="antique-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Shop</span>
        </div>
        <h1 className="antique-heading-title">Shop List</h1>
      </div>
    </div>
  );
};

export default ProductsBanner;
