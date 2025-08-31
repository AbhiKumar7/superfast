import React, { useEffect } from "react";
import paan from "../images/pa1.png";
import d from "../images/d.png";
import ds from "../images/ds.png";
import sa from "../images/sa.png";
import { useDispatch } from "react-redux";
import { getAllCategoryApi } from "../apiMiddleware/categoryMiddleware";
import { useState } from "react";
import DisplayCategoryProduct from "../components/displayCategoryProduct/DisplayCategoryProduct";
import { getAllProductApi } from "../apiMiddleware/productMiddleware";
import JuiceAndDrinks from "../components/showJuiceAndDrinks/JuiceAndDrinks";

import { useNavigate } from "react-router-dom";
function Home() {
  const [homeCategory, sethomeCategory] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoryApi()).then((data) => {
      const categoryData = data?.payload;
      if (categoryData?.status) {
        sethomeCategory(categoryData?.category);
      }
    });
  }, []);
  useEffect(() => {
    dispatch(getAllProductApi()).then((data) => {
      const productData = data?.payload;
      if (productData?.status) {
        setAllProducts([...productData?.product].reverse());
      }
    });
  }, []);

  const handleGoToCategory = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
  return (
    <div className="  relative mt-22">
      <div className="container mx-auto h-60 ">
        <div className="mt-4">
          <img
            src={d}
            alt="Mobile Featured"
            className="block sm:hidden container mx-auto "
          />
          <img src={paan} alt="Desktop Featured" className="hidden sm:block " />
        </div>
        <div className=" flex gap-4 mt-4 ">
          <div className="">
            <img src={sa} alt="" className="w-90 h-50" />
          </div>
          <div className="w-100 ">
            <img src={ds} alt="" className="w-90 h-50" />
          </div>
        </div>

        <div className="container mx-auto  grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 mt-5">
          {homeCategory.map((cate) => (
            <div key={cate._id} className="">
              <div
                onClick={() => handleGoToCategory(cate.name)}
                className="bg-gray-300 p-1 rounded "
              >
                <div>
                  <img className="w-50 h-40" src={cate?.image} alt="" />
                </div>
              </div>
              <div className=" text-center">{cate?.name}</div>
            </div>
          ))}
        </div>

        <div>
          <DisplayCategoryProduct AllProducts={AllProducts} />
        </div>
        <div>
          <JuiceAndDrinks AllProducts={AllProducts} />
        </div>
      </div>
    </div>
  );
}

export default Home;
