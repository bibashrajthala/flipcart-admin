import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// initial state type
interface UsersState {
  entities: [];
  loading: "idle" | "pending" | "succeeded" | "failed";
  number: number;
  error: string;
}

// return type of thunk
interface MyData {
  // ...
}

// first argument sent to thunk from components while dispatching
interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

// error type returned by thunk
interface MyKnownError {
  errorMessage: string;
  // ...
}

const initialState = {
  entities: [],
  loading: "idle",
  number: 0,
  error: "",
} as UsersState;

export const fetchUserById = createAsyncThunk<
  // Return type of the payload creator
  MyData,
  // First argument to the payload creator
  UserAttributes,
  // Types for ThunkAPI
  {
    extra: {
      jwt: "";
    };
    rejectValue: MyKnownError;
  }
>(
  "users/fetchById",
  // if you type your function argument here
  async (user, thunkApi) => {
    const response = await fetch(`https://reqres.in/api/users/${user}`);

    if (response.status === 400) {
      // Return the known error for future handling
      return thunkApi.rejectWithValue((await response.json()) as MyKnownError);
    }

    return (await response.json()) as MyData;
  }
);

const loginSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(fetchUserById.fulfilled, (state, { payload }) => {
      //   state.entities[payload.id] = payload;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage;
      } else if (action.error) {
        console.log(action.error);
      }
    });
  },
});

export const { increment } = loginSlice.actions;

export default loginSlice.reducer;
