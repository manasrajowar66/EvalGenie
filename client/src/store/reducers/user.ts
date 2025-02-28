// src/redux/slices/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideGlobalLoader, showGlobalLoader } from "./globalLoader";
// import { AppDispatch } from "../store";
import { RegisterFormData } from "../../pages/Register";
import axiosInstance, { CustomAxiosRequestConfig } from "../../utils/axiosInstance";
import { LoginFormData } from "../../pages/Login";

interface User {
  full_name: string;
  email: string;
  id: number;
}

interface UserState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export const registerUser = createAsyncThunk<void, RegisterFormData>(
  "user/registerUser",
  async (data, { dispatch }) => {
    dispatch(showGlobalLoader());
    try {
      const response = await axiosInstance.post("user/register", data);
      dispatch(hideGlobalLoader());
      return response.data;
    } catch (error) {
      dispatch(hideGlobalLoader());
      return Promise.reject(error);
    }
  }
);

export const loginUser = createAsyncThunk<void, LoginFormData>(
  "user/loginUser",
  async (data, { dispatch }) => {
    dispatch(showGlobalLoader());
    try {
      const response = await axiosInstance.post("user/login", data);
      dispatch(
        setUser({ user: response.data.user, token: response.data.token })
      );
      dispatch(hideGlobalLoader());
      return response.data;
    } catch (error) {
      dispatch(hideGlobalLoader());
      return Promise.reject(error);
    }
  }
);

export const authCheck = createAsyncThunk(
  "user/authCheck",
  async (_, { dispatch }) => {
    dispatch(showGlobalLoader());
    try {
      const response = await axiosInstance.get("user/auth-check", { showSuccessToast: false } as CustomAxiosRequestConfig);
      dispatch(
        setUser({ user: response.data.user })
      );
      dispatch(hideGlobalLoader());
      return response.data;
    } catch (error) {
      dispatch(logout());
      dispatch(hideGlobalLoader());
      return Promise.reject(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      }
      state.loading = false;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    authError: (state)=>{
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
    }
  },
});

// Export actions and the reducer
export const { setUser, logout, authError } = userSlice.actions;
export default userSlice.reducer;
