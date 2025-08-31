import React, { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import CategorySideBar from "../components/showCategoryUi/CategorySideBar";
import DisplayRelatedProduct from "../components/showCategoryUi/DisplayRelatedProduct";

import { useDispatch } from "react-redux";
import { getAllSubCategoryApi } from "../apiMiddleware/subcategoryMiddleware";
import { getAllProductApi } from "../apiMiddleware/productMiddleware";

function CategoryPage() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [AllSubCategory, setAllSubCategory] = useState([]);
  const [allProducts, setallProducts] = useState([]);
  const [selectedSubcategoryProducts, setselectedSubcategoryProducts] =
    useState([]);

  useEffect(() => {
    dispatch(getAllSubCategoryApi()).then((data) => {
      if (data?.payload?.status) {
        setAllSubCategory(data?.payload?.subCategory);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getAllProductApi()).then((data) => {
      if (data?.payload?.status) {
        setallProducts(data?.payload?.product);
      }
    });
  }, []);

  const selectedCategory = AllSubCategory.filter((sub) => {
    return sub.category?.length && sub.category[0].name === categoryId;
  });

  const handleShowSelectedSubCategoryProducts = (subName) => {
    const selectedProduct = allProducts.filter((product) => {
      return product?.subCategory[0]?.name === subName;
    });
    setselectedSubcategoryProducts(selectedProduct);
  };

  useEffect(() => {
    if (AllSubCategory.length > 0 && allProducts.length > 0) {
      const categorySubList = AllSubCategory.filter(
        (sub) => sub.category?.[0]?.name === categoryId
      );

      if (categorySubList.length > 0) {
        const firstSubName = categorySubList[0]?.name;
        if (firstSubName) {
          handleShowSelectedSubCategoryProducts(firstSubName);
        }
      }
    }
  }, [AllSubCategory, allProducts, categoryId]);

  return (
    <div className="container border-1 mx-auto mt-20">
      <p>{categoryId}</p>
      <div className="flex">
        <CategorySideBar
          selectedCategory={selectedCategory}
          handleShowSelectedSubCategoryProducts={
            handleShowSelectedSubCategoryProducts
          }
        />
        <DisplayRelatedProduct
          selectedSubcategoryProducts={selectedSubcategoryProducts}
        />
      </div>
    </div>
  );
}

export default CategoryPage;
