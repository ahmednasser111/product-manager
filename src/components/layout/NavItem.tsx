import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface NavItemProps {
	to: string;
	label: string;
	hoverBg: string;
	activeBg: string;
	activeColor: string;
}

const NavItem = ({
	to,
	label,
	hoverBg,
	activeBg,
	activeColor,
}: NavItemProps) => {
	return (
		<Link to={to} style={{ width: "100%" }}>
			<Button
				as="span"
				variant="ghost"
				justifyContent="flex-start"
				width="full"
				py={3}
				px={4}
				borderRadius="md"
				_hover={{ bg: hoverBg }}
				_active={{ bg: activeBg, color: activeColor }}>
				<HStack spaceX={4}>{label}</HStack>
			</Button>
		</Link>
	);
};
export default NavItem;
