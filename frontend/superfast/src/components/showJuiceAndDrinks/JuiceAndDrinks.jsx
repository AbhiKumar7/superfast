import React from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import CustomAddToCart from "../customAddToCart/CustomAddToCart";
import { useNavigate } from "react-router-dom";
function JuiceAndDrinks({ AllProducts }) {
    const { totalProduct } = useSelector((state) => state.cart);
  const scrollRef = useRef(null);
   const navigate = useNavigate();
  const scroll = (direction) => {
    const scrollAmount = 300;

    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,

        behavior: "smooth",
      });
    }
  };
  const juiceAndDrinksProduct = AllProducts.filter(
    (product) =>
      product.category?.length &&
      product.category[0].name === "Cold Drinks & Juices"
  );
  const navigateToproductDetailsPage = (productId) => {
    navigate(`/productdetail/${productId}`);
  };
  return (
    <div>
      <div className="relative px-4 py-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Cold Drinks & Juices
          </h2>
          <a href="#" className="text-green-600 font-medium hover:underline">
            see all
          </a>
        </div>
        <button
          onClick={() => scroll("left")}
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <FaChevronLeft />
        </button>
        <div
          className="flex overflow-x-auto gap-5 no-scrollbar scroll-smooth px-10"
          ref={scrollRef}
        >
          {juiceAndDrinksProduct.map((product) => (
            <div
              key={product._id}
              className="min-w-[180px] max-w-[180px] bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md flex-shrink-0"
            >
              <div onClick={() => navigateToproductDetailsPage(product._id)} className="w-full h-28 flex items-center justify-center overflow-hidden mb-2">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>

              <div className="flex items-center text-gray-500 text-xs mb-1">
                <BiTimeFive className="mr-1 text-sm" />8 MINS
              </div>
              <p className="text-sm text-gray-800 line-clamp-2">
                {product.name}
              </p>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center text-gray-800 font-semibold text-base">
                  <MdOutlineCurrencyRupee className="text-base " />
                  {product.price}
                </div>
                 <CustomAddToCart productId={product._id} product={product} />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default JuiceAndDrinks;
