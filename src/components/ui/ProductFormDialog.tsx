import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Product, ProductFormData } from "../../interfaces";
import { NumberInputField, NumberInputRoot } from "./number-input";
import { Toaster, toaster } from "./toaster";
import { Field } from "./field";
import { Button } from "./button";
import * as yup from "yup";
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
import {
	Fieldset,
	VStack,
	Input,
	Textarea,
	SelectContent,
	SelectValueText,
} from "@chakra-ui/react";
import { SelectItem, SelectRoot, SelectTrigger } from "./select";
import categoriesCollection from "../../data/categories";
import { HiUpload } from "react-icons/hi";
import {
	FileUploadList,
	FileUploadRoot,
	FileUploadTrigger,
} from "./file-upload";
import axiosInstance from "../../config/axios.config";
import Cookies from "universal-cookie";

// // Cloudinary configuration (hardcoded for now; consider fetching from Strapi)
// const CLOUDINARY_CLOUD_NAME = "dfp91pztp"; // Replace with your Cloudinary cloud name
// const CLOUDINARY_UPLOAD_PRESET = "ml_default"; // Replace with your upload preset

// // Create a separate Axios instance for Cloudinary since it has a different base URL
// const cloudinaryAxios = axios.create({
// 	baseURL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`,
// 	timeout: 5000, // Cloudinary uploads might take longer
// });

// async function uploadImageToCloudnary(file: File): Promise<string> {
// 	const formData = new FormData();
// 	formData.append("file", file);
// 	formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

// 	try {
// 		const response = await cloudinaryAxios.post("/image/upload", formData, {
// 			headers: {
// 				"Content-Type": "multipart/form-data",
// 			},
// 		});
// 		return response.data.secure_url;
// 	} catch (error : any) {
// 		throw new Error("Failed to upload image to Cloudinary: " + error.message);
// 	}
// }
const uploadImageToStrapi = async (file: File) => {
	const formData = new FormData();
	formData.append("files", file);
	const token = new Cookies().get("token");
	if (!token) {
		throw new Error("No authentication token found");
	}

	const response = await axiosInstance.post("/api/upload", formData, {
		headers: {
			Authorization: `Bearer ${token}`, 
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data[0]; // returns the uploaded media object
};


interface ProductFormDialogProps {
	product?: Partial<Product>;
	trigger: React.ReactElement;
	onSubmit: (data: ProductFormData) => Promise<void>;
}

export function ProductFormDialog({
	product = {},
	trigger,
	onSubmit,
}: ProductFormDialogProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// Define the schema dynamically based on whether we're editing or adding
	const schema = yup.object().shape({
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
		categories: yup
			.array()
			.of(yup.string().required("Category is required"))
			.min(1, "At least one category is required")
			.required("Categories are required"),
		thumbnail: product.documentId
			? yup
					.mixed<File>()
					.test(
						"fileType",
						"Thumbnail must be a file",
						(value) => !value || value instanceof File
					)
					.optional()
			: yup
					.mixed<File>()
					.test(
						"fileType",
						"Thumbnail must be a file",
						(value) => value instanceof File
					)
					.required("Thumbnail is required"),
	});

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ProductFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			title: product.title || "New Product",
			price: product.price || 0,
			stock: product.stock || 0,
			description: product.description || "",
			categories:
				product.categories?.map((category) => category.documentId) || [],
		},
	});

	const handleFormSubmit = async (data: ProductFormData) => {
		setIsLoading(true);
		try {
			let uploadedMedia;

			if (data.thumbnail instanceof File) {
				uploadedMedia = await uploadImageToStrapi(data.thumbnail);
			} else if (product.thumbnail && product.documentId) {
				uploadedMedia = product.thumbnail;
			} else {
				throw new Error("Thumbnail is required for new products");
			}

			const updatedData = {
				...data,
				thumbnail: uploadedMedia.id,
			};

			await onSubmit(updatedData);

			toaster.create({
				title: "Success",
				description: "Product details have been successfully saved.",
				type: "success",
			});
			setIsOpen(false);
			reset();
		} catch (err: any) {
			toaster.create({
				title: "Operation Failed",
				description: err.message || "Unable to save product. Please try again.",
				type: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!isOpen) {
			reset();
		}
	}, [isOpen, reset]);

	return (
		<DialogRoot
			open={isOpen}
			onOpenChange={(e) => setIsOpen(e.open)}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<DialogHeader>
						<DialogTitle>
							{product.documentId ? "Edit Product" : "Add Product"}
						</DialogTitle>
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
												onValueChange={({ value }) => field.onChange(value)}>
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
												onValueChange={({ value }) => field.onChange(value)}>
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
								<Field
									invalid={!!errors.categories}
									label='Categories'
									errorText={errors.categories?.message}>
									<Controller
										control={control}
										name='categories'
										render={({ field }) => (
											<SelectRoot
												multiple
												collection={categoriesCollection}
												size='sm'
												width='320px'
												value={field.value}
												onValueChange={({ value }) => field.onChange(value)}
												onInteractOutside={() => field.onBlur()}>
												<SelectTrigger>
													<SelectValueText placeholder='select categories' />
												</SelectTrigger>
												<SelectContent>
													{categoriesCollection.items.map((category) => (
														<SelectItem
															item={category}
															key={category.value}>
															{category.label}
														</SelectItem>
													))}
												</SelectContent>
											</SelectRoot>
										)}
									/>
								</Field>
								<Field
									invalid={!!errors.thumbnail}
									label='Thumbnail'
									errorText={errors.thumbnail?.message?.toString()}>
									<Controller
										name='thumbnail'
										control={control}
										render={({ field }) => (
											<FileUploadRoot
												maxW='xl'
												maxFileSize={5242880}
												maxFiles={1}
												accept={["image/jpeg", "image/png"]}
												alignItems='stretch'
												onFileChange={(file) =>
													field.onChange(file.acceptedFiles[0])
												}>
												<FileUploadTrigger asChild>
													<Button
														variant='outline'
														size='sm'>
														<HiUpload /> Upload file
													</Button>
												</FileUploadTrigger>
												<FileUploadList />
											</FileUploadRoot>
										)}
									/>
								</Field>
							</VStack>
						</Fieldset.Root>
					</DialogBody>

					<DialogFooter>
						<DialogActionTrigger asChild>
							<Button
								variant='outline'
								onClick={() => reset()}>
								Cancel
							</Button>
						</DialogActionTrigger>
						<Button
							type='submit'
							colorPalette='blue'
							disabled={isLoading}
							loading={isLoading}>
							{product.documentId ? "Update Product" : "Add Product"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
			<Toaster />
		</DialogRoot>
	);
}
