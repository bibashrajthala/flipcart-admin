import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.utils";
import { UserRegisterData } from "../../types/types";

// return type of thunk(returned by backend)
interface MyData {
  message: string;
}

// error type returned by thunk
interface MyKnownError {
  message?: string;
  error?: string;
  // ...
}

// initial state type
interface InitialLoginState {
  loading: boolean;
  error: MyKnownError | null;
  message: string;
}

const initialState = {
  loading: false,
  error: null,
  message: "",
} as InitialLoginState;

export const register = createAsyncThunk(
  "auth/loginUser",
  async (user: UserRegisterData, thunkApi) => {
    try {
      const response = await axios.post(`/api/admin/signup`, user);
      const data = await response.data;

      return data as MyData;
      // return (await { ...user }) as MyData;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data as MyKnownError);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.message = payload.message;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.loading = false;
    });
  },
});

// export const { logout } = userSlice.actions;

export default userSlice.reducer;
