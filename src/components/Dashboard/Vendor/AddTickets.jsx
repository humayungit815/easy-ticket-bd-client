import axios from "axios";
import React from "react";
import {useForm} from "react-hook-form";

const AddTickets = () => {
	const {
		register,
		handleSubmit,
		// formState: {errors},
	} = useForm();

	const onSubmit = async data => {
		console.log(data);
		const {image} = data;
		// image upload
		const imageFile = image[0];
		console.log(imageFile);
		const formData = new FormData();
		formData.append("image", imageFile);

		const imageData = await axios.post(
			"https://api.imgbb.com/1/upload?key=c5a52ad5907dccc6e55ce92b6444034b",
			formData
		);
		const displayImage = imageData.data.data.display_url;
		console.log(displayImage);
		//  Prepare object to send ----------
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

			// Add verification status here
			verificationStatus: "pending",
		};
		console.log("after image upload ticketInfo", ticketInfo);
		//  Send to Backend ----------
		const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(ticketInfo),
		});

		const result = await res.json();
		console.log(result);
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
							defaultValue="Vendor Name"
							// readOnly
							className="input input-bordered w-full"
						/>
						<input
							{...register("vendorEmail")}
							type="email"
							defaultValue="vendor@gmail.com"
							// readOnly
							className="input input-bordered w-full"
						/>
					</div>

					{/* Submit */}
					<button
						type="submit"
						// disabled={loading}
						className="btn btn-primary w-full"
					>
						Add Ticket
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddTickets;
