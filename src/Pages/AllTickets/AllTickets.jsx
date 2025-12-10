import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTickets = () => {
	const [tickets, setTickets] = useState([]);
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		axiosSecure
			.get("/tickets/approved")
			.then(res => setTickets(res.data))
			.catch(err => console.log(err));
	}, [axiosSecure]);

	return (
		<div className="p-8">
			<h2 className="text-3xl font-bold text-center mb-8">
				All Approved Tickets
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{tickets.map(ticket => (
					<div
						key={ticket._id}
						className="bg-white shadow-lg rounded-xl border hover:shadow-2xl transition-all duration-300"
					>
						{/* Ticket Image */}
						<img
							src={ticket.image}
							alt={ticket.TicketTitle}
							className="w-full h-48 object-cover rounded-t-xl"
						/>

						{/* Content */}
						<div className="p-5">
							<h3 className="font-bold text-xl">{ticket.TicketTitle}</h3>

							<p className="text-gray-600 mt-1">
								{ticket.fromLocation} ➤ {ticket.toLocation}
							</p>

							<p className="font-semibold mt-2">Price: {ticket.price} BDT</p>

							<p className="text-sm text-gray-500 mt-1">
								Departure: {ticket.departure?.slice(0, 16)}
							</p>

							<div className="mt-3 flex flex-wrap gap-2">
								{ticket.perks?.map((perk, idx) => (
									<span
										key={idx}
										className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
									>
										{perk}
									</span>
								))}
							</div>

							<span className="inline-block mt-4 px-3 py-1 text-xs bg-green-200 text-green-700 rounded-full">
								Approved
							</span>
						</div>
					</div>
				))}

				{/* If No Ticket Found */}
				{tickets.length === 0 && (
					<p className="text-center col-span-full text-gray-600 text-xl">
						No approved tickets available!
					</p>
				)}
			</div>
		</div>
	);
};

export default AllTickets;
