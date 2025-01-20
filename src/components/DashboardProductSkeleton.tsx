import { Stack, Heading, Table, HStack, Skeleton, Box } from "@chakra-ui/react";
import { SkeletonCircle } from "./ui/skeleton";

const DashboardProductSkeleton = () => {
	// Generate array for skeleton rows
	const skeletonRows = Array(5).fill(0);

	return (
		<div>
			<Stack
				width='full'
				gap='5'>
				<Heading size='xl'>Products</Heading>

				<Box
					borderWidth={1}
					borderRadius='md'>
					<Table.Root size='lg'>
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
							{skeletonRows.map((_, index) => (
								<Table.Row key={index}>
									<Table.Cell>
										<Skeleton height='20px' />
									</Table.Cell>
									<Table.Cell>
										<Skeleton height='20px' />
									</Table.Cell>
									<Table.Cell>
										<Skeleton height='20px' />
									</Table.Cell>
									<Table.Cell>
										<SkeletonCircle size='50px' />
									</Table.Cell>
									<Table.Cell>
										<Skeleton height='20px' />
									</Table.Cell>
									<Table.Cell>
										<Skeleton height='20px' />
									</Table.Cell>
									<Table.Cell>
										<Skeleton height='20px' />
									</Table.Cell>
									<Table.Cell>
										<HStack spaceX={2}>
											<Skeleton
												height='32px'
												width='32px'
												borderRadius='md'
											/>
											<Skeleton
												height='32px'
												width='32px'
												borderRadius='md'
											/>
											<Skeleton
												height='32px'
												width='32px'
												borderRadius='md'
											/>
										</HStack>
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
				</Box>

				<HStack
					justify='center'
					spaceX={2}
					py={4}>
					<Skeleton
						height='32px'
						width='32px'
						borderRadius='md'
					/>
					<Skeleton
						height='32px'
						width='200px'
						borderRadius='md'
					/>
					<Skeleton
						height='32px'
						width='32px'
						borderRadius='md'
					/>
				</HStack>
			</Stack>
		</div>
	);
};

export default DashboardProductSkeleton;
