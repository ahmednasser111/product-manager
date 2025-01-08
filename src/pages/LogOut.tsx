import React from "react";
import { logoutUser } from "../app/Slices/AuthSlice";
import { useAppDispatch } from "../app/hooks";
import Loading from "../components/layout/Loading";

const LogOut: React.FC = () => {
	const dispatch = useAppDispatch();

	dispatch(logoutUser()).then(() => {
		window.location.reload();
	});

	return <Loading />;
};

export default LogOut;
