// src/redux/slices/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITag } from "../../types/common-types";
import { hideGlobalLoader, showGlobalLoader } from "./globalLoader";
import axiosInstance, {
  CustomAxiosRequestConfig,
} from "../../utils/axiosInstance";

type TagState = {
  loading: boolean;
  tags: ITag[];
};

const initialState: TagState = {
  loading: false,
  tags: [],
};

export const getTags = createAsyncThunk<void>(
  "tag/getTags",
  async (_, { dispatch }) => {
    try {
      dispatch(showGlobalLoader());

      const response = await axiosInstance.get(`tags`, {
        showSuccessToast: false,
      } as CustomAxiosRequestConfig);
      dispatch(setTags(response.data));
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      dispatch(hideGlobalLoader());
    }
  }
);

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload.data;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTags.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getTags.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export actions and the reducer
export const { setTags } = tagSlice.actions;
export default tagSlice.reducer;
