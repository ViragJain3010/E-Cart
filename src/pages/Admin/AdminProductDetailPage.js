import React from "react";
import AdminNavbar from "../../Feature/Admin/AdminNavbar";
import AdminProductDetail from "../../Feature/Admin/AdminProductDetail";

const ProductDetailPage = () => {
  return (
    <>
      <AdminNavbar>
        <AdminProductDetail />
      </AdminNavbar>
    </>
  );
};

export default ProductDetailPage;
