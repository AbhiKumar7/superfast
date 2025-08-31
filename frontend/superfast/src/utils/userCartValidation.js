export const updateLocalCart = (productId) => {
  let cartData = JSON.parse(localStorage.getItem("cart")) || {
    quantity: 0,
    totalProduct: [],
  };

  // Update global quantity
  cartData.quantity += 1;

  // Find product
  const productIndex = cartData.totalProduct.findIndex(
    (item) => item.id === productId
  );

  if (productIndex !== -1) {
    // increase item qty
    cartData.totalProduct[productIndex].quantity += 1;
  } else {
    // add new product
    cartData.totalProduct.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartData));
  return cartData;
};
export const decreaseLocalCart = (productId) => {
  let cartData = JSON.parse(localStorage.getItem("cart")) || {
    quantity: 0,
    totalProduct: [],
  };

  // Prevent negative
  if (cartData.quantity > 0) cartData.quantity -= 1;

  const productIndex = cartData.totalProduct.findIndex(
    (item) => item.id === productId
  );

  if (productIndex !== -1) {
    if (cartData.totalProduct[productIndex].quantity > 1) {
      cartData.totalProduct[productIndex].quantity -= 1;
    } else {
      // remove item completely
      cartData.totalProduct.splice(productIndex, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cartData));
  return cartData;
};