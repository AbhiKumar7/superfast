import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apiMiddleware/AuthMiddleware";
function LoginPage() {
  const [mobileNumber, setmobileNumber] = useState("");
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!mobileNumber) {
      seterror("Please enter mobile number");
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      seterror("Mobile number must be exactly 10 digits");
      return;
    }
    seterror("");
    dispatch(loginApi(mobileNumber)).then((data) => {
      if (data.payload?.status) {
        navigate("/verifyotp");
      }
    });
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-2">
          SuperFast
        </h1>
        <p className="text-center text-gray-600 mb-6"> Login</p>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setmobileNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        <div>
          <button
            onClick={() => handleSubmit()}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Continue
          </button>
        </div>
        <div onClick={() => navigate("/register")} className="text-center mt-4 text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition duration-200">
          Register as new user
        </div>

        {error && <p className="text-center text-red-700 mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
