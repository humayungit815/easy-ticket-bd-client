import React from "react";
import {Link, Links, NavLink} from "react-router";

const VendorMenu = () => {
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
					to="add-tickets"
					className={({isActive}) =>
						`flex items-center p-3 rounded-lg transition font-semibold ${
							isActive
								? "bg-blue-600 text-white"
								: "text-slate-400 hover:bg-slate-800 hover:text-white"
						}`
					}
				>
					Add Ticket
				</NavLink>
			</div>

			<div>
				<NavLink
					to="my-added-tickets"
					className={({isActive}) =>
						`flex items-center p-3 rounded-lg transition font-semibold ${
							isActive
								? "bg-blue-600 text-white"
								: "text-slate-400 hover:bg-slate-800 hover:text-white"
						}`
					}
				>
					My Added Tickets
				</NavLink>
			</div>
			<div>
				<NavLink
					to="requested-bookings"
					className={({isActive}) =>
						`flex items-center p-3 rounded-lg transition font-semibold ${
							isActive
								? "bg-blue-600 text-white"
								: "text-slate-400 hover:bg-slate-800 hover:text-white"
						}`
					}
				>
					Requested Bookings
				</NavLink>
			</div>
			<div>
				<NavLink
					to="vendor-revenue"
					className={({isActive}) =>
						`flex items-center p-3 rounded-lg transition font-semibold ${
							isActive
								? "bg-blue-600 text-white"
								: "text-slate-400 hover:bg-slate-800 hover:text-white"
						}`
					}
				>
					Revenue Overview
				</NavLink>
			</div>
		</div>
	);
};

export default VendorMenu;
