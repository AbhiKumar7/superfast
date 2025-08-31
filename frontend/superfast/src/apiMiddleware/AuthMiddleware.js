import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUserApi = createAsyncThunk(
  "auth/registerUserApi",
  async ({mobile,role}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "userapi/registeruser",
        { mobile,role },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyOtpApi = createAsyncThunk(
  "auth/verifyOtpApi",
  async (otp, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "userapi/verifyotp",
        { otp },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginApi = createAsyncThunk(
  "auth/loginApi",
  async (mobile, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "userapi/login",
        { mobile },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const logoutAPi = createAsyncThunk(
  "auth/logoutAPi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/userapi/logout",
            
        {
          withCredentials: true,
        }
      );
     
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
