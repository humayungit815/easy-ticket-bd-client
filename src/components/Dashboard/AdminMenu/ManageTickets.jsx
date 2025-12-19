import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {toast} from "react-toastify";
import {
	CheckCircle,
	XCircle,
	MoreVertical,
	Bus,
	Plane,
	Train,
	Ship,
	User,
} from "lucide-react";

const ManageTickets = () => {
	const [tickets, setTickets] = useState([]);
	const axiosSecure = useAxiosSecure();
	// const brandGreen = "#079d49";

	useEffect(() => {
		axiosSecure
			.get("/admin/tickets")
			.then(res => setTickets(res.data))
			.catch(error => console.error("Error loading tickets:", error));
	}, [axiosSecure]);

	const handleApproved = async id => {
		try {
			const res = await axiosSecure.patch(`/approve-tickets/${id}`);
			if (res.data.modifiedCount > 0) {
				toast.success("Ticket Approved!");
				setTickets(prev =>
					prev.map(t =>
						t._id === id ? {...t, verificationStatus: "approved"} : t
					)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleRejected = async id => {
		try {
			const res = await axiosSecure.patch(`/reject-tickets/${id}`);
			if (res.data.modifiedCount > 0) {
				toast.error("Ticket Rejected!");
				setTickets(prev =>
					prev.map(t =>
						t._id === id ? {...t, verificationStatus: "rejected"} : t
					)
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	// Icon Helper
	const getIcon = type => {
		const props = {size: 16};
		switch (type?.toLowerCase()) {
			case "bus":
				return <Bus {...props} />;
			case "plane":
				return <Plane {...props} />;
			case "train":
				return <Train {...props} />;
			case "launch":
				return <Ship {...props} />;
			default:
				return <Bus {...props} />;
		}
	};

	return (
		<div className="space-y-8 animate-in fade-in duration-700">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h2 className="text-3xl font-black text-slate-900 tracking-tight">
						Manage Tickets
					</h2>
					<p className="text-gray-400 font-bold text-sm uppercase tracking-widest mt-1">
						Review & Verification Center
					</p>
				</div>
				<div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
					<div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></div>
					<span className="text-xs font-black text-slate-700 uppercase tracking-widest">
						{tickets.filter(t => t.verificationStatus === "pending").length}{" "}
						Pending Review
					</span>
				</div>
			</div>

			{/* Table Container */}
			<div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="bg-gray-50/50 border-b border-gray-100">
								<th className="px-8 py-6 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
									Route & Info
								</th>
								<th className="px-8 py-6 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
									Vendor
								</th>
								<th className="px-8 py-6 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
									Pricing
								</th>
								<th className="px-8 py-6 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
									Status
								</th>
								<th className="px-8 py-6 text-[10px] font-black uppercase tracking-[2px] text-gray-400 text-center">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-50">
							{tickets.map(ticket => (
								<tr
									key={ticket._id}
									className="group hover:bg-green-50/30 transition-colors"
								>
									{/* Title & Transport */}
									<td className="px-8 py-6">
										<div className="flex items-center gap-4">
											<div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-white transition-colors">
												{getIcon(ticket.transportType)}
											</div>
											<div>
												<p className="font-black text-slate-800 text-sm truncate max-w-[200px]">
													{ticket.TicketTitle}
												</p>
												<p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
													{ticket.transportType} Service
												</p>
											</div>
										</div>
									</td>

									{/* Vendor */}
									<td className="px-8 py-6">
										<div className="flex items-center gap-2">
											<div className="p-1.5 bg-blue-50 text-blue-500 rounded-lg">
												<User size={14} />
											</div>
											<span className="text-sm font-bold text-slate-600">
												{ticket.vendorName}
											</span>
										</div>
									</td>

									{/* Price */}
									<td className="px-8 py-6">
										<span className="text-sm font-black text-slate-900">
											৳{ticket.price}
										</span>
									</td>

									{/* Status */}
									<td className="px-8 py-6">
										<div
											className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
												ticket.verificationStatus === "approved"
													? "bg-green-50 text-green-600 border-green-100"
													: ticket.verificationStatus === "rejected"
													? "bg-red-50 text-red-600 border-red-100"
													: "bg-yellow-50 text-yellow-600 border-yellow-100"
											}`}
										>
											<div
												className={`h-1.5 w-1.5 rounded-full ${
													ticket.verificationStatus === "approved"
														? "bg-green-500"
														: ticket.verificationStatus === "rejected"
														? "bg-red-500"
														: "bg-yellow-500"
												}`}
											/>
											{ticket.verificationStatus || "pending"}
										</div>
									</td>

									{/* Actions */}
									<td className="px-8 py-6">
										<div className="flex items-center justify-center gap-2">
											{/* Approve Button */}
											<button
												onClick={() => handleApproved(ticket._id)}
												disabled={ticket.verificationStatus === "approved"}
												className={`p-2 rounded-xl transition-all ${
													ticket.verificationStatus === "approved"
														? "bg-gray-50 text-gray-300 cursor-not-allowed"
														: "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
												}`}
												title="Approve Ticket"
											>
												<CheckCircle size={18} />
											</button>

											{/* Reject Button */}
											<button
												onClick={() => handleRejected(ticket._id)}
												disabled={ticket.verificationStatus === "rejected"}
												className={`p-2 rounded-xl transition-all ${
													ticket.verificationStatus === "rejected"
														? "bg-gray-50 text-gray-300 cursor-not-allowed"
														: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
												}`}
												title="Reject Ticket"
											>
												<XCircle size={18} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{tickets.length === 0 && (
						<div className="p-20 text-center">
							<p className="text-gray-300 font-black text-xl uppercase tracking-tighter">
								No tickets to manage
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ManageTickets;
