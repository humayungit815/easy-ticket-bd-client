import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {toast} from "react-toastify";
import useAuth from "../../hooks/useAuth";
import {
	Bus,
	MapPin,
	Calendar,
	Clock,
	Tag,
	ShieldCheck,
	CheckCircle,
	ArrowRightLeft,
	Timer,
	ArrowLeft,
	X,
	Info,
} from "lucide-react";

const TicketDetails = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();
	const {user} = useAuth();
	const brandGreen = "#079d49";

	const [ticket, setTicket] = useState(null);
	const [loading, setLoading] = useState(true);
	const [bookingQty, setBookingQty] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	// 1. Fetch ticket details
	useEffect(() => {
		axiosSecure
			.get(`/tickets/${id}`)
			.then(res => {
				setTicket(res.data);
				setLoading(false);
			})
			.catch(err => {
				console.error("Error loading ticket:", err);
				setLoading(false);
			});
	}, [id, axiosSecure]);

	// 2. Countdown Logic
	useEffect(() => {
		if (!ticket) return;
		const timer = setInterval(() => {
			const target = new Date(ticket.departure).getTime();
			const now = new Date().getTime();
			const difference = target - now;

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				});
			} else {
				clearInterval(timer);
			}
		}, 1000);
		return () => clearInterval(timer);
	}, [ticket]);

	// 3. Validation Logic
	const isExpired = ticket ? new Date(ticket.departure) < new Date() : true;
	const isSoldOut = ticket ? ticket.quantity === 0 : true;
	const isDisabled = isExpired || isSoldOut;

	const handleQtyChange = e => {
		let value = parseInt(e.target.value);
		if (isNaN(value)) value = 1;
		if (value > ticket.quantity) value = ticket.quantity;
		if (value < 1) value = 1;
		setBookingQty(value);
	};

	// 4. Handle Final Submission
	const handleConfirmBooking = async e => {
		e.preventDefault();

		if (bookingQty > ticket.quantity) {
			toast.error("Booking quantity can't exceed available tickets");
			return;
		}

		const bookingData = {
			ticketId: ticket._id,
			vendorEmail: ticket.vendorEmail,
			ticketTitle: ticket.TicketTitle,
			userName: user?.displayName,
			userEmail: user?.email,
			image: ticket.image,
			unitPrice: ticket.price,
			bookingQty,
			totalPrice: ticket.price * bookingQty,
			fromLocation: ticket.fromLocation,
			toLocation: ticket.toLocation,
			departure: ticket.departure,
			status: "Pending",
		};

		try {
			const res = await axiosSecure.post("/bookings", bookingData);
			if (!user) {
				toast.error("Please Login or Register. Then Booked Your Ticket!");
				navigate("/login");
				return;
			}
			if (res.data.insertedId) {
				toast.success("Booking saved to database!");
				setIsModalOpen(false);
				navigate("/dashboard/my-booked-tickets");
			}
		} catch (err) {
			console.log(err);
			toast.error("Booking failed. Try again.");
		}
	};

	if (loading)
		return (
			<div className="flex justify-center items-center h-screen animate-pulse font-bold text-[#079d49]">
				Loading Ticket...
			</div>
		);

	return (
		<div className="min-h-screen bg-white pb-12 font-sans relative">
			{/* HEADER SECTION */}
			<div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center gap-2 font-bold text-gray-500 hover:text-black transition"
				>
					<ArrowLeft size={20} /> Back
				</button>
				{isDisabled && (
					<span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-xs font-black uppercase">
						{isExpired ? "Trip Expired" : "Sold Out"}
					</span>
				)}
			</div>

			<main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* LEFT COLUMN: TICKET DETAILS */}
				<div className="lg:col-span-8 space-y-6">
					<div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
						<div className="relative h-[400px]">
							<img
								src={ticket.image}
								alt={ticket.TicketTitle}
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
							<div className="absolute bottom-8 left-8 text-white">
								<h1 className="text-4xl font-black mb-2">
									{ticket.TicketTitle}
								</h1>
								<div className="flex items-center gap-4 opacity-80 font-bold">
									<MapPin size={18} /> {ticket.fromLocation} →{" "}
									{ticket.toLocation}
								</div>
							</div>
						</div>

						<div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="p-4 bg-gray-50 rounded-2xl">
								<p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
									Departure Date
								</p>
								<p className="font-bold flex items-center gap-2">
									<Calendar size={16} style={{color: brandGreen}} />{" "}
									{new Date(ticket.departure).toDateString()}
								</p>
							</div>
							<div className="p-4 bg-gray-50 rounded-2xl">
								<p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
									Time
								</p>
								<p className="font-bold flex items-center gap-2">
									<Clock size={16} style={{color: brandGreen}} />{" "}
									{new Date(ticket.departure).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</p>
							</div>
							<div className="p-4 bg-gray-50 rounded-2xl">
								<p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
									Available Units
								</p>
								<p className="font-bold flex items-center gap-2">
									<Tag size={16} style={{color: brandGreen}} />{" "}
									{ticket.quantity} Tickets
								</p>
							</div>
						</div>
					</div>
					{/* Perks Section */}
					<div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
						<h3 className="text-xl font-black mb-6 flex items-center gap-2">
							<Info size={20} style={{color: brandGreen}} />
							Travel Perks
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{ticket.perks.map((perk, i) => (
								<div
									key={i}
									className="flex items-center gap-3 p-4 rounded-2xl bg-[#f9fbf9] border border-green-50"
								>
									<CheckCircle size={18} style={{color: brandGreen}} />
									<span className="font-bold text-gray-700">{perk}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* RIGHT COLUMN: COUNTDOWN & ACTION */}
				<div className="lg:col-span-4 space-y-6">
					{/* Countdown Display */}
					<div className="bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-xl text-center">
						<p className="text-[10px] font-black uppercase tracking-[3px] text-green-400 mb-4">
							Departure In:
						</p>
						<div className="flex justify-around items-center">
							<TimeBox label="Days" value={timeLeft.days} />
							<TimeBox label="Hours" value={timeLeft.hours} />
							<TimeBox label="Mins" value={timeLeft.minutes} />
							<TimeBox label="Secs" value={timeLeft.seconds} />
						</div>
					</div>

					{/* Pricing & Button Card */}
					<div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
						<p className="text-gray-400 font-bold text-xs uppercase mb-1">
							Price per person
						</p>
						<h2
							className="text-5xl font-black mb-8"
							style={{color: brandGreen}}
						>
							${ticket.price}
						</h2>

						<button
							disabled={isDisabled}
							onClick={() => setIsModalOpen(true)}
							className={`w-full py-5 rounded-[1.5rem] text-white text-xl font-black shadow-lg transition-all ${
								isDisabled
									? "bg-gray-400 cursor-not-allowed"
									: "hover:scale-[1.02] active:scale-95"
							}`}
							style={{backgroundColor: isDisabled ? undefined : brandGreen}}
						>
							{isDisabled ? "Not Available" : "Book Now"}
						</button>
						<p className="mt-4 text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest flex items-center justify-center gap-1">
							<ShieldCheck size={12} /> Secure Payment Guaranteed
						</p>
					</div>
				</div>
			</main>

			{/* --- BOOKING MODAL --- */}
			{isModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
					<div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
						<div className="p-8">
							<div className="flex justify-between items-center mb-6">
								<h3 className="text-2xl font-black text-gray-900">
									Confirm Booking
								</h3>
								<button
									onClick={() => setIsModalOpen(false)}
									className="text-gray-400 hover:text-black"
								>
									<X />
								</button>
							</div>

							<form onSubmit={handleConfirmBooking} className="space-y-6">
								<div className="bg-gray-50 p-4 rounded-2xl space-y-2">
									<p className="text-sm font-bold text-gray-500">
										Ticket:{" "}
										<span className="text-black">{ticket.TicketTitle}</span>
									</p>
									<p className="text-sm font-bold text-gray-500">
										Price: <span className="text-black">${ticket.price}</span>
									</p>
								</div>

								<div>
									<label className="block text-sm font-black text-gray-700 mb-2">
										Desired Quantity (Max: {ticket.quantity})
									</label>
									<input
										type="number"
										required
										value={bookingQty}
										onChange={handleQtyChange}
										className="w-full p-4 bg-white border-2 border-gray-100 rounded-2xl text-xl font-bold focus:border-[#079d49] outline-none transition-all"
										min="1"
										max={ticket.quantity}
									/>
								</div>

								<div className="flex justify-between items-center py-2">
									<span className="text-gray-500 font-bold">Total Amount:</span>
									<span className="text-2xl font-black text-[#079d49]">
										${ticket.price * bookingQty}
									</span>
								</div>

								<button
									type="submit"
									className="w-full py-4 rounded-2xl text-white text-lg font-black transition-all hover:brightness-110 active:scale-95 shadow-lg"
									style={{backgroundColor: brandGreen}}
								>
									Confirm & Save Booking
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

// Countdown Helper
const TimeBox = ({label, value}) => (
	<div className="flex flex-col">
		<span className="text-2xl font-black">
			{value.toString().padStart(2, "0")}
		</span>
		<span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">
			{label}
		</span>
	</div>
);

export default TicketDetails;
