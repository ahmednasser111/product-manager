export interface Product {
	id: string;
	documentId: string;
	title: string;
	price: number;
	stock: number;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	description: string;
	thumbnail: Thumbnail;
	categories: Category[];
}
export interface Category {
	id: number;
	documentId: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}
export interface Thumbnail {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: Formats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: string | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface Formats {
	thumbnail: FormatDetails;
	large: FormatDetails;
	medium: FormatDetails;
	small: FormatDetails;
}

export interface FormatDetails {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
}
