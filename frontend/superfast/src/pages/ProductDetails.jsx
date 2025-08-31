import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductByIdApi } from "../apiMiddleware/productMiddleware";
import DisplayProductDetails from "../components/fullDetailproduct/DisplayProductDetails";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { LuIndianRupee } from "react-icons/lu";
import { decreaseLocalCart, updateLocalCart } from "../cartSlice/CartSlice";
import {
  addToCartApi,
  getAllCartProductApi,
  updateCartItemApi,
} from "../apiMiddleware/cartMiddleware";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productdetail, setProductDetail] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if(isAuthenticated){

      const cartData = JSON.parse(localStorage.getItem("cart"));
      const cartProduct = cartData.totalProduct.find(
        (item) => item.productId === productId
      );
      
      if (cartProduct) {
        setQuantity(cartProduct.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, []);

  useEffect(() => {
    if (!productId) return;

    dispatch(getProductByIdApi(productId)).then((data) => {
      if (data.payload?.status) {
        setProductDetail(data.payload.product);
      }
    });
  }, [productId, dispatch]);

  if (!productdetail) return <p>Loading...</p>;

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);

    if (isAuthenticated) {
      dispatch(updateLocalCart(productId));

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
      dispatch(decreaseLocalCart(productId));

      dispatch(updateCartItemApi({ productId, quantity: -1 })).then(() =>
        dispatch(getAllCartProductApi())
      );
    }
  };
  return (
    <div className="mt-30 container mx-auto">
      <div className="flex gap-6">
        {/* Product Images / details */}
        <DisplayProductDetails productdetail={productdetail} />

        {/* Right side info */}
        <div className="flex flex-col gap-3">
          <p className="text-xl font-semibold">{productdetail.name}</p>

          <div className="flex items-center gap-2">
            <LuIndianRupee />
            <small className="text-xl">{productdetail.price}</small>
          </div>

          {quantity ? (
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
      </div>
    </div>
  );
}

export default ProductDetails;
