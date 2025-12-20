import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {toast} from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const RequestedBookings = () => {
	const [requests, setRequests] = useState([]);
	const axiosSecure = useAxiosSecure();
	const {user} = useAuth();

	// Fetch all booking requests
	useEffect(() => {
		if (!user?.email) return;

		axiosSecure
			.get(`/vendor/bookings`, {
				headers: {"Cache-Control": "no-cache"},
			})
			.then(res => setRequests(res.data))
			.catch(err => console.error("Error fetching bookings:", err));
	}, [axiosSecure, user?.email]);
	console.log(requests);
	// Accept a booking request
	const handleAccepted = async id => {
		try {
			const res = await axiosSecure.patch(`/bookings/accept/${id}`);
			if (res.data.modifiedCount > 0) {
				toast.success("Request Accepted!");
				setRequests(prev =>
					prev.map(request =>
						request._id === id ? {...request, status: "accepted"} : request
					)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Reject a booking request
	const handleRejected = async id => {
		try {
			const res = await axiosSecure.patch(`/bookings/reject/${id}`);
			if (res.data.modifiedCount > 0) {
				toast.error("Request Rejected!");
				setRequests(prev =>
					prev.map(request =>
						request._id === id ? {...request, status: "rejected"} : request
					)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="p-8">
			<h2 className="text-3xl font-bold mb-6 text-gray-800">
				Requested Bookings
			</h2>

			<div className=" bg-white shadow-lg rounded-xl overflow-x-scroll">
				<table className="min-w-full text-left text-sm">
					<thead className="bg-gray-100 text-gray-700 text-sm uppercase">
						<tr>
							<th className="px-6 py-3">#</th>
							<th className="px-6 py-3">User Name</th>
							<th className="px-6 py-3">Ticket Title</th>
							<th className="px-6 py-3">Booking Quantity</th>
							<th className="px-6 py-3">Unit Price</th>
							<th className="px-6 py-3">Total Price</th>
							<th className="px-6 py-3">From → To</th>
							<th className="px-6 py-3">Departure</th>
							<th className="px-6 py-3 text-center">Actions</th>
						</tr>
					</thead>

					<tbody>
						{requests.length === 0 && (
							<tr>
								<td colSpan="9" className="text-center py-4 text-gray-500">
									No booking requests found.
								</td>
							</tr>
						)}

						{requests.map((request, index) => (
							<tr
								key={request._id}
								className="border-b font-medium border-b-gray-300 hover:bg-gray-50"
							>
								<td className="px-6 py-4">{index + 1}</td>
								<td className="px-6 py-4 font-semibold">{request.userName}</td>
								<td className="px-6 py-4">{request.ticketTitle}</td>
								<td className="px-6 py-4">{request.bookingQty}</td>
								<td className="px-6 py-4">${request.unitPrice}</td>
								<td className="px-6 py-4">${request.totalPrice}</td>
								<td className="px-6 py-4">
									{request.fromLocation} → {request.toLocation}
								</td>
								<td className="px-6 py-4">
									{new Date(request.departure).toLocaleString("en-US", {
										weekday: "short",
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</td>

								<td className="px-6 py-4 flex gap-3 justify-center">
									{request.status === "pending" ? (
										<>
											<button
												onClick={() => handleAccepted(request._id)}
												className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm shadow"
											>
												Approve
											</button>
											<button
												onClick={() => handleRejected(request._id)}
												className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm shadow"
											>
												Reject
											</button>
										</>
									) : (
										<span
											className={`px-3 py-1 text-xs rounded-full font-semibold ${
												request.status === "accepted"
													? "bg-green-200 text-green-700"
													: "bg-red-200 text-red-700"
											}`}
										>
											{request.status.charAt(0).toUpperCase() +
												request.status.slice(1)}
										</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default RequestedBookings;
