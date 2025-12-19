import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useParams, useNavigate} from "react-router";
import {toast} from "react-toastify";
import {
	Save,
	ArrowLeft,
	Image as ImageIcon,
	MapPin,
	Bus,
	Calendar,
	DollarSign,
	Package,
} from "lucide-react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateTicket = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();
	const {register, handleSubmit, reset} = useForm();
	const [loading, setLoading] = useState(false);
	const [existingTicket, setExistingTicket] = useState(null);

	// 1. Fetch existing data and Load into Form
	useEffect(() => {
		axiosSecure
			.get(`/tickets/${id}`)
			.then(res => {
				setExistingTicket(res.data);
				reset(res.data); // This fills the form fields automatically
			})
			.catch(err => console.error("Error fetching ticket:", err));
	}, [axiosSecure, id, reset]);

	const onSubmit = async data => {
		setLoading(true);
		try {
			let displayImage = existingTicket.image; // Keep old image by default

			// 2. Only upload new image if user selected a file
			if (data.image && data.image[0]) {
				const formData = new FormData();
				formData.append("image", data.image[0]);
				const imageData = await axios.post(
					`https://api.imgbb.com/1/upload?key=c5a52ad5907dccc6e55ce92b6444034b`,
					formData
				);
				displayImage = imageData.data.data.display_url;
			}

			const updatedInfo = {
				TicketTitle: data.TicketTitle,
				fromLocation: data.fromLocation,
				toLocation: data.toLocation,
				transportType: data.transportType,
				price: parseFloat(data.price),
				quantity: parseInt(data.quantity),
				departure: data.departure,
				perks: data.perks || [],
				image: displayImage,
				updatedAt: new Date(),
			};

			const res = await axiosSecure.put(`/tickets/${id}`, updatedInfo);
			if (res.data.modifiedCount > 0) {
				toast.success("Ticket Updated Successfully!");
				navigate("/dashboard/my-added-tickets");
			}
		} catch (error) {
			console.error(error);
			toast.error("Update failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (!existingTicket)
		return (
			<div className="text-center py-20 font-bold uppercase tracking-widest text-gray-400 animate-pulse">
				Loading Ticket Data...
			</div>
		);

	return (
		<div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center gap-2 text-gray-400 hover:text-slate-900 font-bold transition-colors"
				>
					<ArrowLeft size={20} /> Back
				</button>
				<div className="text-right">
					<h1 className="text-3xl font-black text-slate-900 tracking-tighter">
						Update <span className="text-[#079d49]">Ticket</span>
					</h1>
					<p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
						ID: {id}
					</p>
				</div>
			</div>

			<div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="p-8 md:p-12 space-y-10"
				>
					{/* Route Section */}
					<div className="space-y-6">
						<div className="flex items-center gap-2 mb-4">
							<span className="w-1.5 h-6 rounded-full bg-[#079d49]" />
							<h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
								Route & Title
							</h3>
						</div>

						<div className="relative group">
							<Bus
								className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#079d49] transition-colors"
								size={20}
							/>
							<input
								{...register("TicketTitle", {required: true})}
								placeholder="Ticket Title"
								className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#079d49]/20 transition-all"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="relative group border-l-4 border-transparent focus-within:border-[#079d49] transition-all">
								<MapPin
									className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
									size={18}
								/>
								<input
									{...register("fromLocation", {required: true})}
									className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-slate-800"
								/>
							</div>
							<div className="relative group border-l-4 border-transparent focus-within:border-[#079d49] transition-all">
								<MapPin
									className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
									size={18}
								/>
								<input
									{...register("toLocation", {required: true})}
									className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-slate-800"
								/>
							</div>
						</div>
					</div>

					{/* Logistics Section */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
						<div className="space-y-4">
							<h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
								Logistics
							</h3>
							<select
								{...register("transportType")}
								className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#079d49]/20"
							>
								<option value="Bus">Bus</option>
								<option value="Train">Train</option>
								<option value="Launch">Launch</option>
								<option value="Plane">Plane</option>
							</select>
							<input
								type="datetime-local"
								{...register("departure")}
								className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-slate-800"
							/>
						</div>

						<div className="space-y-4">
							<h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
								Inventory
							</h3>
							<div className="flex gap-4">
								<div className="relative flex-1">
									<DollarSign
										className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
										size={16}
									/>
									<input
										type="number"
										{...register("price")}
										className="w-full pl-10 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold"
									/>
								</div>
								<div className="relative flex-1">
									<Package
										className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
										size={16}
									/>
									<input
										type="number"
										{...register("quantity")}
										className="w-full pl-10 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold"
									/>
								</div>
							</div>
							{/* Image input - not required on update */}
							<div className="relative flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-200">
								<img
									src={existingTicket.image}
									className="w-12 h-12 rounded-xl object-cover"
									alt="current"
								/>
								<input
									type="file"
									{...register("image")}
									className="text-[10px] font-bold text-gray-400 file:bg-[#079d49] file:text-white file:border-none file:px-3 file:py-1 file:rounded-lg file:mr-2"
								/>
							</div>
						</div>
					</div>

					{/* Perks Section */}
					<div className="space-y-4 pt-4">
						<h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
							Available Perks
						</h3>
						<div className="grid grid-cols-3 gap-4">
							{["AC", "Breakfast", "Snacks"].map(perk => (
								<label
									key={perk}
									className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-green-50 transition-colors"
								>
									<input
										type="checkbox"
										value={perk}
										{...register("perks")}
										className="checkbox checkbox-success rounded-lg"
									/>
									<span className="font-bold text-slate-700">{perk}</span>
								</label>
							))}
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full py-6 bg-[#079d49] text-white rounded-[2rem] font-black text-lg shadow-xl shadow-green-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
					>
						{loading ? (
							<span className="loading loading-spinner"></span>
						) : (
							<Save size={22} />
						)}
						{loading ? "Saving Changes..." : "Update Ticket Information"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateTicket;
