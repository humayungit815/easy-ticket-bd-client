import axios from "axios";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {toast} from "react-toastify";

const AddTickets = () => {
	const {user} = useAuth();
	const [loading, setLoading] = useState(false);
	const {register, handleSubmit, reset} = useForm();

	const axiosSecure = useAxiosSecure();

	const onSubmit = async data => {
		try {
			setLoading(true);

			const imageFile = data.image[0];
			const formData = new FormData();
			formData.append("image", imageFile);

			//  Upload image
			const imageData = await axios.post(
				"https://api.imgbb.com/1/upload?key=c5a52ad5907dccc6e55ce92b6444034b",
				formData
			);

			const displayImage = imageData.data.data.display_url;

			//  Prepare ticket object
			const ticketInfo = {
				TicketTitle: data.TicketTitle,
				fromLocation: data.fromLocation,
				toLocation: data.toLocation,
				transportType: data.transportType,
				price: parseFloat(data.price),
				quantity: parseInt(data.quantity),
				departure: data.departure,
				perks: data.perks || [],
				image: displayImage,
				vendorName: data.vendorName,
				vendorEmail: data.vendorEmail,
				isHidden: false,
				isAdvertised: false,
				createdAt: new Date(),
				verificationStatus: "pending",
			};

			
			const res = await axiosSecure.post("/tickets", ticketInfo);

			if (res.data?.insertedId) {
				toast.success("Your Add Tickets Request Send Successfully!");
				reset(); // ✅ form reset
				// optional: toast.success("Ticket added successfully");
			}
		} catch (error) {
			console.error("Error adding ticket:", error);
		} finally {
			setLoading(false); // 🔚 stop loading (success or error)
		}
	};

	return (
		<div>
			<div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
				<h1 className="text-2xl font-bold mb-6 text-center">Add New Ticket</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Ticket Title */}
					<input
						{...register("TicketTitle", {required: true})}
						type="text"
						placeholder="Ticket Title"
						className="input input-bordered w-full"
					/>

					{/* From - To */}
					<div className="grid grid-cols-2 gap-4">
						<input
							{...register("fromLocation", {required: true})}
							type="text"
							placeholder="From (Location)"
							className="input input-bordered w-full"
						/>
						<input
							{...register("toLocation", {required: true})}
							type="text"
							placeholder="To (Location)"
							className="input input-bordered w-full"
						/>
					</div>

					{/* Transport Type */}
					<select
						{...register("transportType", {required: true})}
						className="select select-bordered w-full"
					>
						<option value="">Select Transport Type</option>
						<option value="Bus">Bus</option>
						<option value="Train">Train</option>
						<option value="Launch">Launch</option>
						<option value="Plane">Plane</option>
					</select>

					{/* Price & Quantity */}
					<div className="grid grid-cols-2 gap-4">
						<input
							{...register("price", {required: true})}
							type="number"
							placeholder="Price (per unit)"
							className="input input-bordered w-full"
						/>
						<input
							{...register("quantity", {required: true})}
							type="number"
							placeholder="Ticket Quantity"
							className="input input-bordered w-full"
						/>
					</div>

					{/* Departure Date & Time */}
					<input
						{...register("departure", {required: true})}
						type="datetime-local"
						className="input input-bordered w-full"
					/>

					{/* Perks Checkbox */}
					<p className="font-semibold">Perks:</p>
					<div className="grid grid-cols-3 gap-2">
						<label className="flex items-center gap-2">
							<input type="checkbox" value="AC" {...register("perks")} /> AC
						</label>

						<label className="flex items-center gap-2">
							<input type="checkbox" value="Breakfast" {...register("perks")} />{" "}
							Breakfast
						</label>

						<label className="flex items-center gap-2">
							<input type="checkbox" value="Snacks" {...register("perks")} />{" "}
							Snacks
						</label>
					</div>

					{/* Image Upload */}
					<input
						{...register("image", {required: true})}
						type="file"
						className="file-input file-input-bordered w-full"
					/>

					{/* Vendor Name & Email (Readonly) */}
					<div className="grid grid-cols-2 gap-4">
						<input
							{...register("vendorName")}
							type="text"
							defaultValue={user?.displayName || ""}
							readOnly
							className="input input-bordered w-full"
						/>
						<input
							{...register("vendorEmail")}
							type="email"
							defaultValue={user?.email || ""}
							readOnly
							className="input input-bordered w-full"
						/>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={loading}
						className="btn bg-[#079d49] text-white w-full"
					>
						{loading ? (
							<span className="loading loading-spinner loading-sm"></span>
						) : (
							"Add Ticket"
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddTickets;
