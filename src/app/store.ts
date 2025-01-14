import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./Slices/AuthSlice";
import cartSlice from "./Slices/CartSlice";
import { ProductApiSlice } from "./Slices/ProductApiSlice";

const cartPersistConfig = {
	key: "cart",
	storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

export const store = configureStore({
	reducer: {
		[ProductApiSlice.reducerPath]: ProductApiSlice.reducer,
		auth: authSlice,
		cart: persistedCartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(ProductApiSlice.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
