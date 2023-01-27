import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.utils";
import { Category } from "../../types/types";
import { CategoryInputs } from "../../containers/Categories";

// return type of thunk(returned by backend)
// interface GetCategoryResponse {
//   categoryList: Category[];
// }
interface AddCategoryResponse {
  message: string;
}

// error type returned by thunk
interface MyKnownError {
  message?: string;
  error?: string;
  // ...
}

// initial state type
interface InitialState {
  loading: boolean;
  error: MyKnownError | null;
  categories: Category[];
  message: string;
}

const initialState = {
  loading: false,
  error: null,
  categories: [],
  message: "",
} as InitialState;

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`/api/category`);
      const data = await response.data.categoryList;

      // console.log(data);

      return data as Category[];
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data as MyKnownError);
    }
  }
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (body: any, thunkApi) => {
    try {
      const response = await axios.post(`/api/admin/category/create`, body);
      const data = await response.data;

      return data as AddCategoryResponse;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data as MyKnownError);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.loading = false;
      state.categories = [];
    });
    builder.addCase(addCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, { payload }) => {
      state.message = payload.message;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.loading = false;
      state.categories = [];
    });
  },
});

// export const { logout } = userSlice.actions;

export default categorySlice.reducer;
