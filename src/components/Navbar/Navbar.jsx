import React from "react";
import {Link, NavLink} from "react-router";
import logo from "../../assets/logo.png";
import {FaBus, FaShip} from "react-icons/fa";
import {IoMdAirplane} from "react-icons/io";
import {FaTrainTram} from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import {toast} from "react-toastify";
import {MdDashboardCustomize} from "react-icons/md";

const Navbar = () => {
	const {user, logOut, loading} = useAuth();
	const link = (
		<>
			<li>
				<NavLink>
					{" "}
					<FaBus /> Bus
				</NavLink>
			</li>
			<li>
				<NavLink>
					{" "}
					<IoMdAirplane /> Air
				</NavLink>
			</li>
			<li>
				<NavLink>
					{" "}
					<FaTrainTram /> Train
				</NavLink>
			</li>
			<li>
				<NavLink>
					{" "}
					<FaShip /> Launch
				</NavLink>
			</li>
			<li>
				<NavLink to="/all-tickets">
					{" "}
					<FaShip /> All Tickets
				</NavLink>
			</li>
			<li>
				<NavLink to="/dashboard">
					{" "}
					<MdDashboardCustomize /> Dashboard
				</NavLink>
			</li>
		</>
	);

	const handleLogout = () => {
		logOut()
			.then(() => {
				toast.success("Log out successfully!");
			})
			.catch(() => {
				toast.error("an error happened");
			});
	};
	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<div>
			<nav className="navbar bg-base-100 shadow-sm px-25">
				<div className="navbar-start">
					<div className="dropdown">
						<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{" "}
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>{" "}
							</svg>
						</div>
						<ul
							tabIndex="-1"
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
						>
							{link}
						</ul>
					</div>
					<img className="h-[50px]" src={logo} alt="" />
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">{link}</ul>
				</div>
				<div className="navbar-end flex gap-3">
					{user ? (
						<div className="flex">
							<p>{user.displayName}</p>
							<img className="w-[40px] border" src={user.photoURL} alt="" />

							<button
								onClick={handleLogout}
								className="bg-[#079d49] text-white px-4 py-2 rounded-xl font-medium"
							>
								LogOut
							</button>
						</div>
					) : (
						<div className="flex gap-4">
							<Link to="/login">
								<button className="bg-[#079d49] text-white px-4 py-2 rounded-xl font-medium">
									Login
								</button>
							</Link>
							<Link to="/register">
								<button className="bg-[#079d49] text-white px-4 py-2 rounded-xl font-medium">
									Register
								</button>
							</Link>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
