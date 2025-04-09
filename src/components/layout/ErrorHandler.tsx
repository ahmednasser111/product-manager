import React from "react";
import { VStack, Text, Button } from "@chakra-ui/react";
import { AlertCircle } from "lucide-react";

interface ErrorHandlerProps {
	error: unknown;
	textColor?: string;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({
	error,
	textColor = "gray.500",
}) => {
	return (
		<VStack
			spaceY={4}
			align='center'
			justify='center'
			height='100vh'>
			<AlertCircle
				size={48}
				color='red'
			/>
			<Text
				fontSize='xl'
				fontWeight='bold'
				color='red.500'>
				Error loading products
			</Text>
			<Text color={textColor}>
				{error instanceof Error
					? error.message
					: "An unexpected error occurred. Please try again later."}
			</Text>
			<Button
				onClick={() => window.location.reload()}
				colorScheme='blue'>
				Retry
			</Button>
		</VStack>
	);
};

export default ErrorHandler;
