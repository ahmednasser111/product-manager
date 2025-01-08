import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { useAppSelector } from "../app/hooks";
import { selectIsAuthenticated } from "../app/Slices/AuthSlice";

interface ProtectedRouteProps {
	children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const isAuth = useAppSelector(selectIsAuthenticated);

	if (!isAuth) {
		return <Navigate to="/auth" replace />;
	}
	return children;
};

export default ProtectedRoute;
