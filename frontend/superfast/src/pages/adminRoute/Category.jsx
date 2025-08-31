import React, { useState, useEffect } from "react";
import AddCategory from "../../components/addcategory/AddCategory";
import DisplayCategory from "../../components/displayCategory/DisplayCategory";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryApi } from "../../apiMiddleware/categoryMiddleware";

function Category() {
  const [isPopUp, setisPopUp] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [categoryData, setcategoryData] = useState([]);
  const [IsEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const handleEditCategory = (id) => {
    setcategoryId(id);
    handleTogglePopUp();
    setIsEdit(true);
  };
  const fetchData = () => {
    dispatch(getAllCategoryApi(inputValue)).then((data) => {
      if (data.payload?.status) {
        const categories = data.payload.category;
        setcategoryData([...categories].reverse());
      }
    });
  };
  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);
  const handleTogglePopUp = () => {
    setisPopUp((prev) => !prev);
  };

  return (
    <>
      <div>
        <div className="flex justify-between shadow-md p-2 items-center relative">
          <p>Category</p>
          <button
            onClick={handleTogglePopUp}
            className="rounded text-white px-2 py-1 bg-blue-500 hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>

        {isPopUp && (
          <div className="fixed inset-0 flex justify-center items-center z-50 px-4 pointer-events-none">
            <div className="pointer-events-auto">
              <AddCategory
                handleTogglePopUp={handleTogglePopUp}
                fetchData={fetchData}
                setIsEdit={setIsEdit}
                IsEdit={IsEdit}
                categoryId={categoryId}
              />
            </div>
          </div>
        )}
        <div className="">
          <DisplayCategory
            categoryData={categoryData}
            fetchData={fetchData}
            setinputValue={setinputValue}
            inputValue={inputValue}
            setIsEdit={setIsEdit}
            IsEdit={IsEdit}
            handleTogglePopUp={handleTogglePopUp}
            handleEditCategory={handleEditCategory}
          />
        </div>
      </div>
    </>
  );
}

export default Category;
