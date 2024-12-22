import { Box, Flex, Button, Image, Text } from "@chakra-ui/react";
import { BsMoon, BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../ui/color-mode";

export default function NavBar() {
	const { colorMode, toggleColorMode } = useColorMode();
	const bgColor = useColorModeValue("gray.100", "gray.900");
	const textColor = useColorModeValue("gray.800", "white");

	return (
		<Box bg={bgColor} px={4}>
			<Flex h={16} alignItems="center" justifyContent="space-between">
				<Flex alignItems="center">
					<Link to="/">
						<Flex alignItems="center">
							<Image
								src="/favicon.webp"
								alt="Product Manager Logo"
								boxSize="40px"
								mr={2}
							/>
							<Text fontSize="xl" fontWeight="bold" color={textColor}>
								Product Manager
							</Text>
						</Flex>
					</Link>
					<Link to="/products">
						<Button variant="ghost" color={textColor} ml={4}>
							Products
						</Button>
					</Link>
					<Link to="/dashboard">
						<Button variant="ghost" color={textColor}>
							Dashboard
						</Button>
					</Link>
				</Flex>

				<Flex alignItems="center">
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <BsMoon /> : <BsSun />}
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
}
