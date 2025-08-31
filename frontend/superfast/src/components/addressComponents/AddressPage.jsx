import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiHotelFill } from "react-icons/ri";
import AddressFields from "./AddressFields";
import { useDispatch } from "react-redux";
import {
  deleteAddressApi,
  getAllAddressApi,
} from "../../apiMiddleware/addressMiddleware";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
function AddressPage({ handleGetAddressId, setShowAddress }) {
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [isEdit, setisEdit] = useState(false);
  const [showAllAddress, setshowAllAddress] = useState([]);
  const dispatch = useDispatch();

  const toggleShowAddressFields = () => {
    setShowAddressFields((prev) => !prev);
  };
  useEffect(() => {
    dispatch(getAllAddressApi()).then((data) => {
      const addressData = data?.payload;
      if (addressData) {
        setshowAllAddress(addressData?.address);
      }
    });
  }, [toggleShowAddressFields]);

  const getbackTocart = (id) => {
    if (id) {
      handleGetAddressId(id);
      setShowAddress(false);
    }
  };

  const handleDeleteAddress = (id) => {
    dispatch(deleteAddressApi(id));
  };

  const handleEdit = (address) => {
    setisEdit(true);
    setEditAddress(address);
    setShowAddressFields(true);
  };


  return (
    <div>
      <p className="font-medium">Select delivery address</p>

      {/* Add new address button */}
      <div
        onClick={toggleShowAddressFields}
        className="bg-gray-200 mt-4 flex items-center p-3 rounded gap-4 text-green-800 font-bold cursor-pointer"
      >
        <FaPlus />
        <span>Add a new address</span>
      </div>

      {/* Address List */}
      <ul className="flex flex-col gap-4 mt-4">
        {showAllAddress.map((add) => (
          <li
            key={add._id}
            className="flex justify-between items-center gap-3 bg-white border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div
              onClick={() => getbackTocart(add._id)}
              className="flex gap-3 items-start"
            >
              <div className="bg-gray-200 p-2 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                <RiHotelFill />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{add.name}</p>
                <p className="text-sm text-gray-600 leading-snug">
                  {add.house_no}, {add.nearby && `${add.nearby}, `}
                  {add.city}, {add.state} - {add.pincode}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 text-gray-500">
              <button
                onClick={() => handleEdit(add)}
                className="hover:text-blue-600"
              >
                <MdModeEditOutline size={20} />
              </button>
              <button
                onClick={() => handleDeleteAddress(add._id)}
                className="hover:text-red-600"
              >
                <MdOutlineDeleteOutline size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Centered AddressFields Modal */}
      {showAddressFields && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white  w-[100%] h-[100%] shadow-lg relative">
            {/* Close button */}
            <button
              onClick={() => {
                toggleShowAddressFields();
                setisEdit(false);
              }}
              className="absolute top-3 right-3  text-gray-600 hover:text-gray-900 font-bold text-2xl"
            >
              ✕
            </button>
            <AddressFields
              toggleShowAddressFields={toggleShowAddressFields}
              isEdit={isEdit}
              editAddress={editAddress}
              setisEdit={setisEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressPage;
