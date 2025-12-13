import React, {useEffect, useState} from "react";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import {useNavigate} from "react-router";

const AllTickets = () => {
	const [tickets, setTickets] = useState([]);
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();

	useEffect(() => {
		axiosSecure
			.get("/tickets")
			.then(res => {
				// only approved tickets
				const approvedTickets = res.data.filter(
					ticket => ticket.verificationStatus === "approved"
				);
				setTickets(approvedTickets);
			})
			.catch(error => console.error("Error loading tickets:", error));
	}, [axiosSecure]);

	const handleSeeDetails = id => {
		navigate(`/tickets/${id}`);
	};

	return (
		<div className="max-w-7xl mx-auto p-6">
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
				All Tickets
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
				{tickets.map(ticket => (
					<div
						key={ticket._id}
						className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
					>
						{/* Image with overlay */}
						<div className="relative">
							<img
								src={ticket.image}
								alt={ticket.TicketTitle}
								className="w-full h-48 object-cover"
							/>
							<div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
								<h2 className="text-white font-bold text-lg">
									{ticket.TicketTitle}
								</h2>
							</div>
						</div>

						<div className="p-4">
							<p className="text-sm text-gray-600 mb-1">
								{ticket.fromLocation} → {ticket.toLocation}
							</p>
							<p className="text-sm text-gray-600 mb-1">
								Transport: {ticket.transportType}
							</p>
							<p className="text-sm text-gray-600 mb-1">
								Price: ৳{ticket.price} | Quantity: {ticket.quantity}
							</p>
							<p className="text-sm text-gray-600 mb-2">
								Departure:{" "}
								{new Date(ticket.departure).toLocaleString("en-US", {
									weekday: "short",
									year: "numeric",
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>

							{/* Perks badges */}
							<div className="flex flex-wrap gap-2 mb-4">
								{ticket.perks?.map((perk, idx) => (
									<span
										key={idx}
										className={`text-xs px-2 py-1 rounded-full ${
											perk === "AC"
												? "bg-blue-100 text-blue-800"
												: perk === "Breakfast"
												? "bg-green-100 text-green-800"
												: "bg-yellow-100 text-yellow-800"
										}`}
									>
										{perk}
									</span>
								))}
							</div>

							{/* See details button */}
							<button
								onClick={() => handleSeeDetails(ticket._id)}
								className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-semibold shadow-lg transition-all duration-200"
							>
								See Details
							</button>
						</div>
					</div>
				))}
			</div>

			{/* No tickets fallback */}
			{tickets.length === 0 && (
				<p className="text-center text-gray-500 mt-10">
					No approved tickets available.
				</p>
			)}
		</div>
	);
};

export default AllTickets;
