import { configureStore } from "@reduxjs/toolkit";
import { ProductApiSlice } from "./Slices/ProductApiSlice";
// ...

export const store = configureStore({
	reducer: {
		[ProductApiSlice.reducerPath]: ProductApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(ProductApiSlice.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;