// Import necessary dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define API URL
const API_URL = "http://localhost:5000/tasks";

// Create async thunks for API calls
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch(API_URL);
  return response.json();
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, thunkAPI) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    thunkAPI.dispatch(fetchTasks());
    return data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData, thunkAPI) => {
    const response = await fetch(`${API_URL}/${taskData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    thunkAPI.dispatch(fetchTasks());
    return data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    const response = await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    const data = await response.json();
    thunkAPI.dispatch(fetchTasks());
    return data;
  }
);

// Create slice
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };

    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.error;
    };

    builder
      .addCase(fetchTasks.pending, handlePending)
      .addCase(fetchTasks.fulfilled, handleFulfilled)
      .addCase(fetchTasks.rejected, handleRejected)
      .addCase(createTask.pending, handlePending)
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [...state.tasks, action.payload];
        return state;
      })
      .addCase(createTask.rejected, handleRejected)
      .addCase(updateTask.pending, handlePending)
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
        return state;
      })
      .addCase(updateTask.rejected, handleRejected)
      .addCase(deleteTask.pending, handlePending)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
        return state;
      })
      .addCase(deleteTask.rejected, handleRejected);
  },
});

// Export reducer
export default taskSlice.reducer;