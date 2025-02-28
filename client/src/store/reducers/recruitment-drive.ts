import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideGlobalLoader, showGlobalLoader } from "./globalLoader";
import axiosInstance, {
  CustomAxiosRequestConfig,
} from "../../utils/axiosInstance";
import { IRecruitmentDrive, IPagination } from "../../types/common-types";
import { RootState } from "../store";

interface RecruitmentDriveState {
  loading: boolean;
  recruitmentDrives: IRecruitmentDrive[];
  pagination: IPagination | null;
}

const initialState: RecruitmentDriveState = {
  loading: false,
  recruitmentDrives: [],
  pagination: null,
};


export const getRecruitmentDrives = createAsyncThunk<
  void
>("recruitmentDrive/getRecruitmentDrives", async (_, { dispatch, getState }) => {
  try {
    dispatch(showGlobalLoader());
    let query = "";
    const { pagination } = (getState() as RootState).recruitmentDrive;

    if (pagination) {
      query += `page=${pagination.page}&limit=${pagination.limit}`;
    }
    const response = await axiosInstance.get(`recruitment-drive?${query}`, {
      showSuccessToast: false,
    } as CustomAxiosRequestConfig);
    dispatch(setRecruitmentDrives(response.data));
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    dispatch(hideGlobalLoader());
  }
});

// export const addExpenseServer = createAsyncThunk<void, ExpenseFormData>(
//   "expense/addExpenseServer",
//   async (body, { dispatch }) => {
//     dispatch(showGlobalLoader());
//     try {
//       const response = await axiosInstance.post("expenses", body);
//       dispatch(addExpense(response.data.data));
//       return response.data;
//     } catch (error) {
//       return Promise.reject(error);
//     } finally {
//       dispatch(hideGlobalLoader());
//     }
//   }
// );

// export const editExpenseServer = createAsyncThunk<
//   void,
//   { data: ExpenseFormData; id: number }
// >("expense/editExpenseServer", async (body, { dispatch }) => {
//   dispatch(showGlobalLoader());
//   try {
//     const response = await axiosInstance.patch(`expenses/${body.id}`, body.data);
//     dispatch(editExpense(response.data.data));
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   } finally {
//     dispatch(hideGlobalLoader());
//   }
// });

// export const deleteExpenseServer = createAsyncThunk<
//   void,
//   { id: number }
// >("expense/deleteExpenseServer", async (body, { dispatch }) => {
//   dispatch(showGlobalLoader());
//   try {
//     const response = await axiosInstance.delete(`expenses/${body.id}`);
//     dispatch(deleteExpense(body));
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   } finally {
//     dispatch(hideGlobalLoader());
//   }
// });

const recruitmentDriveSlice = createSlice({
  name: "recruitmentDrive",
  initialState,
  reducers: {
    setRecruitmentDrives: (state, action) => {
      state.recruitmentDrives = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    setRecruitmentDrivePagination: (state, action) => {
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    // addExpense: (state, action) => {
    //   state.expenses = [action.payload, ...state.expenses];
    // },
    // editExpense: (state, action) => {
    //   const updatedExpenseIndex = state.expenses.findIndex(expense=> expense.id === action.payload.id);
    //   if(updatedExpenseIndex !== -1){
    //     state.expenses[updatedExpenseIndex] = action.payload;
    //   }
    // },
    // deleteExpense: (state, action) => {
    //   state.expenses = state.expenses.filter(expense=> expense.id !== action.payload.id)
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getRecruitmentDrives.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecruitmentDrives.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getRecruitmentDrives.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export actions and the reducer
export const { setRecruitmentDrives, setRecruitmentDrivePagination } = recruitmentDriveSlice.actions;
export default recruitmentDriveSlice.reducer;
