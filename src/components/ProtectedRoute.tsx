import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ReactElement } from "react";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
	const token = new Cookies().get("token");

	if (!token) {
		return <Navigate to="/auth" replace />;
	}
	return children;
};

export default ProtectedRoute;
