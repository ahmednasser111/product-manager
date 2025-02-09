import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input, VStack, Fieldset, Textarea } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Product } from "../../interfaces";
import { Field } from "./field";
import { NumberInputField, NumberInputRoot } from "./number-input";
import { Button } from "./button";
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
import { Toaster, toaster } from "./toaster";
import { useEditProductMutation } from "../../app/Slices/products";

// Define validation schema
const productEditSchema = yup.object().shape({
	title: yup.string().required("Product title is required"),
	price: yup
		.number()
		.positive("Price must be a positive number")
		.required("Price is required"),
	stock: yup
		.number()
		.integer("Stock must be a whole number")
		.min(0, "Stock cannot be negative")
		.required("Stock is required"),
	description: yup.string().optional(),
});

interface EditFormData {
	title: string;
	price: number;
	stock: number;
	description?: string;
}

interface ProductEditDialogProps {
	product: Product;
	trigger: React.ReactElement;
}

export default function ProductEditDialog({
	product,
	trigger,
}: ProductEditDialogProps) {
	const [editProduct] = useEditProductMutation();
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditFormData>({
		resolver: yupResolver(productEditSchema),
		defaultValues: {
			title: product.title,
			price: product.price,
			stock: product.stock,
			description: product.description,
		},
	});

	const handleFormSubmit = async (data: EditFormData) => {
		setIsLoading(true);
		try {
			// console.log({ data: { ...product, ...data } });
			await editProduct({
				documentId: product.documentId,
				data,
			}).unwrap();
			toaster.create({
				title: "Product Updated",
				description: "Product details have been successfully updated.",
				type: "success",
			});
			setIsOpen(false);
		} catch (err: any) {
			toaster.create({
				title: "Update Failed",
				description:
					err.message || "Unable to update product. Please try again.",
				type: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DialogRoot
			open={isOpen}
			onOpenChange={(e) => setIsOpen(e.open)}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<DialogHeader>
						<DialogTitle>Edit Product</DialogTitle>
					</DialogHeader>

					<DialogBody>
						<Fieldset.Root>
							<VStack spaceY={4}>
								<Field
									invalid={!!errors.title}
									label='Product Title'
									errorText={errors.title?.message}>
									<Input
										borderColor={errors.title ? "red.400" : "grey"}
										{...register("title")}
									/>
								</Field>

								<Field
									invalid={!!errors.price}
									label='Price'
									errorText={errors.price?.message}>
									<Controller
										name='price'
										control={control}
										render={({ field }) => (
											<NumberInputRoot
												disabled={field.disabled}
												name={field.name}
												value={field.value.toString()}
												onValueChange={({ value }) => {
													field.onChange(value);
												}}>
												<NumberInputField onBlur={field.onBlur} />
											</NumberInputRoot>
										)}
									/>
								</Field>

								<Field
									invalid={!!errors.stock}
									label='Stock'
									errorText={errors.stock?.message}>
									<Controller
										name='stock'
										control={control}
										render={({ field }) => (
											<NumberInputRoot
												disabled={field.disabled}
												name={field.name}
												value={field.value.toString()}
												onValueChange={({ value }) => {
													field.onChange(value);
												}}>
												<NumberInputField onBlur={field.onBlur} />
											</NumberInputRoot>
										)}
									/>
								</Field>

								<Field
									label='Description'
									invalid={!!errors.description}
									errorText={errors.description?.message}>
									<Textarea
										{...register("description")}
										borderColor={errors.description ? "red.400" : "grey"}
									/>
								</Field>
							</VStack>
						</Fieldset.Root>
					</DialogBody>

					<DialogFooter>
						<DialogActionTrigger asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogActionTrigger>
						<Button
							type='submit'
							colorPalette='blue'
							disabled={isLoading}
							loading={isLoading}>
							Update Product
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>

			<Toaster />
		</DialogRoot>
	);
}
