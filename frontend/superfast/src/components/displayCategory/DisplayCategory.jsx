import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { deleteCategoryApi } from "../../apiMiddleware/categoryMiddleware";
const PAGE_SIZE = 10;
function DisplayCategory({
  categoryData,
  fetchData,
  setinputValue,
  inputValue,
  setIsEdit,
  IsEdit,

  handleEditCategory,
}) {
  const [currentPage, setcurrentPage] = useState(0);
  const totalCategory = categoryData.length;
  const noOfPages = Math.ceil(totalCategory / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const dispatch = useDispatch();

  const handleNext = (k) => {
    setcurrentPage(k);
  };
  const handleDelete = (id) => {
    dispatch(deleteCategoryApi(id)).then((data) => {
      fetchData();
    });
  };
  const nextPage = () => {
    setcurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setcurrentPage((prev) => prev - 1);
  };
  return (
    <>
      <div className="p-4">
        <div className="relative w-full sm:w-1/2 mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
            placeholder="Search category..."
            className="w-full border border-gray-300 rounded-full px-5 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer">
            <CiSearch />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {categoryData.slice(start, end).map((cate) => (
          <div
            key={cate._id}
            className="p-3 w-full h-auto rounded-lg mx-auto bg-white shadow hover:shadow-lg transition"
          >
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 rounded w-full h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover rounded"
                  src={cate.image}
                  alt={cate.name}
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-base font-medium text-gray-800">
                  {cate.name}
                </p>
              </div>
            </div>
            <div className="flex justify-between gap-3 mt-4">
              <button
                onClick={() =>handleEditCategory(cate._id)}
                className="flex-1 bg-yellow-400 px-2 py-1 text-sm rounded hover:bg-yellow-300 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cate._id)}
                className="flex-1 bg-green-500 px-2 py-1 text-sm text-white rounded hover:bg-green-600 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    <div className="flex justify-center items-center gap-2 mt-6 text-base sm:text-lg">
  {/* Prev Button */}
  <button
    onClick={prevPage}
    disabled={currentPage === 0}
    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Prev
  </button>

  {/* Page Numbers */}
  <div className="flex gap-2">
    {[...Array(noOfPages).keys()].map((k) => (
      <button
        key={k}
        onClick={() => handleNext(k)}
        className={`w-10 h-10 flex items-center justify-center rounded-md transition font-semibold ${
          currentPage === k
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
        }`}
      >
        {k + 1}
      </button>
    ))}
  </div>

  {/* Next Button */}
  <button
    onClick={nextPage}
    disabled={currentPage === noOfPages - 1}
    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Next
  </button>
</div>

    </>
  );
}

export default DisplayCategory;
