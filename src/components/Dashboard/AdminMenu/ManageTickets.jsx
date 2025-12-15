import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {toast} from "react-toastify";

const ManageTickets = () => {
	const [tickets, setTickets] = useState([]);
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		axiosSecure
			.get("/admin/tickets")
			.then(res => {
				setTickets(res.data);
			})
			.catch(error => {
				console.error("Error loading tickets:", error);
			});
	}, [axiosSecure]);
	console.log(tickets);

	const handleApproved = async id => {
		try {
			const res = await axiosSecure.patch(`/approve-tickets/${id}`);
			if (res.data.modifiedCount > 0) {
				toast.success("Ticket Approved!");

				setTickets(prev =>
					prev.map(ticket =>
						ticket._id === id
							? {...ticket, verificationStatus: "approved"}
							: ticket
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
					prev.map(ticket =>
						ticket._id === id
							? {...ticket, verificationStatus: "rejected"}
							: ticket
					)
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="p-8">
			{/* Page Title */}
			<h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Tickets</h2>

			{/* Table Container */}
			<div className="overflow-x-auto bg-white shadow-lg rounded-xl border">
				<table className="min-w-full text-left text-sm">
					{/* Table Header */}
					<thead className="bg-gray-100 text-gray-700 text-sm uppercase">
						<tr>
							<th className="px-6 py-3">#</th>
							<th className="px-6 py-3">Title</th>
							<th className="px-6 py-3">Vendor Name</th>
							<th className="px-6 py-3">Price</th>
							<th className="px-6 py-3">Transport Type</th>
							<th className="px-6 py-3">Status</th>
							<th className="px-6 py-3 text-center">Actions</th>
						</tr>
					</thead>

					{/* Table Body */}
					<tbody>
						{tickets.map((ticket, index) => (
							<tr key={ticket._id} className="border-b hover:bg-gray-50">
								{/* Row Number */}
								<td className="px-6 py-4">{index + 1}</td>

								{/* Ticket Title */}
								<td className="px-6 py-4 font-semibold">
									{ticket.TicketTitle}
								</td>

								{/* Vendor Name */}
								<td className="px-6 py-4">{ticket.vendorName}</td>

								{/* Price */}
								<td className="px-6 py-4">{ticket.price} BDT</td>

								{/* transport type*/}
								<td className="px-6 py-4">{ticket.transportType}</td>

								{/* Status Badge */}
								<td className="px-6 py-4">
									<span
										className={`px-3 py-1 text-xs rounded-full
                      ${
												ticket.verificationStatus === "approved"
													? "bg-green-200 text-green-700"
													: ticket.verificationStatus === "rejected"
													? "bg-red-200 text-red-700"
													: "bg-yellow-200 text-yellow-700"
											}`}
									>
										{ticket.verificationStatus || "pending"}
									</span>
								</td>

								{/* Action Buttons */}
								<td className="px-6 py-4 flex gap-3 justify-center">
									{ticket.verificationStatus === "pending" ? (
										<button
											onClick={() => handleApproved(ticket._id)}
											className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm shadow"
										>
											Approve
										</button>
									) : (
										<button
											onClick={() => handleApproved(ticket._id)}
											disabled={ticket.verificationStatus === "approved"}
											className="px-4 py-2 rounded-md bg-green-200 text-green-700 text-black text-sm shadow"
										>
											Approved
										</button>
									)}
									{ticket.verificationStatus === "rejected" ? (
										<button
											onClick={() => handleRejected(ticket._id)}
											disabled={ticket.verificationStatus === "rejected"}
											className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm shadow"
										>
											Rejected
										</button>
									) : (
										<button
											onClick={() => handleRejected(ticket._id)}
											className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm shadow"
										>
											Reject
										</button>
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

export default ManageTickets;
