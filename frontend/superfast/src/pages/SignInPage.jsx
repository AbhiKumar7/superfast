import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { registerUserApi } from "../apiMiddleware/AuthMiddleware";
import Role from "../components/roleSelect/Role";

function SignInPage() {
  const [role, setRole] = useState("");

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
    dispatch(registerUserApi({ mobile: mobileNumber, role })).then((data) => {
      if (data.payload?.status) {
        navigate("/verifyotp");
      } else {
        const messageError = data?.payload?.message;
        seterror(messageError);
      }
    });
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-2">
          SuperFast
        </h1>
        <p className="text-center text-gray-600 mb-6">Sign in </p>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setmobileNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <Role setRole={setRole} role={role} />
        <div>
          <button
            onClick={() => handleSubmit()}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition mt-3"
          >
            Continue
          </button>
        </div>
        <div
          onClick={() => navigate("/login")}
          className="text-center mt-4 text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition duration-200"
        >
          login
        </div>
        {error && <p className="text-center text-red-700 mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default SignInPage;
