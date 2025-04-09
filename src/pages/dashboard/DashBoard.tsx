// TODO: sorting products
import { useState } from "react";
import type { Product, ProductFormData } from "../../interfaces";
import {
	useAddProductMutation,
	useGetDashboardProductsPaginatedQuery,
} from "../../app/Slices/products";
import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from "../../components/ui/pagination";
import {
	HStack,
	Text,
	VStack,
	Box,
	Image,
	Flex,
	Table,
} from "@chakra-ui/react";
import axiosInstance from "../../config/axios.config";
import DashboardProductSkeleton from "../../components/DashboardProductSkeleton";
import TableActions from "../../components/TableActions";
import {
	NativeSelectField,
	NativeSelectRoot,
} from "../../components/ui/native-select";
import { Button } from "../../components/ui/button";
import { toaster } from "../../components/ui/toaster";
import { ProductFormDialog } from "../../components/ui/ProductFormDialog";
import { Plus } from "lucide-react";
import { useColorModeValue } from "../../components/ui/color-mode";
import ErrorHandler from "../../components/layout/ErrorHandler";

const DashBoard = () => {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [addProduct] = useAddProductMutation();

	const { data, isLoading, isError, error } =
		useGetDashboardProductsPaginatedQuery({
			page,
			pageSize,
		});

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.800", "white");

	if (isLoading) return <DashboardProductSkeleton />;
	if (isError) return <ErrorHandler error={error} />;

	const products = data?.data;

	const handleAddProduct = async (product: ProductFormData) => {
		try {
			await addProduct({ data: product }).unwrap();
			toaster.create({
				title: "Success",
				description: "Product added successfully.",
				type: "success",
			});
		} catch (error) {
			toaster.create({
				title: "Error",
				description:
					error instanceof Error
						? error.message
						: "Failed to add product. Please try again.",
				type: "error",
			});
		}
	};

	return (
		<Box p={4}>
			<VStack
				spaceX={6}
				align='stretch'>
				<Flex
					justifyContent='space-between'
					alignItems='center'>
					<HStack spaceX={4}>
						<Text>Items per page:</Text>
						<NativeSelectRoot
							size='sm'
							width='fit-content'
							bg={bgColor}
							color={textColor}
							borderColor={borderColor}>
							<NativeSelectField
								value={pageSize.toString()}
								onChange={(e) => setPageSize(Number(e.target.value))}
								bg={bgColor}
								color={textColor}
								borderColor={borderColor}>
								<option value='5'>5</option>
								<option value='10'>10</option>
								<option value='20'>20</option>
							</NativeSelectField>
						</NativeSelectRoot>
					</HStack>
					<ProductFormDialog
						trigger={
							<Button colorScheme='blue'>
								<Plus size={16} />
								Add Product
							</Button>
						}
						onSubmit={handleAddProduct}
					/>
				</Flex>

				<Box overflowX='auto'>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								{[
									"ID",
									"Title",
									"Price",
									"Image",
									"Stock",
									"Description",
									"Categories",
									"Action",
								].map((header) => (
									<Table.ColumnHeader key={header}>{header}</Table.ColumnHeader>
								))}
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{products?.map((product: Product) => (
								<Table.Row key={product.id}>
									<Table.Cell>{product.id}</Table.Cell>
									<Table.Cell>{product.title}</Table.Cell>
									<Table.Cell>${product.price.toFixed(2)}</Table.Cell>
									<Table.Cell>
										<Image
											src={
												product.thumbnail?.formats?.small?.url
													? `${axiosInstance.defaults.baseURL}${product.thumbnail.formats.small.url}`
													: "/product-placeholder.png"
											}
											alt={product.title}
											boxSize='50px'
											objectFit='cover'
											borderRadius='md'
										/>
									</Table.Cell>
									<Table.Cell>{product.stock}</Table.Cell>
									<Table.Cell className='max-w-xs truncate'>
										{product.description}
									</Table.Cell>
									<Table.Cell>
										{product.categories
											.map((category) => category.title)
											.join(", ")}
									</Table.Cell>
									<Table.Cell>
										<TableActions
											id={product.documentId}
											productData={product}
										/>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>
				</Box>

				<PaginationRoot
					count={data?.meta.pagination.total || 0}
					pageSize={pageSize}
					page={page}
					defaultPage={1}
					onPageChange={(e) => setPage(e.page)}
					m='auto'>
					<HStack
						spaceX={2}
						justify='center'
						wrap='wrap'>
						<PaginationPrevTrigger />
						<PaginationItems />
						<PaginationNextTrigger />
					</HStack>
				</PaginationRoot>
			</VStack>
		</Box>
	);
};

export default DashBoard;
