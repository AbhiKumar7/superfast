import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { chageOrderStatusAdminApi, getAllOrderAdminApi } from "../../apiMiddleware/orderMiddleware";

function Orders() {
  const dispatch = useDispatch();
  const [orderResults, setOrderResults] = useState([]);
  const [statusMap, setStatusMap] = useState({});
 const handleStatusChange = (orderId, newStatus) => {
     
     dispatch(chageOrderStatusAdminApi({orderId,status:newStatus}))
  };
  useEffect(() => {
    dispatch(getAllOrderAdminApi()).then((data) => {
      const orderData = data?.payload;
      if (orderData?.status) {
        setOrderResults(orderData?.orders || []);
      }
    });
  }, [dispatch,handleStatusChange]);

 

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📦 Admin Orders</h1>

      {orderResults.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orderResults.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-4 md:p-6"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-3 mb-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order ID:{" "}
                    <span className="text-indigo-600">
                      {order.orderId || order._id}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      (statusMap[order._id] || order.payment_status) ===
                      "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : (statusMap[order._id] || order.payment_status) ===
                          "paid"
                        ? "bg-green-100 text-green-700"
                        : (statusMap[order._id] || order.payment_status) ===
                          "dispatch"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {statusMap[order._id] || order.payment_status || "pending"}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">
                  🚚 Delivery Address
                </h3>
                <p className="text-gray-700">
                  {order.delivery_address?.name}{" "}
                  {order.delivery_address?.phone}
                </p>
                <p className="text-gray-600 text-sm">
                  {order.delivery_address?.house_no},{" "}
                  {order.delivery_address?.city},{" "}
                  {order.delivery_address?.state} -{" "}
                  {order.delivery_address?.pincode}
                </p>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-md font-semibold mb-2">🛒 Products</h3>
                <div className="space-y-3">
                  {order.product_details?.map((product, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            Array.isArray(product.image)
                              ? product.image[0]
                              : product.image ||
                                "https://via.placeholder.com/60"
                          }
                          alt={product.name}
                          className="w-14 h-14 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {product.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ₹{product.subtotal}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer with Dropdown */}
              <div className="mt-4 flex flex-col md:flex-row justify-between items-center border-t pt-3 gap-3">
                <p className="font-bold text-lg">Total: ₹{order.totalAmt}</p>

                <select
                  value={statusMap[order._id] || order.payment_status || "pending"}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border px-3 py-2 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="dispatch">Dispatch</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
