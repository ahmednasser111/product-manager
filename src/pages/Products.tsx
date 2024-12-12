import { Box, VStack, Button, Grid } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import ProductCard from "../components/ProductCard";

function Products() {
	const { colorMode, toggleColorMode } = useColorMode();

	const products = [
		{
			name: "Ergonomic Chair",
			description: "Comfortable office chair with lumbar support",
			price: 199.99,
			imageUrl: "https://via.placeholder.com/300",
		},
		{
			name: "Wireless Keyboard",
			description: "Slim, quiet-typing wireless keyboard",
			price: 79.99,
			imageUrl: "https://via.placeholder.com/300",
		},
		{
			name: "4K Monitor",
			description: "Ultra-sharp 27-inch 4K monitor",
			price: 349.99,
			imageUrl: "https://via.placeholder.com/300",
		},
		{
			name: "Noise-Cancelling Headphones",
			description: "Over-ear headphones with active noise cancellation",
			price: 249.99,
			imageUrl: "https://via.placeholder.com/300",
		},
		{
			name: "Wireless Mouse",
			description: "Ergonomic wireless mouse with programmable buttons",
			price: 49.99,
			imageUrl: "https://via.placeholder.com/300",
		},
		{
			name: "Laptop Stand",
			description: "Adjustable aluminum laptop stand",
			price: 39.99,
			imageUrl: "https://via.placeholder.com/300",
		},
	];

	return (
		<Box
			minHeight="100vh"
			p={4}
			bg={colorMode === "light" ? "gray.100" : "gray.900"}>
			<VStack spaceY={4} align="center" mb={8}>
				<Button onClick={toggleColorMode}>
					Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
				</Button>
			</VStack>

			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
				}}
				gap={8}
				justifyContent="center">
				{products.map((product, index) => (
					<ProductCard
						key={index}
						name={product.name}
						description={product.description}
						price={product.price}
						imageUrl={product.imageUrl}
					/>
				))}
			</Grid>
		</Box>
	);
}

export default Products;
