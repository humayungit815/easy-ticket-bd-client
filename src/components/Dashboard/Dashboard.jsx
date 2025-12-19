import React, {useState} from "react";
import {Link, Outlet} from "react-router";
import useRole from "../../hooks/useRole";
import AdminMenu from "./AdminMenu/AdminMenu";
import VendorMenu from "./VendorMenu/VendorMenu";
import UserMenu from "./UserMenu/UserMenu";
import useAuth from "../../hooks/useAuth";
import {LayoutDashboard, LogOut, Bell, Menu, X} from "lucide-react";
import Loading from "../Loading/Loading";

const Dashboard = () => {
	const [role, isRoleLoading] = useRole();
	const {user, logOut} = useAuth();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile state
	const brandGreen = "#079d49";

	if (isRoleLoading) {
		return <Loading></Loading>;
	}

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<div className="bg-[#f4f7f6] font-sans antialiased min-h-screen relative">
			{/* 1. Mobile Overlay (Blur effect when sidebar is open) */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
					onClick={toggleSidebar}
				></div>
			)}

			<div className="flex h-screen overflow-hidden p-0 md:p-6 gap-6">
				{/* 2. Sidebar - Updated for Responsiveness */}
				<aside
					className={`
                    fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white shadow-2xl transition-transform duration-300 transform
                    lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:rounded-[2.5rem] lg:z-auto
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
				>
					{/* Brand Logo & Close Button (Mobile Only) */}
					<div className="p-8 pb-10 flex items-center justify-between">
						<Link to="/" className="flex items-center gap-2 group">
							<div className="w-10 h-10 rounded-xl bg-[#079d49] flex items-center justify-center">
								<LayoutDashboard size={20} className="text-white" />
							</div>
							<span className="text-2xl font-black tracking-tighter">
								Easy<span style={{color: brandGreen}}>Ticket</span>
							</span>
						</Link>
						{/* Close button for mobile */}
						<button
							onClick={toggleSidebar}
							className="lg:hidden p-2 text-gray-400 hover:text-white"
						>
							<X size={24} />
						</button>
					</div>

					{/* User Quick Profile Section */}
					<div className="px-6 mb-8">
						<div className="bg-white/5 border border-white/10 rounded-3xl p-4 flex items-center gap-3">
							<img
								src={user?.photoURL}
								className="h-10 w-10 rounded-2xl object-cover border-2 border-[#079d49]"
								alt="User"
							/>
							<div className="flex-1 overflow-hidden">
								<p className="text-sm font-black truncate">
									{user?.displayName}
								</p>
								<span className="text-[10px] font-bold uppercase tracking-widest text-[#079d49] bg-[#079d49]/10 px-2 py-0.5 rounded-md">
									{role}
								</span>
							</div>
						</div>
					</div>

					{/* Navigation Menus */}
					<nav className="flex-1 px-6 space-y-1 overflow-y-auto custom-scrollbar">
						<p className="text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-4 ml-2">
							Management
						</p>
						<div className="space-y-2">
							{role === "admin" && <AdminMenu />}
							{role === "vendor" && <VendorMenu />}
							{role === "user" && <UserMenu />}
						</div>
					</nav>

					{/* Sidebar Footer */}
					<div className="p-6 mt-auto border-t border-white/5">
						<button
							onClick={logOut}
							className="w-full flex items-center gap-3 p-4 rounded-2xl text-gray-400 font-bold hover:bg-red-500/10 hover:text-red-400 transition-all"
						>
							<LogOut size={20} />
							<span>Logout</span>
						</button>
					</div>
				</aside>

				{/* 3. Main Content Area */}
				<main className="flex-1 flex flex-col min-w-0 h-full">
					{/* Modern Top Header */}
					<header className="bg-white/70 backdrop-blur-xl border border-white sm:rounded-4xl h-20 flex items-center justify-between px-4 sm:px-8 mb-4 sm:mb-6 shadow-sm z-30">
						<div className="flex items-center gap-3">
							{/* Updated Hamburger Button */}
							<button
								onClick={toggleSidebar}
								className="lg:hidden p-3 text-slate-700 bg-white shadow-sm border border-slate-100 rounded-2xl active:scale-95 transition-all"
							>
								<Menu size={20} />
							</button>
							<h2 className="text-sm sm:text-lg font-black text-slate-800 tracking-tight truncate max-w-[150px] sm:max-w-none">
								Hi, {user?.displayName?.split(" ")[0]}! 👋
							</h2>
						</div>

						<div className="flex items-center space-x-2 sm:space-x-3">
							<button className="p-2 sm:p-3 text-gray-400 hover:text-[#079d49] hover:bg-green-50 rounded-2xl transition-all relative">
								<Bell size={20} />
								<span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
							</button>

							<div className="h-8 w-[1px] bg-gray-100 mx-1 sm:mx-2"></div>

							<Link
								to="/dashboard/profile"
								className="flex items-center gap-2 sm:gap-3 group"
							>
								<div className="text-right hidden md:block">
									<p className="text-xs font-black text-slate-900 group-hover:text-[#079d49] transition-colors">
										My Profile
									</p>
									<p className="text-[10px] font-bold text-gray-400">
										Settings
									</p>
								</div>
								<img
									src={user?.photoURL}
									className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl border-2 border-transparent group-hover:border-[#079d49] transition-all object-cover"
									alt="Profile"
								/>
							</Link>
						</div>
					</header>

					{/* Page Content Container */}
					<div className="flex-1 overflow-y-auto px-4 sm:px-0 custom-scrollbar pb-6">
						<div className="bg-white rounded-3xl sm:rounded-[2.5rem] min-h-full shadow-sm border border-white p-4 sm:p-8">
							<Outlet />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
