import { VStack } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { useColorModeValue } from "../ui/color-mode";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../app/Slices/AuthSlice";

const MenuItems = () => {
	const hoverBg = useColorModeValue("gray.100", "gray.700");
	const activeBg = useColorModeValue("blue.50", "blue.900");
	const activeColor = useColorModeValue("blue.600", "blue.200");

	const isAuth = useAppSelector(selectIsAuthenticated);

	const itemCount = useAppSelector((state) => state.cart.count);

	return (
		<VStack
			align='stretch'
			width='full'
			flexDirection={{ base: "column", md: "row" }}>
			<NavItem
				to='/'
				label='Home'
				hoverBg={hoverBg}
				activeBg={activeBg}
				activeColor={activeColor}
			/>
			<NavItem
				to='/dashboard'
				label='Dashboard'
				hoverBg={hoverBg}
				activeBg={activeBg}
				activeColor={activeColor}
			/>
			<NavItem
				to='/products'
				label='Products'
				hoverBg={hoverBg}
				activeBg={activeBg}
				activeColor={activeColor}
			/>
			{/* Add Cart NavItem */}
			<NavItem
				to='/cart'
				label={`Cart (${itemCount})`}
				hoverBg={hoverBg}
				activeBg={activeBg}
				activeColor={activeColor}
			/>
			{isAuth ? (
				<>
					<NavItem
						to='/profile'
						label='Profile'
						hoverBg={hoverBg}
						activeBg={activeBg}
						activeColor={activeColor}
					/>
					<NavItem
						to='/logout'
						label='Logout'
						hoverBg={hoverBg}
						activeBg={activeBg}
						activeColor={activeColor}
					/>
				</>
			) : (
				<NavItem
					to='/auth'
					label='Login'
					hoverBg={hoverBg}
					activeBg={activeBg}
					activeColor={activeColor}
				/>
			)}
		</VStack>
	);
};

export default MenuItems;
