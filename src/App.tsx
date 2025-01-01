import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import NavBar from "./components/layout/NavBar";
import Auth from "./pages/Auth";
import NotFound from "./components/layout/NotFound";

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/products/:id" element={<ProductDetails />} />

				<Route path="/auth" element={<Auth />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
