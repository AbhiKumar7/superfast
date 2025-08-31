import React from "react";

function CategorySideBar({ selectedCategory ,handleShowSelectedSubCategoryProducts}) {
  return (
    <aside className="w-full md:w-50 bg-white shadow p-4 no-scrollbar scroll-smooth  rounded-md overflow-y-auto max-h-[80vh]">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">
        Subcategories
      </h2>

      {selectedCategory.length === 0 ? (
        <p className="text-gray-500">No subcategories available.</p>
      ) : (
        <ul className="space-y-2">
          {selectedCategory.map((sub) => (
            <li
              key={sub._id}
              onClick={() =>handleShowSelectedSubCategoryProducts(sub.name)}
              className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer "
            >
              <img className="w-10 h-10 object-cover" src={sub.image} alt="" />
              {sub.name}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default CategorySideBar;
