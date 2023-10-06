import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addTask = createAsyncThunk(
  "task/add",
  async (task: any, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/api/task", {
        method: "POST",
        credentials: "include",
        headers: {},
        body: task,
      });
      const result = await response;
      if (result.ok) {
        console.log(result, "console.log(result)");

        return setTimeout(() => {
          return result;
        }, 10);
      } else {
        console.log(result);
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

export const redTask = createAsyncThunk(
  "task/red",
  async (task: any, thunkAPI) => {
    console.log(task, "task task task");

    try {
      const response = await fetch("http://localhost:5000/api/task", {
        method: "PUT",
        credentials: "include",
        headers: {},
        body: task,
      });
      const result = await response;
      if (result.ok) {
        console.log(result, "console.log(result)");
        return setTimeout(() => {
          return result;
        }, 10);
      } else {
        console.log(result);
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

export const getTask = createAsyncThunk(
  "task/get",
  async ({ user, startDate, endDate }, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/task/all/?userId=${user.id}&startDate=${startDate}&endDate=${endDate}`,
        { credentials: "include" }
      );
      const result = await response.json();

      if (result[0].id) {
        return result;
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

export const delTask = createAsyncThunk(
  "task/del",
  async (taskId, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5000/api/task`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId }),
      });
      const result = await response.json();
      if (result) {
        return setTimeout(() => {
          return result;
        }, 10);
      } else {
        console.log(result);
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

type taskType = {
  task: object | null;
  getAllTasks: boolean;
};

const initialState: taskType = {
  task: null,
  getAllTasks: false,
};
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.task = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {})
      .addCase(addTask.fulfilled, (state, action) => {
        state.getAllTasks = !state.getAllTasks;
        state.task = null;
      })
      .addCase(addTask.rejected, (state, action) => {})
      .addCase(getTask.pending, (state) => {})
      .addCase(getTask.fulfilled, (state, action) => {
        state.task = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        console.log("worrrrrrrrrrrrrk");

        state.task = null;
      })
      .addCase(delTask.pending, (state) => {})
      .addCase(delTask.fulfilled, (state, action) => {
        state.getAllTasks = !state.getAllTasks;
        state.task = null;
      })
      .addCase(delTask.rejected, (state, action) => {})
      .addCase(redTask.pending, (state) => {})
      .addCase(redTask.fulfilled, (state, action) => {
        state.getAllTasks = !state.getAllTasks;
        state.task = null;
      })
      .addCase(redTask.rejected, (state, action) => {});
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
