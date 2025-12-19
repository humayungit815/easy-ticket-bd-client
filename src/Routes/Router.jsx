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
import TicketDetails from "../Pages/TicketDetails/TicketDetails";
import MyBookedTickets from "../components/Dashboard/UserMenu/MyBookedTickets";
import RequestedBookings from "../components/Dashboard/VendorMenu/RequestedBookings";
import PaymentSuccess from "../Pages/payment/PaymentSuccess";
import TransactionHistory from "../components/Dashboard/UserMenu/TransactionHistory";
import VendorRevenue from "../components/Dashboard/VendorMenu/VendorRevenue";
import AdminManageUsers from "../components/Dashboard/AdminMenu/AdminManageUsers";
import AdminAdvertise from "../components/Dashboard/AdminMenu/AdminAdvertise";
import PrivateRoute from "./PrivateRoute";
import UpdateTicket from "../components/Dashboard/VendorMenu/UpdateTicket";
import ErrorPage from "../components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <ErrorPage></ErrorPage>,
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
				element: (
					<PrivateRoute>
						<AllTickets></AllTickets>
					</PrivateRoute>
				),
			},
			{
				path: "tickets/:id",
				Component: TicketDetails,
			},
		],
	},
	{
		path: "dashboard",
		element: (
			<PrivateRoute>
				<Dashboard></Dashboard>
			</PrivateRoute>
		),
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
			{
				path: "my-booked-tickets",
				Component: MyBookedTickets,
			},
			{
				path: "requested-bookings",
				Component: RequestedBookings,
			},
			{
				path: "payment-success",
				Component: PaymentSuccess,
			},
			{
				path: "transaction-history",
				Component: TransactionHistory,
			},
			{
				path: "vendor-revenue",
				Component: VendorRevenue,
			},
			{
				path: "manage-users",
				Component: AdminManageUsers,
			},
			{
				path: "admin-advertise",
				Component: AdminAdvertise,
			},
			{
				path: "update-ticket/:id",
				Component: UpdateTicket,
			},
		],
	},
]);

export default router;
