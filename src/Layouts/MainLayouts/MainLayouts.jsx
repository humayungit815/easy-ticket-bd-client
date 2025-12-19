import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {Outlet} from "react-router";
import Footer from "../../components/Footer/Footer";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";

const MainLayouts = () => {
	const {loading} = useAuth();
	if (loading) {
		return <Loading></Loading>;
	}
	return (
		<div>
			<div>
				<Navbar></Navbar>
			</div>
			<Outlet></Outlet>
			<div>
				<Footer></Footer>
			</div>
		</div>
	);
};

export default MainLayouts;
