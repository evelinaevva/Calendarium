import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type userType = {
  user: authUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

type authUser = {
  userId: number;
  userName: string;
  userEmail: string;
  userSettings: object;
};

const initialState: userType = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const sessionUser = createAsyncThunk(
  "auth/addUser",
  async (thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/session", {
        credentials: "include",
      });
      const result = await response.json();
      if (result.user.id) {
        return result.user;
      } else {
        return null;
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/registration",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const result = await response.json();
      if (result.id) {
        toast.success("Вы успешно авторизованы!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return result;
      } else {
        toast.error(result.message, { position: toast.POSITION.BOTTOM_RIGHT });
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, { position: toast.POSITION.BOTTOM_RIGHT });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    if (result.id) {
      toast.success("Вы успешно авторизованы!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return result;
    } else {
      toast.error(result.message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await fetch("http://localhost:5000/api/user/logout", {
      method: "DELETE",
      credentials: "include",
    });
    const result = await response.json();
    toast.success(result.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(sessionUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sessionUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(sessionUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
