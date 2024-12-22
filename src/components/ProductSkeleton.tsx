import { Box, Flex, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "./ui/skeleton";
import { useColorModeValue } from "./ui/color-mode";

const ProductSkeleton = () => {
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<Box
			borderWidth="1px"
			borderColor={borderColor}
			borderRadius="lg"
			overflow="hidden"
			boxShadow="xl"
			bg={bgColor}
			transition="all 0.3s">
			<Skeleton height={{ base: "200px", md: "250px" }} width="100%" />

			<VStack p={4} alignItems="start" spaceY={3}>
				<Skeleton height="24px" width="70%" />
				<SkeletonText noOfLines={2} spaceY={2} width="90%" />
				<Skeleton height="32px" width="40%" />

				<Flex width="100%" justify="space-between" mt={2}>
					<Skeleton height="40px" width="48%" borderRadius="md" />
					<Skeleton height="40px" width="48%" borderRadius="md" />
				</Flex>
			</VStack>
		</Box>
	);
};

export default ProductSkeleton;
