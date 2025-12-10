import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {Outlet} from "react-router";
import Footer from "../../components/Footer/Footer";

const MainLayouts = () => {
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
