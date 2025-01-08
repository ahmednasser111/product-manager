import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import Cookies from "universal-cookie";

interface ProtectedRouteProps {
	children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const cookies = new Cookies();
	const isAuth = cookies.get("token");

	if (!isAuth) {
		return <Navigate to="/auth" replace />;
	}
	return children;
};

export default ProtectedRoute;
