import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../../config/axios.config";
import { ProductFormData, Product } from "../../interfaces";
import Cookies from "universal-cookie";

const productApi = axiosInstance.defaults.baseURL + "/api";

interface Response<T> {
	data: T[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export const ProductApiSlice = createApi({
	reducerPath: "product-api",
	tagTypes: ["Products"],
	refetchOnReconnect: true,
	refetchOnFocus: true,
	refetchOnMountOrArgChange: true,
	baseQuery: fetchBaseQuery({
		baseUrl: productApi,
		prepareHeaders: (headers) => {
			const token = new Cookies().get("token");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getProducts: builder.query<Response<Product>, void>({
			query: () => "/products?populate=thumbnail&populate=categories",
			providesTags: ["Products"],
		}),
		getDashboardProductsPaginated: builder.query<
			Response<Product>,
			{ page?: number; pageSize?: number }
		>({
			query: ({ page = 1, pageSize = 10 }) =>
				`/products?populate=thumbnail&populate=categories&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
			providesTags: ["Products"],
		}),
		getProduct: builder.query({
			query: (id: string) => `/products/${id}?populate=thumbnail`,
		}),
		// delete a product with authentication
		deleteProduct: builder.mutation<void, string>({
			query: (id: string) => ({
				url: `/products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Products"],
		}),

		addProduct: builder.mutation<Product, { data: ProductFormData }>({
			query: (data) => ({
				url: "/products",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Products"],
		}),

		editProduct: builder.mutation<
			Product,
			{ documentId: string; data: Partial<Product> }
		>({
			query: ({ documentId, ...data }) => ({
				url: `/products/${documentId}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Products"],
		}),
	}),
});

// Export hooks for the endpoints
export const {
	useGetProductsQuery,
	useGetProductQuery,
	useGetDashboardProductsPaginatedQuery,
	useDeleteProductMutation,
	useEditProductMutation,
	useAddProductMutation,
} = ProductApiSlice;
