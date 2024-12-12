import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

interface ProductCardProps {
	name: string;
	description: string;
	price: number;
	imageUrl: string;
}

function ProductCard({ name, description, price, imageUrl }: ProductCardProps) {
	const bgColor = useColorModeValue("white", "gray.800");
	const textColor = useColorModeValue("gray.800", "white");
	const descriptionColor = useColorModeValue("gray.600", "gray.300");
	const priceColor = useColorModeValue("teal.600", "teal.300");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<Box
			borderWidth="1px"
			borderColor={borderColor}
			borderRadius="lg"
			overflow="hidden"
			boxShadow="xl"
			bg={bgColor}
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}>
			<Image
				src={imageUrl}
				alt={name}
				height={{ base: "200px", md: "250px" }}
				width="100%"
				objectFit="cover"
			/>

			<VStack p={4} alignItems="start" spaceY={3}>
				<Text fontWeight="semibold" fontSize="xl" color={textColor}>
					{name}
				</Text>
				<Text color={descriptionColor}>{description}</Text>
				<Text fontSize="2xl" fontWeight="bold" color={priceColor}>
					${price.toFixed(2)}
				</Text>

				<Flex width="100%" justify="space-between" mt={2}>
					<Button colorScheme="teal" flex={1} mr={2}>
						Buy now
					</Button>
					<Button variant="outline" colorScheme="teal" flex={1}>
						Add to cart
					</Button>
				</Flex>
			</VStack>
		</Box>
	);
}
export default ProductCard;
