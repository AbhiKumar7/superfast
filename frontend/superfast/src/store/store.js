import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../authSlice/authSlice'
import { categorySlice } from '../categorySlice/categorySlice'
import { subCategory } from '../subcategorySlice/Subcategory'
import { productreducer } from '../productSlice/productSlice'
import { cartReducer } from '../cartSlice/CartSlice'
import { addressReducer } from '../addressSlice/addressSlice'
import { orderReducer } from '../orderSlice/orderSlice'
export const store = configureStore({
    reducer:{
        auth:authSlice,
        category:categorySlice,
        subcategory:subCategory,
        product:productreducer,
        cart:cartReducer,
        address:addressReducer,
        order:orderReducer
    }
})