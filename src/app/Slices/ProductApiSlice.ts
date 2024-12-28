import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../../config/axios.config";

const productApi = axiosInstance.defaults.baseURL + "/api";

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
