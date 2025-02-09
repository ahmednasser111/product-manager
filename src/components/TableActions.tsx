import { HStack, IconButton } from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import AlertDialog from "./ui/AlertDialog";
import { useDeleteProductMutation } from "../app/Slices/products";
import ProductEditForm from "./ui/ProductEditModal";
import { Product } from "../interfaces";

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
				<ProductEditForm
					product={productData}
					trigger={
						<IconButton
							aria-label='Edit'
							variant='outline'
							colorScheme='yellow'>
							<FaEdit />
						</IconButton>
					}
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
