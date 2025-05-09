import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
	id: string;
	title: string;
	price: number;
	quantity: number;
	image: string;
}

interface CartState {
	items: CartItem[];
	total: number;
	count: number;
}

const initialState: CartState = {
	items: [],
	total: 0,
	count: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
			state.total = Number((state.items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			)).toFixed(2));
			state.count++;
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
			state.total = Number((state.items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			)).toFixed(2));
			state.count = state.items.reduce((sum, item) => sum + item.quantity, 0);
		},
		updateQuantity: (
			state,
			action: PayloadAction<{ id: string; quantity: number }>
		) => {
			const item = state.items.find((item) => item.id === action.payload.id);
			if (item) {
				item.quantity = action.payload.quantity;
				state.total = Number((state.items.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0
				)).toFixed(2));
			}
			state.count = state.items.reduce((sum, item) => sum + item.quantity, 0);
		},
		clearCart: (state) => {
			state.items = [];
			state.total = 0;
			state.count = 0;
		},
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
