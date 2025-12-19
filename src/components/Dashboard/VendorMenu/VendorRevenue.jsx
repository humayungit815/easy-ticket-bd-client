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
import {Wallet, Ticket, PlusCircle, TrendingUp, DollarSign} from "lucide-react";

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
	const {user} = useAuth();
	const axiosSecure = useAxiosSecure();
	const [data, setData] = useState(null);
	const brandGreen = "#079d49";

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

	if (!data)
		return (
			<div className="flex h-[60vh] items-center justify-center">
				<div className="flex flex-col items-center gap-3">
					<div className="w-10 h-10 border-4 border-t-[#079d49] border-gray-100 rounded-full animate-spin"></div>
					<p className="text-xs font-black uppercase tracking-widest text-gray-400">
						Loading Analytics...
					</p>
				</div>
			</div>
		);

	const barData = {
		labels: ["Revenue", "Tickets Sold", "Tickets Added"],
		datasets: [
			{
				label: "Performance",
				data: [
					Number(data?.totalRevenue) || 0,
					Number(data?.totalTicketsSold) || 0,
					Number(data?.totalTicketsAdded) || 0,
				],
				backgroundColor: [brandGreen, "#3b82f6", "#f59e0b"],
				borderRadius: 12,
				barThickness: 40,
			},
		],
	};

	const COLORS = [
		brandGreen,
		"#3b82f6",
		"#f59e0b",
		"#ef4444",
		"#8b5cf6",
		"#f97316",
	];

	const pieData = {
		labels: data?.transactions?.map(tx => tx.ticketTitle) || [],
		datasets: [
			{
				data: data?.transactions?.map(tx => tx.amount) || [],
				backgroundColor: COLORS,
				borderWidth: 0,
				hoverOffset: 20,
			},
		],
	};

	return (
		<div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* 1. Header Section */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-4xl font-black text-slate-900 tracking-tighter">
						Revenue <span style={{color: brandGreen}}>Analytics</span>
					</h1>
					<p className="text-gray-400 font-bold text-xs uppercase tracking-[3px] mt-1">
						Real-time performance tracking
					</p>
				</div>
				<div className="px-4 py-2 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-2">
					<TrendingUp size={16} className="text-[#079d49]" />
					<span className="text-[10px] font-black uppercase text-[#079d49]">
						Live Updates Enabled
					</span>
				</div>
			</div>

			{/* 2. Top Stats Row */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<StatCard
					title="Total Revenue"
					value={`৳${data.totalRevenue}`}
					icon={<Wallet size={24} />}
					color="#079d49"
				/>
				<StatCard
					title="Tickets Sold"
					value={data.totalTicketsSold}
					icon={<Ticket size={24} />}
					color="#3b82f6"
				/>
				<StatCard
					title="Tickets Added"
					value={data.totalTicketsAdded}
					icon={<PlusCircle size={24} />}
					color="#f59e0b"
				/>
			</div>

			{/* 3. Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
				{/* Bar Chart - Visual Growth */}
				<div className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
							Performance Metrics
						</h2>
						<div className="p-2 bg-gray-50 rounded-lg">
							<TrendingUp size={16} className="text-gray-400" />
						</div>
					</div>
					<div className="h-[300px] flex items-center justify-center">
						<Bar
							data={barData}
							options={{
								maintainAspectRatio: false,
								plugins: {legend: {display: false}},
							}}
						/>
					</div>
				</div>

				{/* Pie Chart - Distribution */}
				<div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
							Revenue Split
						</h2>
						<div className="p-2 bg-gray-50 rounded-lg">
							<DollarSign size={16} className="text-gray-400" />
						</div>
					</div>
					<div className="h-[300px] flex items-center justify-center">
						<Pie
							data={pieData}
							options={{
								maintainAspectRatio: false,
								plugins: {
									legend: {
										position: "bottom",
										labels: {
											usePointStyle: true,
											font: {weight: "bold", size: 10},
										},
									},
								},
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

// Internal Helper Component for Stats
const StatCard = ({title, value, icon, color}) => (
	<div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500">
		<div className="flex items-center justify-between">
			<div className="space-y-2">
				<p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
					{title}
				</p>
				<h3 className="text-3xl font-black text-slate-900 tracking-tight">
					{value}
				</h3>
			</div>
			<div
				className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
				style={{backgroundColor: `${color}15`, color: color}}
			>
				{icon}
			</div>
		</div>
	</div>
);

export default VendorRevenue;
