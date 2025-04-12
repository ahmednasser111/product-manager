import { HStack, IconButton } from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import AlertDialog from "./ui/AlertDialog";
import {
	useDeleteProductMutation,
	useEditProductMutation,
} from "../app/Slices/products";
import { Product } from "../interfaces";
import { ProductFormDialog } from "./ui/ProductFormDialog";
import { toaster } from "./ui/toaster";

interface TableActionsProps {
	id: string;
	productData: Product;
}

const TableActions: React.FC<TableActionsProps> = ({ id, productData }) => {
	const [
		deleteProduct,
		{
			isLoading: isDeleteLoading,
			isError: isDeleteError,
			isSuccess: isDeleteSuccess,
		},
	] = useDeleteProductMutation();

	const [editProduct] = useEditProductMutation();

	const onDelete = (id: string) => {
		deleteProduct(id);
	};

	return (
		<>
			<HStack spaceX={2}>
				<Link
					to={`/products/${id}`}
					target='_blank'
					rel='noopener noreferrer'>
					<IconButton
						aria-label='Preview'
						variant='outline'
						colorScheme='blue'>
						<FaEye />
					</IconButton>
				</Link>
				<ProductFormDialog
					product={productData}
					trigger={
						<IconButton
							aria-label='Edit'
							variant='outline'
							colorScheme='yellow'>
							<FaEdit />
						</IconButton>
					}
					onSubmit={async (data: any) => {
						try {
							await editProduct({
								documentId: productData.documentId || "",
								data,
							}).unwrap();
							toaster.create({
								title: "Product Updated",
								description: "Product details have been successfully updated.",
								type: "success",
							});
						} catch (err: unknown) {
							toaster.create({
								title: "Update Failed",
								description:
									(err instanceof Error ? err.message : "Unable to update product. Please try again."),
								type: "error",
							});
						}
					}}
				/>

				<AlertDialog
					title='Are you sure?'
					description='This action cannot be undone. This will permanently delete your account and remove your data from our systems.'
					confirmLabel='Delete'
					cancelLabel='Cancel'
					onConfirm={() => onDelete(id)}
					isLoading={isDeleteLoading}
					isError={isDeleteError}
					isSuccess={isDeleteSuccess}>
					<IconButton
						aria-label='Delete'
						variant='outline'
						colorScheme='red'>
						<FaTrash />
					</IconButton>
				</AlertDialog>
			</HStack>
		</>
	);
};

export default TableActions;
