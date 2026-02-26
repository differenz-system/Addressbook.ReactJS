import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Default login credentials for testing
const DEFAULT_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123",
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  registeredUsers: [],
};

// Async thunk for registration
export const registerAsync = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue, getState }) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { registeredUsers } = getState().auth;

      // Check if user already exists
      const userExists = registeredUsers.some(
        (user) => user.email === userData.email,
      );

      if (userExists) {
        return rejectWithValue("User with this email already exists");
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString(),
      };

      // Redux Persist will automatically save registeredUsers
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  },
);

// Async thunk for login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue, getState }) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Validate credentials
      if (!credentials.email || !credentials.password) {
        return rejectWithValue("Email and password are required");
      }

      const { registeredUsers } = getState().auth;

      // Check default credentials
      if (
        credentials.email === DEFAULT_CREDENTIALS.email &&
        credentials.password === DEFAULT_CREDENTIALS.password
      ) {
        const user = {
          email: credentials.email,
          name: "Admin User",
          isDefault: true,
        };
        // Redux Persist will automatically save auth state
        return user;
      }

      // Check registered users
      const user = registeredUsers.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password,
      );

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }

      // Login successful
      const userData = {
        email: user.email,
        name: user.name,
        id: user.id,
      };
      // Redux Persist will automatically save auth state
      return userData;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  },
);

// Async thunk for logout
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Redux Persist will automatically save the cleared state
      return null;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register pending
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Register fulfilled
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredUsers.push(action.payload);
        state.error = null;
        toast.success("Account created successfully! Please login.");
      })
      // Register rejected
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Registration failed");
      })
      // Login pending
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Login fulfilled
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        toast.success(
          `Welcome, ${action.payload.name || action.payload.email}!`,
        );
      })
      // Login rejected
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        toast.error(action.payload || "Login failed. Please try again.");
      })
      // Logout pending
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Logout fulfilled
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        toast.success("Logged out successfully!");
      })
      // Logout rejected
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
