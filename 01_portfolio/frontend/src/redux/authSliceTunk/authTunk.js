import { createAsyncThunk } from "@reduxjs/toolkit";
import { signup, login, logout, me } from "../../api/auth.js";

// Signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signup(userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await logout();
  return response.data;
});

// Get current user
export const getMe = createAsyncThunk("auth/me", async () => {
  const response = await me();
  return response.data;
});
