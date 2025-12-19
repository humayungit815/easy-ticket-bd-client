import React from "react";
import {NavLink} from "react-router";

const UserMenu = () => {
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
					to="my-booked-tickets"
					className={({isActive}) =>
						`flex items-center p-3 rounded-lg transition font-semibold ${
							isActive
								? "bg-blue-600 text-white"
								: "text-slate-400 hover:bg-slate-800 hover:text-white"
						}`
					}
				>
					My Booked Tickets
				</NavLink>
			</div>

			<div>
				<NavLink
					to="transaction-history"
					className={({isActive}) =>
						`flex items-center p-3 rounded-lg transition font-semibold ${
							isActive
								? "bg-blue-600 text-white"
								: "text-slate-400 hover:bg-slate-800 hover:text-white"
						}`
					}
				>
					Transaction History
				</NavLink>
			</div>
		</div>
	);
};

export default UserMenu;
