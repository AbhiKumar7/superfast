import React from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useDispatch } from "react-redux";
import {
  addToCartApi,
  deleteItemFromCart,
  getAllCartProductApi,
} from "../../apiMiddleware/cartMiddleware";

function AddQuantity({ productId, quantity }) {
  const dispatch = useDispatch();
console.log(quantity);

  const handleIncrease = () => {
    dispatch(addToCartApi({ productId, quantity: 1 })).then(() =>
      dispatch(getAllCartProductApi())
    );
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      dispatch(deleteItemFromCart(productId)).then(() =>
        dispatch(getAllCartProductApi())
      );
    } else {
      dispatch(addToCartApi({ productId, quantity: -1 })).then(() =>
        dispatch(getAllCartProductApi())
      );
    }
  };

  const handleAdd = () => {
    dispatch(addToCartApi({ productId, quantity: 1 })).then(() =>
      dispatch(getAllCartProductApi())
    );
  };

  return (
    <div>
      {quantity > 0 ? (
        <div className="flex justify-center items-center gap-2 border border-green-600 text-green-600 px-3 py-1 text-sm rounded hover:bg-green-50 transition">
          <button onClick={handleDecrease}>
            <FiMinus />
          </button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>
            <GoPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className="border border-green-600 text-green-600 px-3 py-1 text-sm rounded hover:bg-green-50 transition"
        >
          Add
        </button>
      )}
    </div>
  );
}

export default AddQuantity;
