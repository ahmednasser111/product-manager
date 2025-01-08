import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
	clearCart,
	removeFromCart,
	updateQuantity,
} from "../app/Slices/CartSlice";
import {
	Container,
	Box,
	Button,
	Text,
	VStack,
	HStack,
	Heading,
} from "@chakra-ui/react";

const Cart: React.FC = () => {
	const dispatch = useAppDispatch();
	const { items, total } = useAppSelector((state) => state.cart);

	const handleQuantityChange = (id: string, quantity: number) => {
		dispatch(updateQuantity({ id, quantity }));
	};

	const handleRemoveItem = (id: string) => {
		dispatch(removeFromCart(id));
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	if (items.length === 0) {
		return (
			<Container maxW="lg" mt={4}>
				<Heading as="h5" size="lg" textAlign="center">
					Your cart is empty
				</Heading>
			</Container>
		);
	}

	return (
		<Container maxW="lg" mt={4}>
			<VStack spaceY={4}>
				{items.map((item) => (
					<HStack
						key={item.id}
						spaceX={4}
						w="full"
						justifyContent="space-between">
						<Box>
							<Text>{item.title}</Text>
							<Text>Price: ${item.price}</Text>
							<Text>Quantity: {item.quantity}</Text>
						</Box>
						<HStack>
							<Button
								onClick={() =>
									handleQuantityChange(item.id, item.quantity + 1)
								}>
								+
							</Button>
							<Button
								onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
								disabled={item.quantity === 1}>
								-
							</Button>
							<Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
						</HStack>
					</HStack>
				))}
				<HStack w="full" justifyContent="space-between">
					<Text>Total: ${total}</Text>
					<Button onClick={handleClearCart}>Clear Cart</Button>
				</HStack>
			</VStack>
		</Container>
	);
};

export default Cart;
