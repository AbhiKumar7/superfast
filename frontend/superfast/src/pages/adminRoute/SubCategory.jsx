import React, { useState, useEffect } from "react";
import AddSubcategory from "../../components/subcategory/AddSubcategory";
import { useDispatch, useSelector } from "react-redux";
import DisplaySubcategory from "../../components/subcategory/DisplaySubcategory";
import { getAllSubCategoryApi } from "../../apiMiddleware/subcategoryMiddleware";
import { getAllCategoryApi } from "../../apiMiddleware/categoryMiddleware";
function SubCategory() {
  const [isShowAddSubcategory, setisShowAddSubcategory] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [subCategoryId, setsubCategoryId] = useState("");
  const [subcategoryResults, setsubcategoryResults] = useState([]);
  const [IsSubEdit, setIsSubEdit] = useState(false);
  const dispatch = useDispatch();

  const handleToggleShowAddSubcategory = () => {
    setisShowAddSubcategory((prev) => !prev);
  };

  const handleSubCategoryEdit = (id) => {
    setsubCategoryId(id);
    handleToggleShowAddSubcategory();
    setIsSubEdit(true);
  };
  const fetchSubcatgoryData = () => {
    dispatch(getAllSubCategoryApi()).then((data) => {
      const subcategoryData = data.payload;
      if (subcategoryData?.status) {
        setsubcategoryResults([...subcategoryData.subCategory].reverse());
      }
    });
  };
  useEffect(() => {
    fetchSubcatgoryData();
  }, []);

  const fetchData = () => {
    dispatch(getAllCategoryApi()).then((data) => {
      const categoryResult = data?.payload?.category;
      if (data?.payload?.status) {
        setcategoryData(categoryResult);
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* AddSubcategory modal */}
      {isShowAddSubcategory && (
        <div className="fixed top-20 inset-0 z-50  flex justify-center items-center p-4">
          <AddSubcategory
            handleToggleShowAddSubcategory={handleToggleShowAddSubcategory}
            categoryData={categoryData}
            fetchSubcatgoryData={fetchSubcatgoryData}
            subCategoryId={subCategoryId}
            IsSubEdit={IsSubEdit}
            setIsSubEdit={setIsSubEdit}
          />
        </div>
      )}

      {/* Display Subcategories */}
      <div className="mt-8 px-4">
        <DisplaySubcategory
          handleToggleShowAddSubcategory={handleToggleShowAddSubcategory}
          subcategoryResults={subcategoryResults}
          fetchSubcatgoryData={fetchSubcatgoryData}
          handleSubCategoryEdit={handleSubCategoryEdit}
        />
      </div>
    </>
  );
}

export default SubCategory;
