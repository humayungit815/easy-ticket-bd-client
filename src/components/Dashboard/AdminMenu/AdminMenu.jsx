import React from "react";
import {Link, NavLink} from "react-router";

const AdminMenu = () => {
	return (
		<div>
			<div>
				<NavLink
					to="profile"
					className={({isActive}) =>
						`flex items-center p-3 rounded-lg transition font-semibold ${
							isActive
								? "bg-blue-600 text-white"
								: "text-slate-400 hover:bg-slate-800 hover:text-white"
						}`
					}
				>
					Profile
				</NavLink>
			</div>

			<div className="my-3">
				<NavLink
					to="manage-tickets"
					className={({isActive}) =>
						`flex items-center p-3 rounded-lg transition font-semibold ${
							isActive
								? "bg-blue-600 text-white"
								: "text-slate-400 hover:bg-slate-800 hover:text-white"
						}`
					}
				>
					Manage Tickets
				</NavLink>
			</div>

			<div>
				<NavLink
					to="manage-users"
					className={({isActive}) =>
						`flex items-center p-3 rounded-lg transition font-semibold ${
							isActive
								? "bg-blue-600 text-white"
								: "text-slate-400 hover:bg-slate-800 hover:text-white"
						}`
					}
				>
					Manage Users
				</NavLink>
			</div>
			<div>
				<NavLink
					to="admin-advertise"
					className={({isActive}) =>
						`flex items-center p-3 rounded-lg transition font-semibold ${
							isActive
								? "bg-blue-600 text-white"
								: "text-slate-400 hover:bg-slate-800 hover:text-white"
						}`
					}
				>
					Advertise Tickets
				</NavLink>
			</div>
		</div>
	);
};

export default AdminMenu;
