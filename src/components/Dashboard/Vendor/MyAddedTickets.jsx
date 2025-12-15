import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyAddedTickets = () => {
	const [tickets, setTickets] = useState([]);
	const axiosSecure = useAxiosSecure();
	const {user} = useAuth(); // logged-in vendor info

	useEffect(() => {
		if (!user?.email) return;

		const fetchTickets = async () => {
			try {
				const res = await axiosSecure.get(`/vendor/my-tickets/${user.email}`);
				setTickets(res.data);
			} catch (err) {
				console.error("Error fetching my tickets:", err);
			}
		};

		fetchTickets();
	}, [axiosSecure, user?.email]);
	console.log(tickets);
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
									Price: ৳{ticket.price} | Quantity: {ticket.quantity}
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
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyAddedTickets;
