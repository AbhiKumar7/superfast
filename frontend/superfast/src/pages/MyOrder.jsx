import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { getAllOrderApi } from "../apiMiddleware/orderMiddleware";

function MyOrder() {
  const dispatch = useDispatch();
  const [orderResults, setorderResults] = useState([]);

  useEffect(() => {
    dispatch(getAllOrderApi()).then((data) => {
      const orderData = data?.payload;
      if (orderData?.status) {
        setorderResults(orderData?.orders || []);
      }
    });
  }, [dispatch]);

  return (
    <div className="mt-22 max-w-5xl mx-auto px-4">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">My Orders</h2>

      {orderResults.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orderResults.map((order) => (
            <div
              key={order._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow-sm rounded-lg p-4 border"
            >
              {/* Left Section */}
              <div className="flex items-start gap-3 flex-1">
                <FaCheckCircle className="text-green-500 text-lg mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    Order #{order.orderId}
                  </p>
                  <p className="font-semibold text-green-600 ">Order Status: {order.payment_status}</p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    ₹{order.totalAmt} •{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  {/* Products Preview */}
                  <div className="flex mt-2 gap-2">
                    {order.product_details.slice(0, 3).map((product, index) => (
                      <img
                        key={index}
                        src={product.image[0]} // show first image of each product
                        alt={product.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain border rounded"
                      />
                    ))}
                    {order.product_details.length > 3 && (
                      <span className="text-xs text-gray-400 self-center">
                        +{order.product_details.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Arrow */}
              <div className="mt-3 sm:mt-0 flex justify-end">
                <HiOutlineArrowRight className="text-gray-500 text-xl sm:text-2xl" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrder;
