import {
	Box,
	Container,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "../components/ui/color-mode";

export default function HomePage() {
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const textColor = useColorModeValue("gray.600", "gray.200");
	const headingColor = useColorModeValue("gray.800", "white");
	const whiteOrGray800 = useColorModeValue("white", "gray.800"); //Added this line

	return (
		<Box
			bg={bgColor}
			minH='calc(100vh - 64px)'>
			<Container
				maxW='container.xl'
				pt={20}>
				<Stack
					direction={{ base: "column", md: "row" }}
					alignItems='center'
					spaceX={12}>
					<Box flex={1}>
						<Heading
							as='h1'
							size='2xl'
							color={headingColor}
							mb={6}
							lineHeight='shorter'>
							Streamline Your Product Management Process
						</Heading>
						<Text
							fontSize='xl'
							color={textColor}
							mb={8}>
							Empower your team with our intuitive product management tools.
							From ideation to launch, we've got you covered every step of the
							way.
						</Text>
						<Stack
							direction={{ base: "column", sm: "row" }}
							spaceX={4}>
							<Link
								to='/auth'
								style={{
									padding: "12px 24px",
									backgroundColor: "#3182ce",
									color: "white",
									textDecoration: "none",
									borderRadius: "6px",
									fontWeight: "bold",
									marginRight: "16px",
								}}>
								Get Started
							</Link>
						</Stack>
					</Box>
					<Flex
						flex={1}
						justify='center'>
						<Image
							src='/product-manager-hero.jpg'
							alt='Product Manager Dashboard'
							maxW='100%'
							rounded='md'
							shadow='2xl'
						/>
					</Flex>
				</Stack>
			</Container>

			<Box
				mt={20}
				py={16}
				bg={whiteOrGray800}>
				{" "}
				{/* Changed this line */}
				<Container maxW='container.xl'>
					<Heading
						as='h2'
						size='xl'
						textAlign='center'
						mb={12}
						color={headingColor}>
						Key Features
					</Heading>
					<Stack
						direction={{ base: "column", md: "row" }}
						spaceX={8}
						justify='center'>
						{[
							{
								title: "Roadmap Planning",
								description:
									"Visualize your product strategy and align your team with interactive roadmaps.",
								icon: "🗺️",
							},
							{
								title: "Task Management",
								description:
									"Keep track of all your tasks and deadlines in one centralized location.",
								icon: "✅",
							},
							{
								title: "Collaboration Tools",
								description:
									"Foster teamwork with real-time communication and file sharing capabilities.",
								icon: "👥",
							},
						].map((feature, index) => (
							<Box
								key={index}
								bg={useColorModeValue("white", "gray.700")}
								p={6}
								rounded='lg'
								shadow='md'
								textAlign='center'
								flex={1}>
								<Text
									fontSize='4xl'
									mb={4}>
									{feature.icon}
								</Text>
								<Heading
									as='h3'
									size='md'
									mb={4}
									color={headingColor}>
									{feature.title}
								</Heading>
								<Text color={textColor}>{feature.description}</Text>
							</Box>
						))}
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}
