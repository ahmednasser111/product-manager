import { VStack } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { useColorModeValue } from "../ui/color-mode";

const MenuItems = () => {
	const hoverBg = useColorModeValue("gray.100", "gray.700");
	const activeBg = useColorModeValue("blue.50", "blue.900");
	const activeColor = useColorModeValue("blue.600", "blue.200");
	return (
		<VStack
			align="stretch"
			width="full"
			flexDirection={{ base: "column", md: "row" }}>
			<NavItem
				to="/products"
				label="Products"
				hoverBg={hoverBg}
				activeBg={activeBg}
				activeColor={activeColor}
			/>
			<NavItem
				to="/dashboard"
				label="Dashboard"
				hoverBg={hoverBg}
				activeBg={activeBg}
				activeColor={activeColor}
			/>
			<NavItem
				to="/auth"
				label="Login"
				hoverBg={hoverBg}
				activeBg={activeBg}
				activeColor={activeColor}
			/>
		</VStack>
	);
};
export default MenuItems;
