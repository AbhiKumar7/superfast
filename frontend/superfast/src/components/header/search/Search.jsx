import React, { useEffect, useState, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const [isInputField, setIsInputField] = useState(false);

  useEffect(() => {
    const onSearchPage = location.pathname === "/search";
    setIsInputField(onSearchPage);

   
    if (onSearchPage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300  bg-white shadow-sm w-full max-w-md cursor-pointer"
      onClick={!isInputField ? redirectToSearchPage : undefined}
    >
      <CiSearch className="text-2xl text-gray-500" />

      {!isInputField ? (
        <TypeAnimation
          sequence={[
            "We produce food for Mice",
            1000,
            "We produce food for Hamsters",
            1000,
            "We produce food for Guinea Pigs",
            1000,
            "We produce food for Chinchillas",
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-sm text-gray-400"
        />
      ) : (
        <input
          type="text"
          ref={inputRef}
          placeholder="Search products..."
          className="w-full outline-none bg-transparent text-sm text-gray-800"
        />
      )}
    </div>
  );
}

export default Search;
