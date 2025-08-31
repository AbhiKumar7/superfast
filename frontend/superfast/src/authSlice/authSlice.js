import { createSlice } from "@reduxjs/toolkit";
import {
  loginApi,
  logoutAPi,
  registerUserApi,
  verifyOtpApi,
} from "../apiMiddleware/AuthMiddleware";

const initialState = {
  mobile: null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  otp: null,
  isLoading: false,
  refreshToken: null,
  role: JSON.parse(localStorage.getItem("role")),
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserApi.pending, (state) => {
        (state.isAuthenticated = false), (state.isLoading = true);
      })
      .addCase(registerUserApi.fulfilled, (state, action) => {
        (state.isAuthenticated = true),
          (state.isLoading = false),
          (state.otp = action.payload.otp),
          (state.role = action.payload.role);
      })
      .addCase(registerUserApi.rejected, (state) => {
        (state.isAuthenticated = false),
          (state.isLoading = true),
          (state.refreshToken = null),
          (state.role = null);
      })
      .addCase(verifyOtpApi.pending, (state) => {
        (state.isAuthenticated = false), (state.isLoading = true);
      })
      .addCase(verifyOtpApi.fulfilled, (state, action) => {
        (state.isAuthenticated = true),
          (state.isLoading = false),
          (state.otp = action.payload.otp),
          (state.role = action.payload.user?.role);
        state.refreshToken = action.payload.refresh_token;

        const mobile = action.payload.user?.mobile;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", JSON.stringify(action.payload.user?.role));
      })
      .addCase(verifyOtpApi.rejected, (state) => {
        (state.isAuthenticated = false), (state.isLoading = true);
      })
      .addCase(loginApi.pending, (state) => {
        (state.isAuthenticated = false),
          (state.isLoading = true),
          (state.otp = null);
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        (state.isAuthenticated = true),
          (state.isLoading = false),
          (state.otp = action.payload.otp),
          (state.role = action.payload.role);
     
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", JSON.stringify(action.payload.user?.role));
      })
      .addCase(loginApi.rejected, (state) => {
        (state.isAuthenticated = false),
          (state.isLoading = true),
          (state.otp = null);
      })
      .addCase(logoutAPi.pending, (state) => {
        (state.isAuthenticated = false),
          (state.isLoading = true),
          (state.otp = null);
      })
      .addCase(logoutAPi.fulfilled, (state) => {
        (state.isAuthenticated = false), (state.isLoading = false);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("role");
        localStorage.removeItem("cart");
        localStorage.removeItem("address");
        
      })
      .addCase(logoutAPi.rejected, (state) => {
        (state.isAuthenticated = false),
          (state.isLoading = true),
          (state.otp = null);
      });
  },
});

export const authSlice = authSlicer.reducer;
