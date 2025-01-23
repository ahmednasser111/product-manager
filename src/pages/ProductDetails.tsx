import {
	Box,
	Container,
	Flex,
	Image,
	Text,
	Heading,
	VStack,
	HStack,
	Button,
	Badge,
	Spinner,
} from "@chakra-ui/react";
import { useGetProductQuery } from "../app/Slices/products";
import { useColorModeValue } from "../components/ui/color-mode";
import { Alert } from "../components/ui/alert";
import { useParams } from "react-router-dom";
import { Product } from "../interfaces";
import axiosInstance from "../config/axios.config";

export default function ProductDetails() {
	// Extract the `id` parameter from the URL
	const params = useParams<{ id: string }>();
	const id = params.id || "";

	// Fetch the product details using the `id`
	const { data, isLoading, isError } = useGetProductQuery(id);

	const bgColor = useColorModeValue("gray.50", "gray.900");
	const textColor = useColorModeValue("gray.600", "gray.200");

	if (isLoading) {
		return (
			<Flex
				minHeight='100vh'
				justify='center'
				align='center'
				bg={bgColor}>
				<Spinner size='xl' />
			</Flex>
		);
	}

	if (isError) {
		return (
			<Flex
				minHeight='100vh'
				justify='center'
				align='center'
				bg={bgColor}>
				<Alert>
					<Text>Error</Text>
					<Text>Failed to load product details. Please try again later.</Text>
				</Alert>
			</Flex>
		);
	}

	// Extract product details from the response
	const product: Product = data?.data;
	return (
		<Box
			minHeight='100vh'
			bg={bgColor}>
			<Container
				maxW='6xl'
				py={12}>
				<Flex
					direction={{ base: "column", md: "row" }}
					gap={8}>
					<Box flex={1}>
						<Image
							src={`${axiosInstance.defaults.baseURL}${product.thumbnail?.url}`}
							alt={product.title}
							borderRadius='lg'
							objectFit='cover'
							w='100%'
							h={{ base: "300px", md: "500px" }}
						/>
					</Box>
					<VStack
						flex={1}
						align='start'
						spaceY={6}>
						<Heading
							as='h1'
							size='2xl'>
							{product.title}
						</Heading>
						<Text
							fontSize='3xl'
							fontWeight='bold'
							color='teal.500'>
							${product.price.toFixed(2)}
						</Text>
						<Text color={textColor}>{product.description}</Text>
						<HStack>
							<Text fontWeight='bold'>Availability:</Text>
							<Badge colorScheme={product.stock > 0 ? "green" : "red"}>
								{product.stock > 0 ? "In Stock" : "Out of Stock"}
							</Badge>
						</HStack>
						{product.stock > 0 && (
							<Text>Only {product.stock} left in stock - order soon.</Text>
						)}
						<Button
							colorScheme='teal'
							size='lg'
							width='full'
							disabled={product.stock === 0}>
							Add to Cart
						</Button>
					</VStack>
				</Flex>
			</Container>
		</Box>
	);
}
