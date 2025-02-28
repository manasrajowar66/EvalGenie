import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideGlobalLoader, showGlobalLoader } from "./globalLoader";
import axiosInstance, {
  CustomAxiosRequestConfig,
} from "../../utils/axiosInstance";
import {
  IPagination,
  ICodingQuestion,
  ICodingQuestionFormData,
} from "../../types/common-types";
import { RootState } from "../store";

interface CodingQuestionState {
  loading: boolean;
  codingQuestions: ICodingQuestion[];
  pagination: IPagination | null;
}

const initialState: CodingQuestionState = {
  loading: false,
  codingQuestions: [],
  pagination: null,
};

export const getCodingQuestions = createAsyncThunk<void>(
  "codingQuestion/getCodingQuestions",
  async (_, { dispatch, getState }) => {
    try {
      dispatch(showGlobalLoader());
      let query = "";
      const { pagination } = (getState() as RootState).codingQuestion;

      if (pagination) {
        query += `page=${pagination.page}&limit=${pagination.limit}`;
      }
      const response = await axiosInstance.get(`coding-questions?${query}`, {
        showSuccessToast: false,
      } as CustomAxiosRequestConfig);
      dispatch(setCodingQuestions(response.data));
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      dispatch(hideGlobalLoader());
    }
  }
);

export const addCodingQuestion = createAsyncThunk<
  void,
  ICodingQuestionFormData
>("codingQuestion/addCodingQuestion", async (body, { dispatch }) => {
  try {
    dispatch(showGlobalLoader());
    const response = await axiosInstance.post(`coding-questions`, body);
    // dispatch(setCodingQuestions(response.data));
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    dispatch(hideGlobalLoader());
  }
});

export const editCodingQuestion = createAsyncThunk<
  void,
  {
    id: string;
    data: ICodingQuestionFormData;
  }
>("codingQuestion/editCodingQuestion", async (body, { dispatch }) => {
  try {
    dispatch(showGlobalLoader());
    const response = await axiosInstance.put(
      `coding-questions/${body.id}`,
      body.data
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    dispatch(hideGlobalLoader());
  }
});

export const getCodingQuestion = createAsyncThunk<
  void,
  {
    id: string;
  }
>("codingQuestion/getCodingQuestion", async (body, { dispatch }) => {
  try {
    dispatch(showGlobalLoader());
    const response = await axiosInstance.get(`coding-questions/${body.id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    dispatch(hideGlobalLoader());
  }
});

export const getCodingQuestionById = createAsyncThunk<
  void,
  {
    id: string;
  }
>("codingQuestion/getCodingQuestionById", async (body, { dispatch }) => {
  try {
    dispatch(showGlobalLoader());
    const response = await axiosInstance.get(`coding-questions/${body.id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    dispatch(hideGlobalLoader());
  }
});

export const addCodingQuestionTag = createAsyncThunk<
  void,
  {
    questionId: string;
    data:{
      tags: string[];
    }
  }
>("codingQuestion/addCodingQuestionTag", async (body, { dispatch }) => {
  try {
    dispatch(showGlobalLoader());
    const response = await axiosInstance.post(`coding-question-tag/${body.questionId}`, body.data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    dispatch(hideGlobalLoader());
  }
});

export const deleteCodingQuestionTag = createAsyncThunk<
  void,
  {
    id: string
  }
>("codingQuestion/deleteCodingQuestionTag", async (body, { dispatch }) => {
  try {
    dispatch(showGlobalLoader());
    const response = await axiosInstance.delete(`coding-question-tag/${body.id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    dispatch(hideGlobalLoader());
  }
});

const codingQuestionSlice = createSlice({
  name: "codingQuestion",
  initialState,
  reducers: {
    setCodingQuestions: (state, action) => {
      state.codingQuestions = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    setCodingQuestionPagination: (state, action) => {
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCodingQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCodingQuestions.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getCodingQuestions.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export actions and the reducer
export const { setCodingQuestions, setCodingQuestionPagination } =
  codingQuestionSlice.actions;
export default codingQuestionSlice.reducer;
