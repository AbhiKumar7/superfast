import React, { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCartApi,
  getAllCartProductApi,
  updateCartItemApi,
} from "../../apiMiddleware/cartMiddleware";
import { updateLocalCart, decreaseLocalCart } from "../../cartSlice/CartSlice";
import { useNavigate } from "react-router-dom";

function CustomAddToCart({ productId }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllCartProductApi()).then((res) => {
        const cartItems = res.payload?.cartItems || [];
        const item = cartItems.find((i) => i.productId._id === productId);
        setQuantity(item ? item.quantity : 0);
      });
    }
  }, [dispatch, productId]);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);

    if (isAuthenticated) {
      // Update local cart
      dispatch(updateLocalCart(productId));

      // Update backend stock
      dispatch(addToCartApi({ productId, quantity: 1 })).then(() =>
        dispatch(getAllCartProductApi())
      );
    } else {
      navigate("/login");
    }
  };

  const handleRemove = () => {
    if (quantity <= 0) return;

    setQuantity((prev) => prev - 1);

    if (isAuthenticated) {
      // Update local cart
      dispatch(decreaseLocalCart(productId));

      // Update backend stock
      dispatch(updateCartItemApi({ productId, quantity: -1 })).then(() =>
        dispatch(getAllCartProductApi())
      );
    }
  };

  return (
    <div>
      {quantity > 0 ? (
        <div className="flex justify-center items-center gap-2 border border-green-600 text-green-600 px-3 py-1 text-sm rounded hover:bg-green-50 transition">
          <button onClick={handleRemove}>
            <FiMinus />
          </button>
          <span>{quantity}</span>
          <button onClick={handleAdd}>
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

export default CustomAddToCart;
