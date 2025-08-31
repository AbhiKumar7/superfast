import React, { useEffect, useState } from "react";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { LuIndianRupee } from "react-icons/lu";
import { useSelector } from "react-redux";

function Cart() {
  const { quantity, totalProduct } = useSelector((state) => state.cart);


  const [totalPrice, setTotalPrice] = useState(0);

useEffect(() => {
  const price = totalProduct.reduce((acc, item) => {
    const itemPrice = item.price || 0;      // use item.price directly
    const itemQuantity = item.quantity || 1;
    return acc + itemPrice * itemQuantity;
  }, 0);

  setTotalPrice(price);
}, [totalProduct]);

  return (
    <div>
      <div className="flex gap-2 items-center bg-green-500 px-3 py-1 rounded text-white text-sm md:text-base cursor-pointer">
        <div className="text-2xl md:text-3xl">
          <PiShoppingCartSimpleLight />
        </div>
        <div className="flex flex-col leading-none">
          <span>{quantity || 0} Items</span>
          <span className="flex items-center gap-1">
            <LuIndianRupee />
            {totalPrice || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cart;
