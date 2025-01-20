import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

function DashBoardLayout() {
	return (
		<Flex direction="column" minHeight="100vh">
			<NavBar />
			<Flex flex="1">
				<SideBar/>
				<Box as="main" flex="1" p={4}>
					<Outlet />
				</Box>
			</Flex>
		</Flex>
	);
}

export default DashBoardLayout;