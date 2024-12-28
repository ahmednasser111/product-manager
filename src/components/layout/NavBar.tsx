import {
	Box,
	Flex,
	Button,
	Image,
	Text,
	IconButton,
	DrawerBody,
	DrawerContent,
	DrawerBackdrop,
	VStack,
	HStack,
} from "@chakra-ui/react";
import { BsMoon, BsSun, BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { DrawerRoot } from "../ui/drawer";
import { useState } from "react";
import MenuItems from "./MenuItem";

export default function NavBar() {
	const { colorMode, toggleColorMode } = useColorMode();
	const [isOpen, setOpen] = useState(false);
	const bgColor = useColorModeValue("white", "black");
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
				</Flex>

				<Flex alignItems="center">
					{/* Desktop menu */}
					<HStack display={{ base: "none", md: "flex" }}>
						<MenuItems />
					</HStack>

					{/* Mobile menu button */}
					<IconButton
						aria-label="Open menu"
						onClick={() => setOpen(!isOpen)}
						display={{ base: "flex", md: "none" }}
						ml={2}>
						<BsList />
					</IconButton>

					<Button onClick={toggleColorMode} ml={2}>
						{colorMode === "light" ? <BsMoon /> : <BsSun />}
					</Button>
				</Flex>
			</Flex>

			<DrawerRoot
				open={isOpen}
				placement="top"
				onOpenChange={(e) => setOpen(e.open)}>
				<DrawerBackdrop />
				<DrawerContent>
					<DrawerBody>
						<VStack spaceY={4} align="stretch">
							<MenuItems />
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</DrawerRoot>
		</Box>
	);
}
