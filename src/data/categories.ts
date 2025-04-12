import { createListCollection } from "@chakra-ui/react";
import axiosInstance from "../config/axios.config";
import { Category } from "../interfaces";

// const categoriesCollection = createListCollection({
// 	items: [
// 		{ label: "Electronics", value: "electronics" },
// 		{ label: "Fashion", value: "fashion" },
// 		{ label: "Home & Kitchen", value: "home-kitchen" },
// 		{ label: "Beauty & Personal Care", value: "beauty-personal-care" },
// 		{ label: "Sports & Outdoors", value: "sports-outdoors" },
// 		{ label: "Toys & Games", value: "toys-games" },
// 		{ label: "Automotive", value: "automotive" },
// 		{ label: "Books", value: "books" },
// 		{ label: "Music", value: "music" },
// 		{ label: "Health & Wellness", value: "health-wellness" },
// 	],
// });

interface CategoryOption {
	label: string;
	value: string;
}

async function fetchCategories(): Promise<CategoryOption[]> {
	try {
		const response = await axiosInstance.get("/api/categories");
		return response.data.data.map((category: Category) => ({
			label: category.title,
			value: category.documentId,
		}));
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
}

const categoriesCollection = createListCollection<CategoryOption>({
	items: [],
});

// Initialize categories
fetchCategories().then((categories) => {
	categoriesCollection.items = categories;
});

export default categoriesCollection;
