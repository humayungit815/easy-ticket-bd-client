import React, {useEffect, useState} from "react";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import {useNavigate} from "react-router";
import useAuth from "../../hooks/useAuth";
import {
	Calendar,
	MapPin,
	Search,
	ArrowRight,
	Filter,
	Ship,
	Train,
	Plane,
	Bus,
	ArrowLeft,
	CheckCircle2,
} from "lucide-react";

const AllTickets = () => {
	const {loading} = useAuth();
	const [tickets, setTickets] = useState([]);
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();
	const brandGreen = "#079d49";

	const [fromInput, setFromInput] = useState("");
	const [toInput, setToInput] = useState("");
	const [transportInput, setTransportInput] = useState("all");
	const [sortOrder, setSortOrder] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// Sorting Logic (Preserved)
	const sortedTickets = [...tickets].sort((a, b) => {
		if (sortOrder === "low") return a.price - b.price;
		if (sortOrder === "high") return b.price - a.price;
		return 0;
	});

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
		return (
			<div
				className="flex justify-center items-center h-screen font-black text-2xl animate-pulse"
				style={{color: brandGreen}}
			>
				LOADING TICKETS...
			</div>
		);
	}

	return (
		<div className="min-h-screen pb-20">
			{/* 1. Header & Search Bar Section */}
			<div className=" border-b border-gray-100 pt-12 pb-8 px-6">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-8">
						Explore All <span style={{color: brandGreen}}>Tickets</span>
					</h1>

					{/* New Modern Filter Bar */}
					<div className="bg-white shadow-2xl shadow-gray-200/50 rounded-[2.5rem] p-4 border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl border border-[#079d49] transition-all">
							<MapPin size={18} className="text-gray-400" />
							<input
								type="text"
								placeholder="From where?"
								value={fromInput}
								onChange={e => setFromInput(e.target.value)}
								className="bg-transparent w-full outline-none font-bold text-sm"
							/>
						</div>

						<div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl  border border-[#079d49] transition-all">
							<MapPin size={18} className="text-gray-400" />
							<input
								type="text"
								placeholder="To where?"
								value={toInput}
								onChange={e => setToInput(e.target.value)}
								className="bg-transparent w-full outline-none font-bold text-sm"
							/>
						</div>

						<div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl">
							<Filter size={18} className="text-gray-400" />
							<select
								value={transportInput}
								onChange={e => setTransportInput(e.target.value)}
								className="bg-transparent w-full outline-none font-bold text-sm"
							>
								<option value="all">Any Transport</option>
								<option value="Bus">Bus</option>
								<option value="Train">Train</option>
								<option value="Launch">Launch</option>
								<option value="Plane">Plane</option>
							</select>
						</div>

						<button
							onClick={handleSearch}
							style={{backgroundColor: brandGreen}}
							className="w-full flex items-center justify-center gap-2 text-white font-black rounded-2xl py-4 shadow-lg hover:brightness-110 active:scale-95 transition-all"
						>
							<Search size={18} /> SEARCH
						</button>
					</div>
				</div>
			</div>

			{/* 2. Sorting & Content Grid */}
			<div className="max-w-7xl mx-auto p-6">
				<div className="flex justify-between items-center mb-10">
					<select
						value={sortOrder}
						onChange={e => setSortOrder(e.target.value)}
						className="bg-white border-2 border-gray-100 font-bold text-xs py-2 px-4 rounded-xl outline-none focus:border-[#079d49]"
					>
						<option value="">Sort by Price</option>
						<option value="low">Lowest First</option>
						<option value="high">Highest First</option>
					</select>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{sortedTickets.map(ticket => (
						<div
							key={ticket.id}
							className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
						>
							{/* Image Section */}
							<div className="relative h-48 overflow-hidden">
								<img
									src={ticket.image}
									alt={ticket.transportType}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold text-gray-800">
									<span style={{color: brandGreen}}>
										{ticket.transportType}
									</span>
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

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex justify-center mt-16 gap-3">
						<button
							disabled={currentPage === 1}
							onClick={() => setCurrentPage(prev => prev - 1)}
							className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-200 font-bold disabled:opacity-30"
						>
							<ArrowLeft size={18} />
						</button>

						{[...Array(totalPages)].map((_, idx) => (
							<button
								key={idx}
								onClick={() => setCurrentPage(idx + 1)}
								className={`w-12 h-12 rounded-2xl font-black transition-all ${
									currentPage === idx + 1
										? "text-white shadow-lg"
										: "bg-white border border-gray-200 text-gray-400"
								}`}
								style={{
									backgroundColor: currentPage === idx + 1 ? brandGreen : "",
								}}
							>
								{idx + 1}
							</button>
						))}

						<button
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage(prev => prev + 1)}
							className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-200 font-bold disabled:opacity-30"
						>
							<ArrowRight size={18} />
						</button>
					</div>
				)}

				{/* No tickets fallback */}
				{tickets.length === 0 && (
					<div className="text-center mt-20">
						<p className="text-2xl font-black text-gray-300 mb-2 italic">
							Oops! Nothing here.
						</p>
						<p className="text-gray-400 font-bold">
							Try adjusting your search filters.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default AllTickets;
