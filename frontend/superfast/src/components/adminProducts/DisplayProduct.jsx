import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductApi } from "../../apiMiddleware/productMiddleware";
function DisplayProduct({ productData, fetchAllProduct,handleAddProductForm ,setisEditProduct,setproductId}) {
  const [imageIndexes, setImageIndexes] = useState({});
  const dispatch = useDispatch();
  const handleImageDotClick = (productId, index) => {
    setImageIndexes((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };

  const deleteProduct = (id) => {
    dispatch(deleteProductApi(id)).then((data) => {
      if (data?.payload?.status) {
        fetchAllProduct();
      }
    });
  };

  
  return (
    <div className="min-h-screen bg-[#f9fbf9] font-[Manrope,Noto Sans,sans-serif]">
      <main className="px-10 py-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#121a0f]">Products</h1>
          <p className="text-sm text-[#639155]">Manage your product catalog</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4">
          {productData.length === 0
            ? "No product found"
            : productData.map((product) => {
                const activeIndex = imageIndexes[product._id] || 0;

                return (
                  <div
                    key={product._id}
                    className="flex flex-col gap-2 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <div className="relative">
                      <img
                        src={product.image[activeIndex]}
                        alt={product.name}
                        className="w-full aspect-square object-cover rounded-md"
                      />

                      {/* Dots centered at bottom */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {product.image.map((_, idx) => (
                          <span
                            key={idx}
                            onClick={() =>
                              handleImageDotClick(product._id, idx)
                            }
                            className={`h-2 w-2 rounded-full cursor-pointer ${
                              idx === activeIndex
                                ? "bg-gray-900"
                                : "bg-gray-400"
                            }`}
                          ></span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className=" text-sm text-[#121a0f]">
                        {product.name}
                      </p>
                      <p className="text-sm text-[#639155]">{product.price}</p>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button onClick={() =>{
                        handleAddProductForm();
                        setisEditProduct(true);
                        setproductId(product._id)
                      }} className="flex-1 px-2 py-1 text-sm text-white bg-[#4caf50] rounded hover:bg-[#43a047] transition">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="flex-1 px-2 py-1 text-sm text-white bg-[#f44336] rounded hover:bg-[#e53935] transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </main>
    </div>
  );
}

export default DisplayProduct;
