import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useNavigate} from "react-router";

const RecentAddedTickets = () => {
	const axiosSecure = useAxiosSecure();
	const [tickets, setTickets] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		axiosSecure.get("/recent-added").then(res => {
			setTickets(res.data);
		});
	}, [axiosSecure]);
	const handleSeeDetails = id => {
		navigate(`/tickets/${id}`);
	};
	return (
		<div className="mt-20">
			<h1 className="text-4xl font-bold text-center mb-10">
				Recent Added Tickets
			</h1>
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
				{tickets.map(ticket => (
					<div
						key={ticket._id}
						className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
					>
						{/* Image */}
						<div className="relative">
							<img
								src={ticket.image}
								alt={ticket.TicketTitle}
								className="w-full h-48 object-cover"
							/>
							<span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
								{ticket.transportType}
							</span>
						</div>

						{/* Content */}
						<div className="p-5">
							{/* Title */}
							<h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
								{ticket.TicketTitle}
							</h3>

							{/* Price & Quantity */}
							<div className="flex justify-between items-center text-sm text-gray-600 mb-2">
								<p>
									Price:{" "}
									<span className="font-semibold text-indigo-600">
										৳{ticket.price}
									</span>
								</p>
								<p>
									Qty: <span className="font-medium">{ticket.quantity}</span>
								</p>
							</div>

							{/* Perks */}
							<div className="flex flex-wrap gap-2 mb-4">
								{ticket.perks?.map((perk, index) => (
									<span
										key={index}
										className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700"
									>
										{perk}
									</span>
								))}
							</div>

							{/* Button */}
							<button
								onClick={() => handleSeeDetails(ticket._id)}
								className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:from-indigo-600 hover:to-purple-700 transition"
							>
								See Details
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecentAddedTickets;
