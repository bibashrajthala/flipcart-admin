import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axios.utils";
import { UserData, UserLoginData } from "../../types/types";

// return type of thunk
interface MyData {
  token: string;
  user: UserData;
}
interface MyLogoutData {
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
  isAuthenticated: boolean;
  token: string;
  user: UserData;
  error: MyKnownError | null;
  message: string;
}

const initialState = {
  loading: false,
  isAuthenticated: false,
  token: "",
  user: {},
  error: null,
  message: "",
} as InitialLoginState;

const loginPending = ["auth/loginUser/pending", "auth/checkLogin/pending"];
const loginFulfilled = [
  "auth/loginUser/fulfilled",
  "auth/checkLogin/fulfilled",
];
const loginRejected = ["auth/loginUser/rejected", "auth/checkLogin/rejected"];

export const login = createAsyncThunk(
  "auth/loginUser",
  async (user: UserLoginData, thunkApi) => {
    try {
      const response = await axios.post(`/api/admin/signin`, user);
      const data = await response.data;

      return data as MyData;
      // return (await { ...user }) as MyData;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data as MyKnownError);
    }
  }
);

export const isUserLoggedIn = createAsyncThunk("auth/checkLogin", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return {
      token,
      user,
    };
  } else {
    throw new Error("Failed to Login!");
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const response = await axios.post(`/api/admin/signout`);
    console.log(response);
    const data = await response.data;

    return data as MyLogoutData;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue(error.response.data as MyKnownError);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logout: (state) => {
    //   // console.log("logout");
    //   localStorage.clear();
    //   return initialState;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      localStorage.clear();
      return { ...initialState, message: action.payload.message };
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
    // builder.addCase(login.pending, (state, action) => {
    builder.addMatcher(
      (action) => loginPending.includes(action.type),
      (state, action) => {
        state.loading = true;
        state.isAuthenticated = false;
      }
    );
    // builder.addCase(login.fulfilled, (state, { payload }) => {
    builder.addMatcher(
      (action) => loginFulfilled.includes(action.type),
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;

        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    );
    // builder.addCase(login.rejected, (state, action) => {
    builder.addMatcher(
      (action) => loginRejected.includes(action.type),
      (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        }
        state.loading = false;
        state.isAuthenticated = false;
      }
    );
  },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
