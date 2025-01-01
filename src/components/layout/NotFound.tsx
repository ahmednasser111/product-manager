import { Box, Heading, Text, Center } from "@chakra-ui/react";

function NotFound() {
	return (
		<Center h="100vh">
			<Box textAlign="center">
				<Heading as="h1" size="2xl" mb={4}>
					404 - Page Not Found
				</Heading>
				<Text fontSize="lg">
					Oops! The page you're looking for does not exist.
				</Text>
			</Box>
		</Center>
	);
}

export default NotFound;
