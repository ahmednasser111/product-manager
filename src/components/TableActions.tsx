import { HStack, IconButton } from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface TableActionsProps {
	id: number;
	onPreview: (id: number) => void;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

const TableActions: React.FC<TableActionsProps> = ({
	id,
	onPreview,
	onEdit,
	onDelete,
}) => {
	return (
		<HStack spaceX={2}>
			<IconButton
				aria-label='Preview'
				onClick={() => onPreview(id)}
				variant='outline'
				colorScheme='blue'>
				<FaEye />
			</IconButton>
			<IconButton
				aria-label='Edit'
				onClick={() => onEdit(id)}
				variant='outline'
				colorScheme='yellow'>
				<FaEdit />
			</IconButton>
			<IconButton
				aria-label='Delete'
				onClick={() => onDelete(id)}
				variant='outline'
				colorScheme='red'>
				<FaTrash />
			</IconButton>
		</HStack>
	);
};

export default TableActions;
