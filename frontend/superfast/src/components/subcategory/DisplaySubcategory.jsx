import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSubCategoryApi } from "../../apiMiddleware/subcategoryMiddleware";

function DisplaySubcategory({
  handleToggleShowAddSubcategory,
  subcategoryResults,
  fetchSubcatgoryData,
  handleSubCategoryEdit,
}) {
  const dispatch = useDispatch();
  const handleDeleteSubCategory = (subcategoryId) => {
    dispatch(deleteSubCategoryApi(subcategoryId)).then((data) => {
      if (data?.payload?.status) {
        fetchSubcatgoryData();
      }
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Subcategories
          </h1>
          <button
            onClick={handleToggleShowAddSubcategory}
            className="bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Create subcategory
          </button>
        </div>

        {/* Table view for md+ */}
        <div className="hidden md:block">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Preview</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subcategoryResults.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4 text-blue-500 hover:underline cursor-pointer">
                      {item.category.map((cate) => (
                        <div key={cate._id}>
                          <p> {cate.name}</p>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={item.image}
                        alt="preview"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => handleSubCategoryEdit(item._id)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleDeleteSubCategory(item._id)}
                        className="text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card view for mobile */}
        <div className="md:hidden space-y-4">
          {subcategoryResults.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={item.image}
                  alt="preview"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <div className="text-blue-500 text-sm">
                    {item.category.map((cate) => (
                      <p key={cate._id}>{cate.name}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end text-sm space-x-4 ">
                <button
                  onClick={() => handleSubCategoryEdit(item._id)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSubCategory(item._id)}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplaySubcategory;
