import React, {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BookingCard = ({booking}) => {
	const {user} = useAuth();
	const axiosSecure = useAxiosSecure();
	const [timeLeft, setTimeLeft] = useState(
		Math.max(new Date(booking.departure) - new Date(), 0)
	);

	useEffect(() => {
		const interval = setInterval(() => {
			const diff = Math.max(new Date(booking.departure) - new Date(), 0);
			setTimeLeft(diff);
		}, 1000);

		return () => clearInterval(interval);
	}, [booking.departure]);

	const isExpired = timeLeft === 0;

	const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
	const seconds = Math.floor((timeLeft / 1000) % 60);

	const handlePayment = async () => {
		try {
			// Booking data prepare
			const paymentInfo = {
				bookingId: booking._id,
				ticketTitle: booking.ticketTitle,
				unitPrice: Number(booking.unitPrice),
				totalPrice: Number(booking.totalPrice),
				bookingQty: Number(booking.bookingQty),
				image: booking.image,
				customer: {
					name: user.displayName,
					email: user.email,
					image: user.photoURL,
				},
				vendorEmail: booking.vendorEmail,
			};

			// Send request to backend
			const {data} = await axiosSecure.post(
				"/create-checkout-session",
				paymentInfo
			);

			// Redirect to Stripe checkout
			window.location.href = data.url;
		} catch (error) {
			console.error("Payment failed:", error);
		}
	};

	return (
		<div className="bg-white shadow-md rounded-xl overflow-hidden">
			<img
				src={booking.image}
				alt={booking.ticketTitle}
				className="w-full h-48 object-cover"
			/>

			<div className="p-4">
				<h2 className="text-lg font-semibold">{booking.ticketTitle}</h2>

				<p className="text-sm text-gray-600">
					{booking.fromLocation} → {booking.toLocation}
				</p>

				<p className="text-sm">Qty: {booking.bookingQty}</p>
				<p className="text-sm">Total: ৳{booking.totalPrice}</p>

				<p className="text-sm">
					Departure: {new Date(booking.departure).toLocaleString()}
				</p>

				<p className="text-sm font-semibold mb-2">
					Status:{" "}
					<span
						className={
							booking.status === "accepted"
								? "text-green-600"
								: booking.status === "pending"
								? "text-yellow-600"
								: "text-red-600"
						}
					>
						{booking.status}
					</span>
				</p>

				<p className="text-xs text-gray-500 mb-3">
					Countdown: {days}d {hours}h {minutes}m {seconds}s
				</p>

				{booking.status === "accepted" && (
					<button
						onClick={handlePayment}
						disabled={isExpired}
						className={`px-4 py-2 text-sm rounded text-white ${
							isExpired
								? "bg-gray-400 cursor-not-allowed"
								: "bg-green-600 hover:bg-green-700"
						}`}
					>
						Pay Now
					</button>
				)}
			</div>
		</div>
	);
};

export default BookingCard;
