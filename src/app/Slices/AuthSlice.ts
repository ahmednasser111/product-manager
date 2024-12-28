// src/store/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";

export const loginUser = createAsyncThunk(
	"auth/login",
	async (userData: { email: string; password: string }, thunkAPI) => {
		try {
			const response = await axiosInstance.post("/api/auth/local", userData);
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const signupUser = createAsyncThunk(
	"auth/signup",
	async (
		userData: { email: string; password: string; confirmPassword?: string },
		thunkAPI
	) => {
		try {
			const response = await axiosInstance.post(
				"/api/auth/local/register",
				userData
			);
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action: any) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(signupUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(signupUser.rejected, (state, action: any) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default authSlice.reducer;
