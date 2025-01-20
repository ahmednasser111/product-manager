import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../../config/axios.config";
import { Product } from "../../interfaces";

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
	baseQuery: fetchBaseQuery({ baseUrl: productApi }),
	endpoints: (builder) => ({
		getProducts: builder.query<Response<Product>, void>({
			query: () => "/products?populate=thumbnail&populate=categories",
		}),
		getDashboardProductsPaginated: builder.query<
			Response<Product>,
			{ page?: number; pageSize?: number }
		>({
			query: ({ page = 1, pageSize = 10 }) =>
				`/products?populate=thumbnail&populate=categories&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
		}),
		getProduct: builder.query<Product, string>({
			query: (id: string) => `/products/${id}?populate=thumbnail`,
		}),
	}),
});

// Export hooks for the endpoints
export const {
	useGetProductsQuery,
	useGetProductQuery,
	useGetDashboardProductsPaginatedQuery,
} = ProductApiSlice;
