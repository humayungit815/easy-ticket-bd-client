import {createBrowserRouter} from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import Home from "../components/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../components/Dashboard/Dashboard";
import AddTickets from "../components/Dashboard/Vendor/AddTickets";
import MyAddedTickets from "../components/Dashboard/Vendor/MyAddedTickets";
import Profile from "../components/Dashboard/Common/Profile";
import ManageTickets from "../components/Dashboard/AdminMenu/ManageTickets";
import AllTickets from "../Pages/AllTickets/AllTickets";

const router = createBrowserRouter([
	{
		path: "/",
		Component: MainLayouts,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "login",
				Component: Login,
			},
			{
				path: "register",
				Component: Register,
			},
			{
				path: "all-tickets",
				Component: AllTickets,
			},
		],
	},
	{
		path: "dashboard",
		Component: Dashboard,
		children: [
			{
				path: "add-tickets",
				Component: AddTickets,
			},
			{
				path: "my-added-tickets",
				Component: MyAddedTickets,
			},
			{
				path: "profile",
				Component: Profile,
			},
			{
				path: "manage-tickets",
				Component: ManageTickets,
			},
		],
	},
]);

export default router;
