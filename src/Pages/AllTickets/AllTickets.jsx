import React, {useEffect, useState} from "react";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import {useNavigate} from "react-router";
import useAuth from "../../hooks/useAuth";

const AllTickets = () => {
	const {loading} = useAuth();
	const [tickets, setTickets] = useState([]);
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();

	const [fromInput, setFromInput] = useState("");
	const [toInput, setToInput] = useState("");
	const [transportInput, setTransportInput] = useState("all");
	const [sortOrder, setSortOrder] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const sortedTickets = [...tickets].sort((a, b) => {
		if (sortOrder === "low") {
			return a.price - b.price;
		}
		if (sortOrder === "high") {
			return b.price - a.price;
		}
		return 0;
	});

	// applied search states
	const [search, setSearch] = useState({
		from: "",
		to: "",
		transportType: "all",
	});

	useEffect(() => {
		const fetchTickets = async () => {
			try {
				const res = await axiosSecure.get("/tickets", {
					params: {
						verificationStatus: "approved",
						from: search.from,
						to: search.to,
						transportType: search.transportType,
						page: currentPage,
						limit: 6,
					},
				});

				setTickets(res.data.tickets);
				setCurrentPage(res.data.currentPage);
				setTotalPages(res.data.totalPages);
			} catch (err) {
				console.error(err);
			}
		};

		fetchTickets();
	}, [axiosSecure, search, currentPage]);

	const handleSearch = () => {
		setSearch({
			from: fromInput,
			to: toInput,
			transportType: transportInput,
		});
	};
	const handleSeeDetails = id => {
		navigate(`/tickets/${id}`);
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="max-w-7xl mx-auto p-6">
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
				All Tickets
			</h1>
			<div className="flex justify-end mb-6">
				<select
					value={sortOrder}
					onChange={e => setSortOrder(e.target.value)}
					className="select select-bordered w-56"
				>
					<option value="">Sort by Price</option>
					<option value="low">Low → High</option>
					<option value="high">High → Low</option>
				</select>
			</div>

			{/* search */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				<input
					type="text"
					placeholder="From Location"
					value={fromInput}
					onChange={e => setFromInput(e.target.value)}
					className="input input-bordered w-full"
				/>

				<input
					type="text"
					placeholder="To Location"
					value={toInput}
					onChange={e => setToInput(e.target.value)}
					className="input input-bordered w-full"
				/>

				<select
					value={transportInput}
					onChange={e => setTransportInput(e.target.value)}
					className="select select-bordered w-full"
				>
					<option value="all">All Transport</option>
					<option value="Bus">Bus</option>
					<option value="Train">Train</option>
					<option value="Launch">Launch</option>
					<option value="Plane">Plane</option>
				</select>

				<button onClick={handleSearch} className="btn btn-primary w-full">
					Search
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
				{sortedTickets.map(ticket => (
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
			{/* pagination */}
			<div className="flex justify-center mt-6 gap-2">
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(prev => prev - 1)}
					className="btn btn-sm"
				>
					Prev
				</button>

				{[...Array(totalPages)].map((_, idx) => (
					<button
						key={idx}
						onClick={() => setCurrentPage(idx + 1)}
						className={`btn btn-sm ${
							currentPage === idx + 1 ? "btn-primary" : ""
						}`}
					>
						{idx + 1}
					</button>
				))}

				<button
					disabled={currentPage === totalPages}
					onClick={() => setCurrentPage(prev => prev + 1)}
					className="btn btn-sm"
				>
					Next
				</button>
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
