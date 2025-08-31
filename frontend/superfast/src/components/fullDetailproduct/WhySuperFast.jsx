import React from "react";

import { useDispatch, useSelector } from "react-redux";
import CustomAddToCart from "../customAddToCart/CustomAddToCart";
function WhySuperFast({ productdetail }) {
  if (!productdetail) {
    return <p>Loading...</p>;
  }

  const totalProduct = useSelector((state) => state.cart?.totalProduct || []);

 console.log(totalProduct);
 



const getProductQuantity = (productId) => {
  const cartItem = totalProduct.find(
    (item) => item.productId?._id === productId
  );
  return cartItem ? cartItem.quantity : 0;
};


  return (
    <div>
      <p className="text-xl">{productdetail.name}</p>
      <div className="flex items-center">
        <LuIndianRupee />
        <small className="text-xl">{productdetail.price}</small>
        <CustomAddToCart
          productId={productdetail._id}
          quantity={getProductQuantity(productdetail._id)}
        />
      </div>
    </div>
  );
}

export default WhySuperFast;
