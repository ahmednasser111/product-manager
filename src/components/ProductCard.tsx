import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../app/Slices/CartSlice";

interface ProductCardProps {
	title: string;
	description: string;
	price: number;
	imgURL: string;
	id: string;
}

function ProductCard({
	title,
	description,
	price,
	imgURL,
	id,
}: ProductCardProps) {
	const bgColor = useColorModeValue("white", "gray.800");
	const textColor = useColorModeValue("gray.800", "white");
	const descriptionColor = useColorModeValue("gray.600", "gray.300");
	const priceColor = useColorModeValue("teal.600", "teal.300");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const openProductDetailsPage = () => {
		navigate(`${id}`);
	};

	const handleBuyNow = (e: React.MouseEvent) => {
		e.stopPropagation();
		// Add buy now logic here
	};

	const handleAddToCart = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(addToCart({ id, title, price, image: imgURL }));
	};
	return (
		<Box
			borderWidth="1px"
			borderColor={borderColor}
			borderRadius="lg"
			overflow="hidden"
			boxShadow="xl"
			bg={bgColor}
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
			onClick={openProductDetailsPage}
			cursor="pointer">
			<Image
				src={imgURL}
				alt={title}
				height={{ base: "200px", md: "250px" }}
				width="100%"
				objectFit="cover"
			/>

			<VStack p={4} alignItems="start" spaceY={3}>
				<Text fontWeight="semibold" fontSize="xl" color={textColor}>
					{title}
				</Text>
				<Text color={descriptionColor}>{description}</Text>
				<Text fontSize="2xl" fontWeight="bold" color={priceColor}>
					${price.toFixed(2)}
				</Text>

				<Flex width="100%" justify="space-between" mt={2}>
					<Button colorScheme="teal" flex={1} mr={2} onClick={handleBuyNow}>
						Buy now
					</Button>
					<Button
						variant="outline"
						colorScheme="teal"
						flex={1}
						onClick={handleAddToCart}>
						Add to cart
					</Button>
				</Flex>
			</VStack>
		</Box>
	);
}

export default ProductCard;
