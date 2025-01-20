import { Box, VStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
	return (
		<Box as="aside" width="150px" p={4}>
			<VStack align="start" spaceY={4}>
				<Text fontSize="lg" fontWeight="bold">
					Menu
				</Text>
				<NavLink to="/dashboard" style={{ textDecoration: "none" }}>
					Dashboard
				</NavLink>
				<NavLink to="products" style={{ textDecoration: "none" }}>
					Products
				</NavLink>
				<NavLink to="/inventory" style={{ textDecoration: "none" }}>
					Inventory
				</NavLink>
				<NavLink to="/orders" style={{ textDecoration: "none" }}>
					Orders
				</NavLink>
				<NavLink to="/profile" style={{ textDecoration: "none" }}>
					Profile
				</NavLink>
			</VStack>
		</Box>
	);
};

export default SideBar;