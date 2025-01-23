import { Product } from "../../interfaces";
import { useGetDashboardProductsPaginatedQuery } from "../../app/Slices/products";
import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from "../../components/ui/pagination";
import { Heading, HStack, Stack, Table } from "@chakra-ui/react";
import axiosInstance from "../../config/axios.config";
import DashboardProductSkeleton from "../../components/DashboardProductSkeleton";
import { useState } from "react";
import TableActions from "../../components/TableActions";

const DashBoardProducts = () => {
	const [page, setPage] = useState(1);

	const { data, isLoading, isError } = useGetDashboardProductsPaginatedQuery({
		page,
		pageSize: 5,
	});

	if (isLoading) return <DashboardProductSkeleton />;
	if (isError) return <div>Error loading products</div>;

	const products = data?.data;

	return (
		<div>
			<Stack
				width='full'
				gap='5'>
				<Heading size='xl'>Products</Heading>
				<Table.Root
					size='lg'
					variant='outline'
					borderRadius='md'
					borderWidth={1}>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>ID</Table.ColumnHeader>
							<Table.ColumnHeader>Title</Table.ColumnHeader>
							<Table.ColumnHeader>Price</Table.ColumnHeader>
							<Table.ColumnHeader>Image</Table.ColumnHeader>
							<Table.ColumnHeader>Stock</Table.ColumnHeader>
							<Table.ColumnHeader>Description</Table.ColumnHeader>
							<Table.ColumnHeader>Categories</Table.ColumnHeader>
							<Table.ColumnHeader>Action</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{products?.map((product: Product) => (
							<Table.Row key={product.id}>
								<Table.Cell>{product.id}</Table.Cell>
								<Table.Cell>{product.title}</Table.Cell>
								<Table.Cell>${product.price.toFixed(2)}</Table.Cell>
								<Table.Cell>
									<img
										src={`${axiosInstance.defaults.baseURL}${product.thumbnail.formats.small.url}`}
										alt={product.title}
										width='50'
									/>
								</Table.Cell>
								<Table.Cell>{product.stock}</Table.Cell>
								<Table.Cell>{product.description}</Table.Cell>
								<Table.Cell>
									{product.categories
										.map((category) => category.title)
										.join(", ")}
								</Table.Cell>
								<Table.Cell>
									<TableActions id={product.documentId} />
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>ID</Table.ColumnHeader>
							<Table.ColumnHeader>Title</Table.ColumnHeader>
							<Table.ColumnHeader>Price</Table.ColumnHeader>
							<Table.ColumnHeader>Image</Table.ColumnHeader>
							<Table.ColumnHeader>Stock</Table.ColumnHeader>
							<Table.ColumnHeader>Description</Table.ColumnHeader>
							<Table.ColumnHeader>Categories</Table.ColumnHeader>
							<Table.ColumnHeader>Action</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
				</Table.Root>

				<PaginationRoot
					count={data?.meta.pagination.total || 0}
					pageSize={data?.meta.pagination.pageSize || 10}
					page={page}
					defaultPage={1}
					onPageChange={(e) => setPage(e.page)}>
					<HStack wrap='wrap'>
						<PaginationPrevTrigger />
						<PaginationItems />
						<PaginationNextTrigger />
					</HStack>
				</PaginationRoot>
			</Stack>
		</div>
	);
};

export default DashBoardProducts;
