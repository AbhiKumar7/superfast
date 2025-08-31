import React, { useState, useEffect } from "react";

function DisplayProductDetails({ productdetail }) {
  const [selectImage, setselectImage] = useState(
    productdetail?.image?.[0] || null
  );

  useEffect(() => {
    if (productdetail?.image?.length > 0) {
      setselectImage(productdetail.image[0]);
    }
  }, [productdetail]);

  if (!productdetail) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <div>
        <img
          className="w-96 h-96 object-contain"
          src={selectImage}
          alt="Selected Product"
        />
      </div>

      <div className="flex gap-5 mt-4">
        {(productdetail.image ?? []).map((img, index) => (
          <div
            className={`border rounded-xl p-1 cursor-pointer ${
              selectImage === img ? "border-blue-500" : "border-gray-300"
            }`}
            key={index}
            onClick={() => setselectImage(img)}
          >
            <img className="w-20 h-20 object-contain" src={img} />
          </div>
        ))}
      </div>
      <h4 className="font-medium text-xl mt-5">Product Details</h4>
      <p>{productdetail.description}</p>
    </div>
  );
}

export default DisplayProductDetails;
