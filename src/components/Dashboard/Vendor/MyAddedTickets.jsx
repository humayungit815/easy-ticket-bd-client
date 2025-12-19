import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {Link, useNavigate} from "react-router";
import Swal from "sweetalert2";

const MyAddedTickets = () => {
	const [tickets, setTickets] = useState([]);
	const axiosSecure = useAxiosSecure();
	const {user} = useAuth(); // logged-in vendor info
	const navigate = useNavigate();

	useEffect(() => {
		if (!user?.email) return;

		const fetchTickets = async () => {
			try {
				const res = await axiosSecure.get(`/vendor/my-tickets`);
				setTickets(res.data);
			} catch (err) {
				console.error("Error fetching my tickets:", err);
			}
		};

		fetchTickets();
	}, [axiosSecure, user?.email]);

	const handleUpdate = ticket => {
		navigate(`/dashboard/update-ticket/${ticket._id}`);
	};
	const handleDelete = async id => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#079d49",
			confirmButtonText: "Yes, delete it!",
		}).then(async result => {
			if (result.isConfirmed) {
				try {
					const res = await axiosSecure.delete(`/vendor/delete-ticket/${id}`);

					if (res.data.deletedCount > 0) {
						setTickets(prev => prev.filter(ticket => ticket._id !== id));
					}
				} catch (err) {
					console.error(err);
				}
			}
		});
	};
	return (
		<div>
			<div className="max-w-7xl mx-auto p-6">
				<h1 className="text-2xl font-bold mb-6 text-center">
					My Added Tickets
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{tickets?.map(ticket => (
						<div
							key={ticket._id}
							className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg"
						>
							<img
								src={ticket.image}
								alt={ticket.TicketTitle}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h2 className="text-lg font-semibold mb-1">
									{ticket.TicketTitle}
								</h2>
								<p className="text-sm text-gray-600 mb-1">
									{ticket.fromLocation} → {ticket.toLocation}
								</p>
								<p className="text-sm text-gray-600 mb-1">
									Transport: {ticket.transportType}
								</p>
								<p className="text-sm text-gray-600 mb-1">
									Price: ${ticket.price} | Quantity: {ticket.quantity}
								</p>
								<p className="text-sm text-gray-600 mb-1">
									Departure: {new Date(ticket.departure).toLocaleString()}
								</p>
								<div className="flex flex-wrap gap-2 mb-2">
									{ticket.perks?.map((perk, idx) => (
										<span
											key={idx}
											className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
										>
											{perk}
										</span>
									))}
								</div>
								<p
									className={`text-sm font-semibold ${
										ticket.verificationStatus === "pending"
											? "text-yellow-600"
											: ticket.verificationStatus === "approved"
											? "text-green-600"
											: "text-red-600"
									}`}
								>
									Status: {ticket.verificationStatus}
								</p>
								{ticket.verificationStatus === "rejected" ? (
									<div className="flex justify-between mt-3">
										<button
											disabled
											className="bg-gray-400 text-white font-medium px-4 py-1 rounded-xl"
										>
											Update
										</button>

										<button
											disabled
											className="bg-gray-400 text-white font-medium px-4 py-1 rounded-xl"
										>
											Delete
										</button>
									</div>
								) : (
									<div className="flex justify-between mt-3">
										<button
											onClick={() => handleUpdate(ticket)}
											className="bg-[#079d49] text-white font-medium px-4 py-1 rounded-xl"
										>
											Update
										</button>

										<button
											onClick={() => handleDelete(ticket._id)}
											className="bg-[#e70d0d] text-white font-medium px-4 py-1 rounded-xl"
										>
											Delete
										</button>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyAddedTickets;
