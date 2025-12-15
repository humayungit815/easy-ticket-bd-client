import React, {useEffect, useState} from "react";
import {Bar, Pie} from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

const VendorRevenue = () => {
	const {user} = useAuth(); // Logged-in user
	const axiosSecure = useAxiosSecure();
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchRevenue = async () => {
			if (!user?.email) return;

			try {
				const res = await axiosSecure.get(
					`/vendor/revenue?email=${user.email}`
				);
				setData(res.data);
			} catch (err) {
				console.error("Error fetching revenue:", err);
			}
		};

		fetchRevenue();
	}, [axiosSecure, user?.email]);
	console.log(data);

	if (!data) return <p>Loading revenue...</p>;

	// Bar Chart for Revenue & Tickets Sold
	const barData = {
		labels: ["Revenue", "Tickets Sold", "Tickets Added"],
		datasets: [
			{
				label: "Vendor Stats",
				data: [
					Number(data?.totalRevenue) || 0,
					Number(data?.totalTicketsSold) || 0,
					Number(data?.totalTicketsAdded) || 0,
				],
				backgroundColor: ["#4ade80", "#60a5fa", "#facc15"],
			},
		],
	};
	console.log(data.totalRevenue, data.totalTicketsSold, data.totalTicketsAdded);

	// Optional: Pie chart showing revenue share by ticket title
	const COLORS = [
		"#4ade80",
		"#60a5fa",
		"#facc15",
		"#f87171",
		"#a78bfa",
		"#fb923c",
	];

	const pieData = {
		labels: data?.transactions?.map(tx => tx.ticketTitle) || [],
		datasets: [
			{
				label: "Revenue per Ticket",
				data: data?.transactions?.map(tx => tx.amount) || [],
				backgroundColor: COLORS.slice(0, data?.transactions?.length || 0),
			},
		],
	};

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6 text-center">Revenue Overview</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white p-6 rounded shadow">
					<h2 className="text-lg font-semibold mb-4">Stats</h2>
					<Bar data={barData} />
				</div>

				<div className="bg-white p-6 rounded shadow">
					<h2 className="text-lg font-semibold mb-4">Revenue by Ticket</h2>
					<Pie data={pieData} />
				</div>
			</div>

			<div className="mt-6">
				<h2 className="text-lg font-semibold mb-4">Summary</h2>
				<p>Total Revenue: ${data.totalRevenue}</p>
				<p>Total Tickets Sold: {data.totalTicketsSold}</p>
				<p>Total Tickets Added: {data.totalTicketsAdded}</p>
			</div>
		</div>
	);
};

export default VendorRevenue;
