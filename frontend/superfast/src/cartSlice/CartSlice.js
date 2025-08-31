import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartApi,
  
  deleteItemFromCart,
  getAllCartProductApi,

  updateCartItemApi,
} from "../apiMiddleware/cartMiddleware";

const initialState = {
  isLoading: false,
  isError: false,
  quantity: 0,
  totalProduct: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCartFromLocalStorage: (state) => {
      const saved = JSON.parse(localStorage.getItem("cart")) || {
        quantity: 0,
        totalProduct: [],
      };
      state.quantity = saved.quantity;
      state.totalProduct = saved.totalProduct;
    },

    // Add or increase product locally (with price)
    updateLocalCart: (state, action) => {
      const { productId } = action.payload; // pass price here
      const index = state.totalProduct.findIndex(
        (item) => item.productId === productId
      );

      if (index !== -1) {
        state.totalProduct[index].quantity += 1;
      } else {
        state.totalProduct.push({ productId, quantity: 1 });
      }

      state.quantity += 1;

      localStorage.setItem(
        "cart",
        JSON.stringify({
          quantity: state.quantity,
          totalProduct: state.totalProduct,
        })
      );
    },

    // Decrease product quantity locally
    decreaseLocalCart: (state, action) => {
      const productId = action.payload;
      const index = state.totalProduct.findIndex(
        (item) => item.productId === productId
      );

      if (index !== -1) {
        if (state.totalProduct[index].quantity > 1) {
          state.totalProduct[index].quantity -= 1;
        } else {
          state.totalProduct.splice(index, 1);
        }
        state.quantity = Math.max(state.quantity - 1, 0);
      }

      localStorage.setItem(
        "cart",
        JSON.stringify({
          quantity: state.quantity,
          totalProduct: state.totalProduct,
        })
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCartApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartApi.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addToCartApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      
      // Get all cart items from API
      .addCase(getAllCartProductApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCartProductApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        const items = action.payload?.cartItems || [];
        if (items.length > 0) {
          state.totalProduct = items.map((i) => ({
            productId: i.productId._id || i.productId,
            quantity: i.quantity,
            price: i.productId.price || 0, // store price here
          }));
          state.quantity = items.reduce((acc, i) => acc + i.quantity, 0);
        }

        localStorage.setItem(
          "cart",
          JSON.stringify({
            quantity: state.quantity,
            totalProduct: state.totalProduct,
          })
        );
      })
      .addCase(getAllCartProductApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Delete item
      .addCase(deleteItemFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemFromCart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteItemFromCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Update cart item (increase/decrease)
      .addCase(updateCartItemApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartItemApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { loadCartFromLocalStorage, updateLocalCart, decreaseLocalCart } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
