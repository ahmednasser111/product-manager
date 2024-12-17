import { Box, VStack, Button, Grid, Spinner, Text } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../app/Slices/ProductApiSlice";

function Products() {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const { colorMode, toggleColorMode } = useColorMode();
	const { data, isLoading, isError } = useGetProductsQuery(undefined);

	if (isLoading) {
		return (
			<Box
				minHeight="100vh"
				display="flex"
				justifyContent="center"
				alignItems="center">
				<Spinner size="xl" />
			</Box>
		);
	}

	if (isError) {
		return (
			<Box
				minHeight="100vh"
				display="flex"
				justifyContent="center"
				alignItems="center">
				<Text fontSize="xl" color="red.500">
					Failed to load products. Please try again later.
				</Text>
			</Box>
		);
	}

	// Transform API data
	const products = data?.data?.map((product: any) => ({
		id: product.id,
		name: product.title, // API 'title' maps to 'name' for ProductCard
		description: product.description,
		price: product.price,
		imageUrl:
			product.thumbnail?.formats?.large.url ||
			product.thumbnail?.formats?.thumbnail?.url,
	}));

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
				{products?.map((product: any) => (
					<ProductCard
						key={product.id}
						name={product.name}
						description={product.description}
						price={product.price}
						imageUrl={`${BASE_URL}${product.imageUrl}`}
					/>
				))}
			</Grid>
		</Box>
	);
}

export default Products;
