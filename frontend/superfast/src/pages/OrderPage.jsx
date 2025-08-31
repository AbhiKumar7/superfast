import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartProductApi } from "../apiMiddleware/cartMiddleware";
import { newOrderApi } from "../apiMiddleware/orderMiddleware";
import { RippleRingLoader } from "react-loaderkit";
import { useNavigate } from "react-router-dom";
function OrderPage() {
  const [openMethod, setOpenMethod] = useState("cash");
  const address = JSON.parse(localStorage.getItem("address"));
  const [cartProducts, setcartProducts] = useState([]);
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const { quantity } = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.order);
   
   

  const toggleMethod = (method) => {
    setOpenMethod(openMethod === method ? null : method);
  };

  const totalAmount = cartProducts.reduce((acc, item) => {
    return acc + item.productId.price * item.quantity;
  }, 0);
  useEffect(() => {
    dispatch(getAllCartProductApi()).then((data) => {
      const cartData = data?.payload;
      if (cartData) {
        setcartProducts(cartData?.cartItems);
      }
    });
  }, []);

  const handlenewOrder = () => {


    dispatch(newOrderApi(address?._id)).then((data) => {
      
      const orderSuccess = data?.payload;
      if(orderSuccess?.status){
         navigate("/")
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-20 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Left Section - Payment */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

          {["Add new UPI ID", "Cash"].map((method, idx) => (
            <div key={idx} className="border rounded-lg mb-3 overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left text-gray-700 font-medium"
                onClick={() => toggleMethod(method)}
              >
                {method}
                {openMethod === method ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {/* Expanded content */}
              {openMethod === method && (
                <div className="p-4 bg-gray-50 text-sm text-gray-600">
                  {method === "Cash"
                    ? "Please keep exact change handy to help us serve you better"
                    : `Enter your ${method.toLowerCase()} details here.`}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Section - Delivery & Cart */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
          <div className="text-sm text-gray-600 mb-4">
            <p className="font-semibold">{address.name}</p>
            <p className="font-extralight text-sm">
              {address.house_no}, {address.nearby && `${address.nearby}, `}
              {address.city}, {address.state} - {address.pincode}
            </p>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">My Cart</span>
            <span className="text-sm text-gray-500">{quantity} items</span>
          </div>

          <div className="divide-y">
            {cartProducts.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.productId.image[0]}
                    alt={item.productId.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium truncate">
                      {item.productId.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} × {item.productId.price}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold">
                  ₹{item.productId.price * item.quantity}
                </p>
              </div>
            ))}
            <div className="flex justify-between">
              <div className="font-light">Total Price</div>
              <div className="font-extrabold">{totalAmount}</div>
            </div>
          </div>

          <button
            onClick={handlenewOrder}
            disabled={isLoading}
            className={`w-full py-3 mt-4 rounded-lg font-semibold text-white
    ${
      isLoading
        ? "bg-green-600 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }
  `}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <RippleRingLoader size={30} color="#000000" speed={2} />
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
