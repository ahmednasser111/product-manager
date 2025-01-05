import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import NotFound from "./components/layout/NotFound";
import React from "react";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/layout/Loading";

const Home = React.lazy(() => import("./pages/Home"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const Auth = React.lazy(() => import("./pages/Auth"));

function App() {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route path="/auth" element={<Auth />} />

				<Route element={<AppLayout />}>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/products"
						element={
							<ProtectedRoute>
								<Products />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/products/:id"
						element={
							<ProtectedRoute>
								<ProductDetails />
							</ProtectedRoute>
						}
					/>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
}

export default App;
