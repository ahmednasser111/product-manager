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

// Helper function to check authentication status
const checkIsAuthenticated = () => {
	const token = cookies.get("token");
	return !!token;
};

// Initial state
const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
	isAuthenticated: checkIsAuthenticated(), // Initialize based on cookie
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

			// Store JWT and user data in cookies
			cookies.set("token", response.data.jwt, cookieOptions);
			cookies.set("user", JSON.stringify(response.data.user), cookieOptions);

			// Update axios default headers
			axiosInstance.defaults.headers.common["Authorization"] =
				`Bearer ${response.data.jwt}`;

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

			// Store JWT and user data in cookies
			cookies.set("token", response.data.jwt, cookieOptions);
			cookies.set("user", JSON.stringify(response.data.user), cookieOptions);

			// Update axios default headers
			axiosInstance.defaults.headers.common["Authorization"] =
				`Bearer ${response.data.jwt}`;

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
			// Remove token and user data from cookies
			cookies.remove("token", { path: "/" });
			cookies.remove("user", { path: "/" });

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
			state.isAuthenticated = checkIsAuthenticated(); // Check cookie instead of always setting to true
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
				state.isAuthenticated = checkIsAuthenticated(); // Check cookie instead of always setting to true
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action: any) => {
				state.loading = false;
				state.error = action.payload;
				state.isAuthenticated = checkIsAuthenticated(); // Check cookie in case of error
			})

			// Signup cases
			.addCase(signupUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.isAuthenticated = checkIsAuthenticated(); // Check cookie instead of always setting to true
				state.error = null;
			})
			.addCase(signupUser.rejected, (state, action: any) => {
				state.loading = false;
				state.error = action.payload;
				state.isAuthenticated = checkIsAuthenticated(); // Check cookie in case of error
			})

			// Logout cases
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.isAuthenticated = checkIsAuthenticated(); // Check cookie instead of always setting to false
				state.error = null;
			});
	},
});

// Actions
export const { clearError, setUser, clearUser } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
	state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
	state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
