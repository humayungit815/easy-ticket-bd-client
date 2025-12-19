import React, {useEffect, useRef, useState} from "react";
import {Link, NavLink} from "react-router";
import {FaHome} from "react-icons/fa";
import {IoLogOut, IoTicket} from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import {toast} from "react-toastify";
import {MdDashboardCustomize} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import {Ticket} from "lucide-react";

const Navbar = () => {
	const {user, logOut} = useAuth();

	const handleLogout = () => {
		logOut()
			.then(() => {
				toast.success("Log out successfully!");
			})
			.catch(() => {
				toast.error("an error happened");
			});
	};

	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	//Outside click handler
	useEffect(() => {
		const handleClickOutside = e => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	return (
		<div className="fixed top-0 left-0 w-full z-50">
			<nav className="navbar bg-white shadow-sm px-20">
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
							<li className="border-2 rounded-lg border-[#15803d] hover:bg-[#079d49] hover:text-white">
								<NavLink to="/">
									{" "}
									<FaHome /> Home
								</NavLink>
							</li>
							{user && (
								<li className="border-2 rounded-lg border-[#15803d] hover:bg-[#079d49] hover:text-white mx-4">
									<NavLink to="/all-tickets">
										{" "}
										<IoTicket /> All Tickets
									</NavLink>
								</li>
							)}
							{user && (
								<li className="border-2 rounded-lg border-[#15803d] hover:bg-[#079d49] hover:text-white">
									<NavLink to="/dashboard">
										{" "}
										<MdDashboardCustomize /> Dashboard
									</NavLink>
								</li>
							)}
						</ul>
					</div>
					<Link to="/">
						<div className="flex items-center gap-2 cursor-pointer">
							<div className="p-1.5 rounded-lg bg-[#079d49]">
								<Ticket className="text-white" size={24} />
							</div>
							<span className="text-2xl font-black tracking-tighter">
								Easy<span className="text-[#079d49]">-Ticket</span>
								<span className="text-gray-400 font-light">BD</span>
							</span>
						</div>
					</Link>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1 font-medium text-[#079d49]">
						<li className="border-2 rounded-lg border-[#15803d] hover:bg-[#079d49] hover:text-white">
							<NavLink to="/">
								{" "}
								<FaHome /> Home
							</NavLink>
						</li>
						{user && (
							<li className="border-2 rounded-lg border-[#15803d] hover:bg-[#079d49] hover:text-white mx-4">
								<NavLink to="/all-tickets">
									{" "}
									<IoTicket /> All Tickets
								</NavLink>
							</li>
						)}
						{user && (
							<li className="border-2 rounded-lg border-[#15803d] hover:bg-[#079d49] hover:text-white">
								<NavLink to="/dashboard">
									{" "}
									<MdDashboardCustomize /> Dashboard
								</NavLink>
							</li>
						)}
					</ul>
				</div>
				<div className="navbar-end flex gap-3">
					{user ? (
						<div ref={dropdownRef} className="relative">
							{/* Profile Button */}
							<button
								onClick={() => setOpen(!open)}
								className="flex items-center gap-3 focus:outline-none"
							>
								<div className="text-right hidden sm:block mx-3">
									<p className="font-semibold">Hi,</p>
									<p className="font-semibold text-gray-800">
										{user?.displayName}
									</p>
								</div>

								<img
									src={user?.photoURL}
									alt="User"
									className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
								/>
							</button>

							{/* Dropdown Menu */}
							{open && (
								<div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border z-50">
									<ul className="py-2 text-sm text-gray-700">
										<Link to="/dashboard/profile">
											<li className=" flex items-center gap-2 font-semibold px-4 py-2 hover:bg-gray-100 cursor-pointer">
												<CgProfile /> Profile
											</li>
										</Link>

										<button
											onClick={handleLogout}
											className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2 font-semibold"
										>
											<IoLogOut /> Logout
										</button>
									</ul>
								</div>
							)}
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
