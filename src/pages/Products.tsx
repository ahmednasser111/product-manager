import { Box, Grid, Text } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../app/Slices/ProductApiSlice";
import ProductSkeleton from "../components/ProductSkeleton";
import { Product } from "../interfaces";
import axiosInstance from "../config/axios.config";

function Products() {
	const { colorMode } = useColorMode();
	const { data, isLoading, isError } = useGetProductsQuery(undefined);

	// Show error message
	if (isError)
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
	return (
		<Box
			minHeight="100vh"
			p={4}
			bg={colorMode === "light" ? "gray.100" : "gray.900"}>
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
				}}
				gap={8}
				justifyContent="center">
				{/* Show skeletons when loading */}
				{isLoading
					? Array.from({ length: 6 }).map((_, index) => (
							<ProductSkeleton key={index} />
					  ))
					: data.data?.map((product: Product) => (
							<ProductCard
								key={product.id}
								id={product.documentId}
								title={product.title}
								description={product.description}
								price={product.price}
								imgURL={`${axiosInstance.defaults.baseURL}${product.thumbnail.url}`}
							/>
					  ))}
			</Grid>
		</Box>
	);
}

export default Products;
