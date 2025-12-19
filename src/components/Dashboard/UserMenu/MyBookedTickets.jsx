import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookingCard from "./BookingCard";
import useAuth from "../../../hooks/useAuth";

const MyBookedTickets = () => {
	const [bookings, setBookings] = useState([]);
	const axiosSecure = useAxiosSecure();
	const {user} = useAuth();

	useEffect(() => {
		if (!user?.email) return;

		axiosSecure
			.get(`/bookings`, {
				headers: {"Cache-Control": "no-cache"},
			})
			.then(res => setBookings(res.data))
			.catch(err => console.error("Error fetching bookings:", err));
	}, [axiosSecure, user?.email]);

	return (
		<div className="max-w-7xl mx-auto p-6">
			<h1 className="text-4xl font-bold mb-6 text-center">
				My Booked <span className="text-[#079d49]">Tickets</span>{" "}
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{bookings.length === 0 ? (
					<p className="text-center col-span-full">No bookings found.</p>
				) : (
					bookings.map(booking => (
						<BookingCard key={booking._id} booking={booking} />
					))
				)}
			</div>
		</div>
	);
};

export default MyBookedTickets;
