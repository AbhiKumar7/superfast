import { FiMinus, FiPlus } from "react-icons/fi";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartApi,
  getAllCartProductApi,
  updateCartItemApi,
} from "../../apiMiddleware/cartMiddleware";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiHotelFill } from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";
import AddressPage from "../addressComponents/AddressPage";
import { getAddressByAddressIdApi } from "../../apiMiddleware/addressMiddleware";

export default function CartPage({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAddress, setShowAddress] = useState(false);

  const [showSelectedAddress, setshowSelectedAddress] = useState("");
  const [addressId, setaddressId] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { totalProduct } = useSelector((state) => state.cart);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const price = totalProduct.reduce((acc, item) => {
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 1;
      return acc + itemPrice * itemQuantity;
    }, 0);

    setTotalPrice(price);
  }, [totalProduct]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllCartProductApi()).then((res) => {
        if (res?.payload?.status) {
          setItems(res?.payload?.cartItems);
        }
      });
    }
  }, [dispatch, isAuthenticated]);

  const handleAdd = (productId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    if (isAuthenticated) {
      dispatch(addToCartApi({ productId, quantity: 1 })).then(() =>
        dispatch(getAllCartProductApi())
      );
    } else {
      navigate("/login");
    }
  };

  const handleRemove = (productId) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    if (isAuthenticated) {
      dispatch(updateCartItemApi({ productId, quantity: -1 })).then(() =>
        dispatch(getAllCartProductApi())
      );
    } else {
      navigate("/login");
    }
  };
  const handleGetAddressId = (id) => {
    setaddressId(id);
  };

  useEffect(() => {
    if (addressId) {
      dispatch(getAddressByAddressIdApi(addressId)).then((data) => {
        const addressData = data?.payload;
        if (addressData) {
          setshowSelectedAddress(addressData?.address);
        }
      });
    }
  }, [addressId]);
  const handleOrderItems = () => {
    if (showSelectedAddress) {
      localStorage.setItem("address", JSON.stringify(showSelectedAddress));

      onClose();
      navigate("/orderpage");
    } else {
      setShowAddress(true);
    }
  };

  return (
    <div className="w-full sm:w-[450px] h-screen bg-white shadow-xl p-6 overflow-y-auto relative animate-slideIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        <X size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-6">🛒 My Cart</h2>

      {/* Delivery Info */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-green-100 to-green-50 border border-green-200 p-4 rounded-xl mb-6 shadow-sm">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white text-lg">
          ⏱
        </div>
        <div>
          <p className="font-semibold text-lg text-gray-800">
            Delivery in 8 minutes
          </p>
          <p className="text-sm text-gray-600">
            Shipment of {items.length} items
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="grid gap-5">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white border rounded-xl p-4 shadow-md"
          >
            <img
              src={item?.productId?.image[0]}
              alt={item?.productId?.name}
              className="w-20 h-20 object-contain border rounded-lg bg-gray-50"
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base font-semibold text-gray-800">
                {item?.productId?.name}
              </h3>
              <p className="text-sm text-gray-500">{item?.productId?.price}</p>
              <p className="text-base font-bold text-green-600 mt-1">
                ₹{item.price}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-full shadow-md">
              <button
                onClick={() => handleRemove(item.productId._id)}
                className="hover:bg-green-700 p-1 rounded"
              >
                <FiMinus size={16} />
              </button>
              <span className="px-1 font-medium">{item.quantity}</span>
              <button
                onClick={() => handleAdd(item.productId._id)}
                className="hover:bg-green-700 p-1 rounded"
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* change address */}
      {showSelectedAddress ? (
        <div className="flex gap-2 mt-4 relative">
          <div className="bg-gray-200 p-2 w-15 h-15 rounded-full flex items-center justify-center text-2xl">
            <RiHotelFill />
          </div>
          <div>
            <p className="font-semibold">{showSelectedAddress.name}</p>
            <p className="font-extralight text-sm">
              {showSelectedAddress.house_no},{" "}
              {showSelectedAddress.nearby && `${showSelectedAddress.nearby}, `}
              {showSelectedAddress.city}, {showSelectedAddress.state} -{" "}
              {showSelectedAddress.pincode}
            </p>
          </div>
          <button
            onClick={() => setShowAddress(true)}
            className="absolute right-0 text-blue-600 cursor-pointer"
          >
            Change
          </button>
        </div>
      ) : (
        <div className="mt-4 text-gray-500 italic">No address selected</div>
      )}

      {/* Desktop Checkout */}
      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold text-gray-800">₹{totalPrice}</p>
        </div>
        <button
          onClick={handleOrderItems}
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          {showSelectedAddress
            ? "Proceed to Checkout →"
            : " Please Select Your Address"}
        </button>
      </div>

      {/* Address overlay */}
      {showAddress && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white w-full h-screen   shadow-xl p-6 relative">
            <button
              onClick={() => setShowAddress(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              {" "}
              <div className="text-4xl">
                <IoIosArrowRoundBack />
              </div>
            </button>
            <AddressPage
              handleGetAddressId={handleGetAddressId}
              setShowAddress={setShowAddress}
            />
          </div>
        </div>
      )}
    </div>
  );
}
