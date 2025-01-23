import { DialogCloseTrigger } from "@chakra-ui/react";
import {
	DialogActionTrigger,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from "./dialog";
import { ReactNode } from "react";
import { Button } from "./button";

interface IProps {
	title?: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm: () => void;
	children: ReactNode;
	isLoading?: boolean;
	isError?: boolean;
	isSuccess?: boolean;
}
function AlertDialog({
	title = "Are you sure?",
	description = "",
	confirmLabel = "Delete",
	cancelLabel = "Cancel",
	onConfirm,
	children,
	isError,
	isLoading,
	isSuccess,
}: IProps) {
	if (isSuccess) {
		return <p>Action completed successfully!</p>; // Example success state
	}

	return (
		<DialogRoot role='alertdialog'>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogHeader>
					<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
				</DialogHeader>
				<DialogBody>
					{description && <p id='alert-dialog-description'>{description}</p>}
				</DialogBody>
				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button variant='outline'>{cancelLabel}</Button>
					</DialogActionTrigger>
					<DialogCloseTrigger>
						<Button
							colorPalette='red'
							onClick={onConfirm}
							disabled={isLoading}
							loading={isLoading}>
							{confirmLabel}
						</Button>
					</DialogCloseTrigger>
				</DialogFooter>
			</DialogContent>
		</DialogRoot>
	);
}
export default AlertDialog;
