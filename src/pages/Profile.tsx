import React from "react";
import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../app/Slices/AuthSlice";
import { Toaster, toaster } from "../components/ui/toaster";
import { useAppDispatch } from "../app/hooks";
import { useColorModeValue } from "../components/ui/color-mode";
import Cookies from "universal-cookie";

const Profile: React.FC = () => {
	const user = new Cookies().get("user");
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const bg = useColorModeValue("gray.100", "gray.900");
	const color = useColorModeValue("black", "white");

	const handleLogout = async () => {
		await dispatch(logoutUser()).unwrap();
		toaster.create({
			title: "Logged Out",
			description: "You have successfully logged out.",
			type: "success",
		});
		navigate("/auth");
	};

	return (
		<Box
			bg={bg}
			color={color}
			minH='calc(100vh - 64px)'
			py={8}>
			<VStack
				spaceY={8}
				mx='auto'
				maxW='lg'
				py={8}
				px={6}
				bg={useColorModeValue("white", "gray.700")}
				rounded='lg'
				boxShadow='lg'>
				<Heading fontSize='2xl'>Profile</Heading>
				<Text fontSize='lg'>Username: {user?.username}</Text>
				<Text fontSize='lg'>Email: {user?.email}</Text>
				<Button
					colorScheme='red'
					onClick={handleLogout}>
					Logout
				</Button>
			</VStack>
			<Toaster />
		</Box>
	);
};

export default Profile;
