import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductApiSlice = createApi({
	reducerPath: "product-api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => "/products?populate=thumbnail",
		}),
	}),
});

// Export hooks for the endpoints
export const { useGetProductsQuery } = ProductApiSlice;
