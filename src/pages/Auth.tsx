import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Box,
	Input,
	VStack,
	Heading,
	Text,
	Link,
	Fieldset,
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useColorModeValue } from "../components/ui/color-mode";
import { Field } from "../components/ui/field";
import { PasswordInput } from "../components/ui/password-input";
import { loginSchema, signupSchema } from "../validation";
import { useAppDispatch } from "../app/hooks";
import {
	loginUser,
	selectAuthError,
	selectAuthLoading,
	signupUser,
} from "../app/Slices/AuthSlice";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../components/ui/toaster";

interface FormData {
	email: string;
	password: string;
	username?: string;
	confirmPassword?: string;
}

export default function Auth() {
	const [isLogin, setIsLogin] = useState(true);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const isLoading = useSelector(selectAuthLoading);
	const authError = useSelector(selectAuthError);

	const bgColor = useColorModeValue("white", "black");
	const boxBgColor = useColorModeValue("white", "gray.900");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(isLogin ? loginSchema : signupSchema),
	});

	const onSubmit = async (data: FormData) => {
		try {
			if (isLogin) {
				await dispatch(
					loginUser({ identifier: data.email, password: data.password })
				).unwrap();

				toaster.create({
					title: "Sign In Successful",
					description: "You have successfully signed in.",
					type: "success",
				});
			} else {
				await dispatch(
					signupUser({
						email: data.email,
						username: data.username,
						password: data.password,
					})
				).unwrap();

				toaster.create({
					title: "Sign Up Successful",
					description: "Your account has been created successfully.",
					type: "success",
				});
			}
			setTimeout(() => navigate("/products"), 1000);
		} catch (err: any) {
			toaster.create({
				title: err.error,
				type: "error",
			});
		}
	};

	const toggleAuthMode = () => {
		setIsLogin(!isLogin);
		reset();
	};

	return (
		<Box bg={bgColor} minH="calc(100vh - 64px)">
			<VStack spaceY={8} mx="auto" maxW="lg" py={8} px={6}>
				<Heading fontSize={"4xl"}>{isLogin ? "Sign In" : "Sign Up"}</Heading>
				<Box rounded={"lg"} bg={boxBgColor} boxShadow={"lg"} p={8} w="full">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Fieldset.Root>
							<VStack spaceY={4}>
								<Field
									invalid={!!errors.email}
									label="Email Address"
									errorText={errors.email?.message}>
									<Input
										borderColor={errors.email ? "red.400" : "grey"}
										type="email"
										{...register("email")}
									/>
								</Field>
								{!isLogin && (
									<Field
										invalid={!!errors.username}
										label="User Name"
										errorText={errors.username?.message}>
										<Input
											borderColor={errors.username ? "red.400" : "grey"}
											type="text"
											{...register("username")}
										/>
									</Field>
								)}
								<Field
									invalid={!!errors.password}
									label="Password"
									errorText={errors.password?.message}>
									<PasswordInput
										borderColor={errors.password ? "red.400" : "grey"}
										type="password"
										{...register("password")}
									/>
								</Field>
								{!isLogin && (
									<Field
										invalid={!!errors.confirmPassword}
										label="Confirm Password"
										errorText={errors.confirmPassword?.message}>
										<PasswordInput
											borderColor={errors.confirmPassword ? "red.400" : "grey"}
											type="password"
											{...register("confirmPassword")}
										/>
									</Field>
								)}

								{authError && (
									<Text color="red.500" mt={2}>
										{authError.error}
									</Text>
								)}

								<Button
									type="submit"
									bg="blue.400"
									color={"white"}
									_hover={{
										bg: "blue.500",
									}}
									width="full"
									loading={isLoading}
									loadingText="Submitting...">
									{isLogin ? "Sign In" : "Sign Up"}
								</Button>
							</VStack>
						</Fieldset.Root>
					</form>
				</Box>
				<Text>
					{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
					<Link color="blue.400" onClick={toggleAuthMode}>
						{isLogin ? "Sign Up" : "Sign In"}
					</Link>
				</Text>
			</VStack>
			<Toaster />
		</Box>
	);
}
