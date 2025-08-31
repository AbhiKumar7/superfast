import React, { useState, useEffect } from "react";
import AddProduct from "../../components/adminProducts/AddProduct";
import DisplayProduct from "../../components/adminProducts/DisplayProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductApi } from "../../apiMiddleware/productMiddleware";

function Product() {
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productInput, setproductInput] = useState("");
  const [isEditProduct, setisEditProduct] = useState(false);
  const [productData, setproductData] = useState([]);
  const [productId, setproductId] = useState("");

  const handleAddProductForm = () => {
    setIsProductFormOpen((prev) => !prev);
  };
  const dispatch = useDispatch();
  const fetchAllProduct = () => {
    dispatch(getAllProductApi(productInput)).then((data) => {
      

      const productResult = data?.payload?.product;
      if (data?.payload?.status) {
        setproductData([...productResult].reverse());
      }
    });
  };
  useEffect(() => {
    const timer = setTimeout(fetchAllProduct, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [productInput]);

  return (
    <div className="min-h-screen bg-[#f9fbf9]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#ebf2e9] px-10 py-3">
        <div className="flex items-center gap-4 text-[#121a0f]"></div>

        <div className="flex items-center gap-4">
          <div className="flex bg-[#ebf2e9] items-center rounded-lg px-2 h-10">
            <svg
              className="text-[#639155]"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11..." />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={productInput}
              onChange={(e) => setproductInput(e.target.value)}
              className="bg-[#ebf2e9] text-[#121a0f] placeholder-[#639155] px-2 outline-none w-40"
            />
          </div>

          <button
            onClick={handleAddProductForm}
            className="bg-[#53d22c] text-[#121a0f] px-4 py-2 rounded-lg font-bold text-sm cursor-pointer"
          >
            {isProductFormOpen ? "Back to Products" : "Add Product"}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 sm:px-8 lg:px-12 py-6 max-w-7xl mx-auto ">
        {isProductFormOpen ? (
          <AddProduct
            fetchAllProduct={fetchAllProduct}
            productId={productId}
            isEditProduct={isEditProduct}
            handleAddProductForm={handleAddProductForm}
          setisEditProduct ={setisEditProduct}
          />
        ) : (
          <DisplayProduct
            setproductInput={setproductInput}
            productInput={productInput}
            fetchAllProduct={fetchAllProduct}
            productData={productData}
            handleAddProductForm={handleAddProductForm}
            setisEditProduct={setisEditProduct}
            setproductId={setproductId}
          />
        )}
      </main>
    </div>
  );
}

export default Product;
