import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Types
interface User {
	id: string;
	username?: string;
	email: string;
	jwt?: string;
}

interface AuthState {
	user: User | null;
	loading: boolean;
	error: any | null;
	isAuthenticated: boolean;
}

interface LoginCredentials {
	identifier: string;
	password: string;
}

interface SignupCredentials {
	email: string;
	password: string;
	username?: string;
}

interface AuthResponse {
	jwt: string;
	user: User;
}

// Initial state
const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
	isAuthenticated: false,
};

// Cookie options
const cookieOptions = {
	path: "/",
	secure: import.meta.env.PROD,
	sameSite: true,
	maxAge: 7 * 24 * 60 * 60, // 7 days
};

// Async thunks
export const loginUser = createAsyncThunk(
	"auth/login",
	async (userData: LoginCredentials, thunkAPI) => {
		try {
			const response = await axiosInstance.post<AuthResponse>(
				"/api/auth/local",
				userData
			);

			// Store JWT in cookie
			cookies.set("token", response.data.jwt, cookieOptions);

			// Update axios default headers
			axiosInstance.defaults.headers.common[
				"Authorization"
			] = `Bearer ${response.data.jwt}`;

			return response.data;
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error?.message || "Login failed";
			return thunkAPI.rejectWithValue({
				error: errorMessage,
				details: error.response?.data,
			});
		}
	}
);

export const signupUser = createAsyncThunk(
	"auth/signup",
	async (userData: SignupCredentials, thunkAPI) => {
		try {
			const response = await axiosInstance.post<AuthResponse>(
				"/api/auth/local/register",
				userData
			);

			// Store JWT in cookie
			cookies.set("token", response.data.jwt, cookieOptions);

			// Update axios default headers
			axiosInstance.defaults.headers.common[
				"Authorization"
			] = `Bearer ${response.data.jwt}`;

			return response.data;
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error?.message || "Signup failed";
			return thunkAPI.rejectWithValue({
				error: errorMessage,
				details: error.response?.data,
			});
		}
	}
);

export const logoutUser = createAsyncThunk(
	"auth/logout",
	async (_, thunkAPI) => {
		try {
			// Remove token from cookies
			cookies.remove("token", { path: "/" });

			// Remove Authorization header
			delete axiosInstance.defaults.headers.common["Authorization"];

			return null;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

// Auth slice
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		clearUser: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// Login cases
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action: any) => {
				state.loading = false;
				state.error = action.payload;
				state.isAuthenticated = false;
			})

			// Signup cases
			.addCase(signupUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(signupUser.rejected, (state, action: any) => {
				state.loading = false;
				state.error = action.payload;
				state.isAuthenticated = false;
			})

			// Logout cases
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.isAuthenticated = false;
				state.error = null;
			});
	},
});

// Actions
export const { clearError, setUser, clearUser } = authSlice.actions;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
	state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
	state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
