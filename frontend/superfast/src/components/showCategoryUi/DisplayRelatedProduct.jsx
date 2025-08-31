import React from "react";
import CustomAddToCart from "../customAddToCart/CustomAddToCart";

function DisplayRelatedProduct({ selectedSubcategoryProducts }) {
  return (
    <div className="p-4 overflow-y-auto max-h-[80vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
        {selectedSubcategoryProducts.length === 0 ? <div>No Product</div> :selectedSubcategoryProducts?.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-sm p-4 flex flex-col items-center hover:shadow-md transition"
          >
            <img
              src={product.image[0]}
              alt={product.name}
             className="h-24 md:h-32 object-contain mb-4"
            />

            <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
              <span>🕒</span> 8 MINS
            </p>

            <h3 className="text-md text-center">{product.name}</h3>
        

            <div className="flex items-center gap-2 mt-2">
              <p className="text-lg font-bold">₹{product.price}</p>
              {product.discount > 0 && (
                <p className="text-sm line-through text-gray-400">₹{product.price + product.discount}</p>
              )}
            </div>

             <CustomAddToCart productId={product._id}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayRelatedProduct;
