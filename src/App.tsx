import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";
import NotFound from "./components/layout/NotFound";
import React from "react";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/layout/Loading";
import LogOut from "./pages/LogOut";
import Cart from "./pages/Cart";
import { useAppSelector } from "./app/hooks";
import { selectIsAuthenticated } from "./app/Slices/AuthSlice";
import DashBoard from "./pages/dashboard/DashBoard";

const Home = React.lazy(() => import("./pages/Home"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Profile = React.lazy(() => import("./pages/Profile"));

function App() {
	const isAuth = useAppSelector(selectIsAuthenticated);
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				{/* Public Route for Authentication */}
				<Route
					path='/auth'
					element={
						!isAuth ? (
							<Auth />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>

				<Route
					path='/logout'
					element={
						<ProtectedRoute>
							<LogOut />
						</ProtectedRoute>
					}
				/>

				<Route element={<AppLayout />}>
					<Route
						path='/'
						element={<Home />}
					/>
				</Route>
				{/* Protected Routes */}
				<Route element={<AppLayout />}>
					<Route
						path='/products'
						element={
							<ProtectedRoute>
								<Products />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/products/:id'
						element={
							<ProtectedRoute>
								<ProductDetails />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/cart'
						element={
							<ProtectedRoute>
								<Cart />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Route>

				<Route
					path='/dashboard'
					element={<AppLayout />}>
					<Route
						index
						element={
							<ProtectedRoute>
								<DashBoard />
							</ProtectedRoute>
						}
					/>
				</Route>

				{/* Catch-All Route */}
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</Suspense>
	);
}

export default App;
