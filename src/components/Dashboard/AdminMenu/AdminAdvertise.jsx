import {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";


const AdminAdvertise = () => {
	const [tickets, setTickets] = useState([]);
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		axiosSecure.get("/admin/approved-tickets").then(res => {
			setTickets(res.data);
		});
	}, [axiosSecure]);

	const handleAdvertiseToggle = async id => {
		try {
			const res = await axiosSecure.patch(`/admin/advertise/${id}`);
			if (res.data.success) {
				setTickets(prev =>
					prev.map(ticket =>
						ticket._id === id
							? {...ticket, isAdvertised: !ticket.isAdvertised}
							: ticket
					)
				);
			}
		} catch (err) {
			toast.error(err.response?.data?.error || "Action failed");
		}
	};
	return (
		<div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
			<header className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900 border-b pb-2">
					Admin Advertise Tickets
				</h1>
				<p className="mt-2 text-gray-600">
					Manage and advertise approved tickets displayed on the homepage.
				</p>
			</header>

			<div className="bg-white shadow-lg rounded-xl overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Ticket ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Subject / Title
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Submitted By
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Status
								</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
									Advertise
								</th>
							</tr>
						</thead>

						<tbody className="bg-white divide-y divide-gray-200">
							{tickets.map(ticket => (
								<tr
									key={ticket._id}
									className="hover:bg-indigo-50/25 transition duration-150"
								>
									<td className="px-6 py-4 text-sm font-medium text-gray-900">
										#{ticket._id.slice(-6)}
									</td>

									<td className="px-6 py-4 text-sm text-gray-700">
										{ticket.TicketTitle}
									</td>

									<td className="px-6 py-4 text-sm text-gray-700">
										{ticket.vendorEmail}
									</td>

									<td className="px-6 py-4">
										<span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
											Approved
										</span>
									</td>

									<td className="px-6 py-4 text-sm text-center">
										<label className="relative inline-flex items-center cursor-pointer">
											<input
												type="checkbox"
												className="sr-only peer"
												checked={ticket.isAdvertised}
												onChange={() => handleAdvertiseToggle(ticket._id)}
											/>
											<div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>

											<span className="ml-3 text-sm font-medium text-gray-900 hidden sm:inline">
												{ticket.isAdvertised ? "Advertised" : "Unadvertised"}
											</span>
										</label>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AdminAdvertise;
