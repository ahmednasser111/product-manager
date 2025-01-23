import { HStack, IconButton } from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import AlertDialog from "./ui/AlertDialog";
import { useDeleteProductMutation } from "../app/Slices/products";

interface TableActionsProps {
	id: string;
}

const TableActions: React.FC<TableActionsProps> = ({ id }) => {
	const [
		deleteProduct,
		{
			isLoading: isDeleteLoading,
			isError: isDeleteError,
			isSuccess: isDeleteSuccess,
		},
	] = useDeleteProductMutation();

	function onEdit(id: string): void {
		throw new Error("Function not implemented.");
	}

	const onDelete = (id: string) => {
		deleteProduct(id);
	};
	return (
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
			<IconButton
				aria-label='Edit'
				onClick={() => onEdit(id)}
				variant='outline'
				colorScheme='yellow'>
				<FaEdit />
			</IconButton>
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
	);
};

export default TableActions;
