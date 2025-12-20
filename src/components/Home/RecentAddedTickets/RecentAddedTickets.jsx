import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useNavigate} from "react-router";
import { CheckCircle2, MapPin } from "lucide-react";

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
	const brandGreen = "#079d49";
	return (
		<div className="mt-20 max-w-7xl mx-auto
		">
			<div className="mb-10 p-3">
				<div className="flex items-center gap-2 mb-2">
					<span
						className="w-8 h-1 rounded-full"
						style={{backgroundColor: brandGreen}}
					/>
					<span className="text-xs font-black uppercase tracking-[3px] text-gray-400">
						New Arrivals
					</span>
				</div>
				<h2 className="text-4xl font-black text-slate-900 tracking-tighter">
					Recently Added <span style={{color: brandGreen}}>Routes</span>
				</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{tickets.map(ticket => (
					<div
						key={ticket.id}
						className="group w-[90%] mx-auto md:w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
					>
						{/* Image Section */}
						<div className="relative h-48 overflow-hidden">
							<img
								src={ticket.image}
								alt={ticket.transportType}
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold text-gray-800">
								<span style={{color: brandGreen}}>{ticket.transportType}</span>
							</div>
						</div>

						{/* Content Section */}
						<div className="p-6">
							<div className="flex justify-between items-start mb-2">
								<h3 className="font-bold text-lg text-gray-900 leading-snug">
									{ticket.TicketTitle}
								</h3>
							</div>

							<div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
								<MapPin size={14} />
								<span>Available Now</span>
							</div>

							{/* Price & Quantity Area */}
							<div className="flex items-end justify-between mb-6 pb-4 border-b border-gray-50">
								<div>
									<p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
										Price per unit
									</p>
									<p
										className="text-2xl font-black"
										style={{color: brandGreen}}
									>
										${ticket.price}
									</p>
								</div>
								<div className="text-right">
									<p className="text-xs font-bold px-2 py-1 rounded bg-green-50 text-green-700">
										{ticket.quantity} Seats Left
									</p>
								</div>
							</div>

							{/* Perks Section */}

							<div className="flex flex-wrap gap-2 mb-4">
								{ticket.perks?.map((perk, idx) => (
									<span
										key={idx}
										className={`text-xs flex items-center gap-2 px-2 py-1 rounded-full ${
											perk === "AC"
												? "bg-blue-100 text-blue-800"
												: perk === "Breakfast"
												? "bg-green-100 text-green-800"
												: "bg-yellow-100 text-yellow-800"
										}`}
									>
										<CheckCircle2 size={14} style={{color: brandGreen}} />
										{perk}
									</span>
								))}
							</div>

							{/* CTA Button */}
							<button
								onClick={() => handleSeeDetails(ticket._id)}
								className="cursor-pointer w-full py-3 rounded-xl font-bold text-white transition-all active:scale-95 shadow-lg shadow-green-900/10"
								style={{backgroundColor: brandGreen}}
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
