import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const productApi = BASE_URL + "/api";

export const ProductApiSlice = createApi({
	reducerPath: "product-api",
	baseQuery: fetchBaseQuery({ baseUrl: productApi }),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => "/products?populate=thumbnail",
		}),
		getProduct: builder.query({
			query: (id: string) => `/products/${id}?populate=thumbnail`,
		}),
	}),
});

// Export hooks for the endpoints
export const { useGetProductsQuery, useGetProductQuery } = ProductApiSlice;
