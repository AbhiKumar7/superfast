import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddressApi,
  updateAddressApi,
} from "../../apiMiddleware/addressMiddleware";
const AddressFields = ({
  toggleShowAddressFields,
  isEdit,
  editAddress,
  setisEdit,
}) => {
  const [houseNo, sethouseNo] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [nearby, setnearby] = useState("");
  const [yourName, setyourName] = useState("");
  const [fieldError, setfieldError] = useState([]);
  const [pincode, setpincode] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      sethouseNo(editAddress.house_no);
      setcity(editAddress.city);
      setnearby(editAddress.nearby);
      setpincode(editAddress.pincode);
      setstate(editAddress.state);
      setyourName(editAddress.name);
    }
  }, [isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const addressData = {
      house_no: houseNo,
      city,
      state,
      nearby,
      pincode,
      name: yourName,
    };
    if (
      !addressData.house_no ||
      !addressData.city ||
      !addressData.state ||
      !addressData.nearby ||
      !addressData.pincode ||
      !addressData.name
    ) {
      let missingFields = [];
      if (!addressData.house_no) missingFields.push("House number is required");
      if (!addressData.city) missingFields.push("City is required");
      if (!addressData.state) missingFields.push("State is required");
      if (!addressData.nearby) missingFields.push("Nearby is required");
      if (!addressData.pincode) missingFields.push("Pincode is required");
      if (!addressData.name) missingFields.push("Name is required");
      setfieldError(missingFields);
      return;
    }

    if (isEdit) {
      dispatch(
        updateAddressApi({ addressId: editAddress._id, addressData })
      ).then((data) => {
        toggleShowAddressFields();
        setisEdit(false);
      });
    } else {
      dispatch(addNewAddressApi(addressData)).then((data) => {
        const addressData = data?.payload;
        if (addressData?.status) {
          toggleShowAddressFields();
        } else {
        }
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-4">
          <h1 className="text-xl font-bold">Add New Address</h1>
        </div>

        {/* Form Fields */}
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            {/* Building Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flat / House no / Building name *
              </label>
              <input
                type="text"
                value={houseNo}
                onChange={(e) => sethouseNo(e.target.value)}
                className={`w-full ${
                  fieldError.some((err) =>
                    err.toLowerCase().startsWith("house")
                  )
                    ? "border-red-800 border-2 "
                    : ""
                } p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter building name or number"
              />
            </div>
            {/* Floor */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setstate(e.target.value)}
                className={`w-full ${
                  fieldError.some((err) =>
                    err.toLowerCase().startsWith("state")
                  )
                    ? "border-red-800 border-2 "
                    : ""
                } p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter floor number"
              />
            </div>

            {/* Area */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                className={`w-full ${
                  fieldError.some((err) => err.toLowerCase().startsWith("city"))
                    ? "border-red-800 border-2 "
                    : ""
                } p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="Number"
                value={pincode}
                onChange={(e) => setpincode(e.target.value)}
                className={`w-full ${
                  fieldError.some((err) =>
                    err.toLowerCase().startsWith("pincode")
                  )
                    ? "border-red-800 border-2 "
                    : ""
                } p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>

            {/* Landmark */}
            <div className="mb-4 ">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nearby landmark (optional)
              </label>
              <input
                type="text"
                value={nearby}
                onChange={(e) => setnearby(e.target.value)}
                className={`w-full ${
                  fieldError.some((err) =>
                    err.toLowerCase().startsWith("nearby")
                  )
                    ? "border-red-800 border-2 "
                    : ""
                } p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter a nearby landmark"
              />
            </div>

            {/* Divider */}
            <div className="my-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Enter your details for seamless delivery experience
              </h2>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your name *
              </label>
              <input
                type="text"
                value={yourName}
                onChange={(e) => setyourName(e.target.value)}
                className={`w-full ${
                  fieldError.some((err) => err.toLowerCase().startsWith("name"))
                    ? "border-red-800 border-2 "
                    : ""
                } p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressFields;
