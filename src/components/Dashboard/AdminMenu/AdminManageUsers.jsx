import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {toast} from "react-toastify";

const AdminManageUsers = () => {
	const [users, setUsers] = useState([]);
	const axiosSecure = useAxiosSecure();

	
	useEffect(() => {
		axiosSecure.get("/users").then(res => setUsers(res.data));
	}, [axiosSecure]);

	// Make Admin
	const handleMakeAdmin = async email => {
		try {
			const res = await axiosSecure.patch(`/approve-admin/${email}`);
			if (res.data.modifiedCount > 0) {
				toast.success("User is now Admin!");
				setUsers(prev =>
					prev.map(u => (u.email === email ? {...u, role: "admin"} : u))
				);
			}
		} catch (err) {
			console.error(err);
			toast.error("Failed to make admin");
		}
	};

	// make vendor
	const handleMakeVendor = async email => {
		try {
			const res = await axiosSecure.patch(`/approve-vendor/${email}`);
			if (res.data.modifiedCount > 0) {
				toast.success("User is now Vendor!");
				setUsers(prev =>
					prev.map(u => (u.email === email ? {...u, role: "vendor"} : u))
				);
			}
		} catch (err) {
			console.error(err);
			toast.error("Failed to make Vendor");
		}
	};

	// make fraud
	const handleMarkFraud = async id => {
		try {
			const res = await axiosSecure.patch(`/users/fraud/${id}`);
			if (res.data.success) {
				toast.success("Vendor marked as fraud!");

				// Update state so UI updates
				setUsers(prev =>
					prev.map(user => (user._id === id ? {...user, isFraud: true} : user))
				);
			}
		} catch (err) {
			console.error(err);
			toast.error("Failed to mark vendor as fraud");
		}
	};

	return (
		<div className="p-4 sm:p-8 bg-gray-50">
			<h2 className="text-3xl font-bold text-gray-800 mb-6">
				👥 User Management
			</h2>

			{/* Table Container */}
			<div className="shadow-lg overflow-x-scroll border-b border-gray-200 sm:rounded-lg">
				<table className="min-w-full divide-y divide-gray-200">
					{/* Table Header */}
					<thead className="bg-gray-100">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Name
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Email
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Role
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Actions
							</th>
						</tr>
					</thead>

					{/* Table Body - Iterates through static data */}
					<tbody className="bg-white divide-y divide-gray-200">
						{users?.map(user => (
							<tr
								key={user.id}
								className="hover:bg-gray-50 transition duration-150"
							>
								{/* Name Column */}
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900">
										{user.name}
									</div>
								</td>

								{/* Email Column */}
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-500">{user.email}</div>
								</td>

								
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.role === "Admin"
												? "bg-red-100 text-red-800"
												: user.role === "Vendor"
												? "bg-blue-100 text-blue-800"
												: "bg-green-100 text-green-800"
										}`}
									>
										{user.role}
									</span>
								</td>

								
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
									{/* Make Admin Button */}
									<button
										onClick={() => handleMakeAdmin(user.email)}
										disabled={user.role === "admin"} // disable if already admin
										className={`px-3 py-1 text-sm font-medium rounded-md transition duration-150
                                                 ${
																										user.role === "admin"
																											? "bg-gray-300 text-gray-600 cursor-not-allowed"
																											: "bg-red-600 text-white hover:bg-red-700"
																									}`}
									>
										{user.role === "admin" ? "Admin" : "Make Admin"}
									</button>

									{/* Make Vendor Button */}
									<button
										onClick={() => handleMakeVendor(user.email)}
										disabled={user.role === "vendor"} // disable if already vendor
										className={`px-3 py-1 text-sm font-medium rounded-md transition duration-150
            ${
							user.role === "vendor"
								? "bg-gray-300 text-gray-600 cursor-not-allowed"
								: "bg-blue-600 text-white hover:bg-blue-700"
						}`}
									>
										{user.role === "vendor" ? "Vendor" : "Make Vendor"}
									</button>
								</td>

								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									{/* Mark as Fraud Button */}
									{user.role === "vendor" && !user.isFraud && (
										<button
											onClick={() => handleMarkFraud(user._id)}
											className="px-3 py-1 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700"
										>
											Mark as Fraud
										</button>
									)}

									{user.isFraud && (
										<span className="px-3 py-1 text-sm font-medium rounded-md bg-gray-400 text-white cursor-not-allowed">
											Fraud
										</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminManageUsers;
