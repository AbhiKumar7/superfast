import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtpApi } from "../apiMiddleware/AuthMiddleware";
import { useDispatch, useSelector } from "react-redux";
import OtpTimerText from "../utils/Timer";

function VerifyOtp() {
  const [showOtp, setshowOtp] = useState(true);
  const [error, seterror] = useState("");
  const { otp, isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const OTP_DIGIT_COUNT = 6;
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGIT_COUNT).fill(""));
  const refArr = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setshowOtp(false);
    }, 5 * 60 * 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleInputChange = (value, index) => {
    if (isNaN(value)) return;
    const newArr = [...inputArr];
    newArr[index] = value.trim().slice(-1);
    setInputArr(newArr);
    value && refArr.current[index + 1]?.focus();
  };

  const handleRemoveInput = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpString = inputArr.join("");
    dispatch(verifyOtpApi(otpString)).then((data) => {
      const { payload } = data;
      const role = payload?.user?.role;
      const status = payload?.status;
      if (status && role === "ADMIN") {
        navigate("/admin/category");
      } else if (status) {
        navigate("/");
      } else {
        const errorMessage = payload?.message || "Invalid OTP";
        seterror(errorMessage);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 py-6 relative">
      {/* OTP Banner */}
      {showOtp && (
        <div className="absolute top-4 right-4 w-full max-w-xs sm:max-w-sm bg-green-400 py-2 px-3 rounded-lg text-center text-sm sm:text-base shadow-md z-50">
          <p>Your one time password is {String(otp?.otp || otp)}</p>
        </div>
      )}

      {/* Instructions */}
      <p className="text-lg font-semibold mb-6 text-center">
        We have sent a verification code to your mobile number
      </p>

      {/* OTP Input Fields */}
      <div className="flex gap-3 justify-center mb-4">
        {inputArr.map((input, index) => (
          <input
            key={index}
            value={inputArr[index]}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyDown={(e) => handleRemoveInput(e, index)}
            type="text"
            ref={(input) => (refArr.current[index] = input)}
            className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleVerifyOtp}
        className="mt-4 w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
      >
        Verify OTP
      </button>

      {/* Timer and Resend */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 w-full sm:w-auto">
        <OtpTimerText />
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
        >
          Resend Again
        </button>
      </div>
      {error && <p className="text-red-500 mt-3 text-xl">{error}</p>}
    </div>
  );
}

export default VerifyOtp;
