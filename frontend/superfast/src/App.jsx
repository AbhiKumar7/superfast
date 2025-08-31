import { useState, useEffect } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/header/Layout";
import SearchPage from "./pages/SearchPage";
import SignInPage from "./pages/SignInPage";
import VerifyOtp from "./pages/VerifyOtp";
import LoginPage from "./pages/LoginPage";

import AdminProtectedRoute from "./components/adminProtectedRoute/AdminProtectedRoute";
import Category from "./pages/adminRoute/Category";
import SubCategory from "./pages/adminRoute/SubCategory";
import Product from "./pages/adminRoute/Product";
import AdminLayout from "./components/adminHeader/AdminLayout";
import Orders from "./pages/adminRoute/Orders";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import CartDetails from "./components/header/CartDetails";
import OrderPage from "./pages/OrderPage";
import MyOrder from "./pages/MyOrder";


function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/showorders" element={<MyOrder />} />
          <Route
            path="/productdetail/:productId"
            element={<ProductDetails />}
          />
          <Route path="/register" element={<SignInPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
          <Route path="/orderpage" element={<OrderPage />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="category" element={<Category />} />
            <Route path="subcategory" element={<SubCategory />} />
            <Route path="product" element={<Product />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
