import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {toast} from "react-toastify";
import useAuth from "../../hooks/useAuth";

const TicketDetails = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();
	const [ticket, setTicket] = useState(null);
	const [loading, setLoading] = useState(true);
	const [bookingQty, setBookingQty] = useState(1);
	const {user} = useAuth();

	// Fetch ticket details
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

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-lg font-semibold text-gray-600">Loading...</p>
			</div>
		);
	}

	if (!ticket) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-lg font-semibold text-red-600">Ticket not found</p>
			</div>
		);
	}

	// Disable condition for "Book Now" button
	const isDisabled =
		new Date(ticket.departure) < new Date() || ticket.quantity === 0;

	// Booking quantity input handler
	const handleQtyChange = e => {
		let value = parseInt(e.target.value);
		if (value > ticket.quantity) value = ticket.quantity;
		if (value < 1) value = 1;
		setBookingQty(value);
	};

	// Handle Booking button
	const handleBooking = async () => {
		if (bookingQty > ticket.quantity) {
			toast.error("Booking quantity can't exceed available tickets");
			return;
		}

		const bookingData = {
			ticketId: ticket._id,
			vendorEmail: ticket.vendorEmail,
			ticketTitle: ticket.TicketTitle,
			userName: user.displayName,
			userEmail: user.email,
			image: ticket.image,
			unitPrice: ticket.price,
			bookingQty,
			totalPrice: ticket.price * bookingQty,
			fromLocation: ticket.fromLocation,
			toLocation: ticket.toLocation,
			departure: ticket.departure,
		};

		try {
			const res = await axiosSecure.post("/bookings", bookingData);
			if (res.data.insertedId) {
				toast.success("Booking request sent!");
				// navigate("/dashboard/my-bookings");
			}
		} catch (err) {
			console.error(err);
			toast.error("Booking failed. Try again.");
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<button
				onClick={() => navigate(-1)}
				className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-semibold shadow"
			>
				← Back
			</button>

			<div className="bg-white shadow-md rounded-xl overflow-hidden">
				<img
					src={ticket.image}
					alt={ticket.TicketTitle}
					className="w-full h-64 object-cover"
				/>

				<div className="p-6">
					<h1 className="text-2xl font-bold mb-2">{ticket.TicketTitle}</h1>
					<p className="text-gray-600 mb-2">
						<span className="font-semibold">From → To:</span>{" "}
						{ticket.fromLocation} → {ticket.toLocation}
					</p>
					<p className="text-gray-600 mb-2">
						<span className="font-semibold">Transport:</span>{" "}
						{ticket.transportType}
					</p>
					<p className="text-gray-600 mb-2">
						<span className="font-semibold">Price:</span> ৳{ticket.price} |{" "}
						<span className="font-semibold">Available:</span> {ticket.quantity}
					</p>
					<p className="text-gray-600 mb-4">
						<span className="font-semibold">Departure:</span>{" "}
						{new Date(ticket.departure).toLocaleString("en-US", {
							weekday: "short",
							year: "numeric",
							month: "short",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>

					{/* Perks */}
					<div className="flex flex-wrap gap-2 mb-4">
						{ticket.perks?.map((perk, idx) => (
							<span
								key={idx}
								className={`text-xs px-3 py-1 rounded-full font-medium ${
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

					{/* Booking Quantity */}
					<div className="mb-4">
						<label className="mr-2 font-semibold">Booking Quantity:</label>
						<input
							type="number"
							value={bookingQty}
							onChange={handleQtyChange}
							className="border rounded px-2 py-1 w-24"
						/>
					</div>

					{/* Book Now Button */}
					<button
						className={`px-4 py-2 rounded-md text-white w-full ${
							isDisabled
								? "bg-gray-400 cursor-not-allowed"
								: "bg-blue-600 hover:bg-blue-700"
						}`}
						disabled={isDisabled}
						onClick={handleBooking}
					>
						Book Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default TicketDetails;
