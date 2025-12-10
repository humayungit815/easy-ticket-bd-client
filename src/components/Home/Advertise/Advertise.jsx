import React from "react";

const Advertise = () => {
	return (
		<div className="max-w-sm mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-[1.02] hover:shadow-3xl border border-gray-100">
			{/* 1. Image Section */}
			<div className="h-48 overflow-hidden">
				<img
					className="w-full h-full object-cover transition duration-300 ease-in-out hover:opacity-90"
					src={``}
					
				/>
			</div>

			<div className="p-6">
				{/* 2. Ticket Title */}
				<h2 className="text-2xl font-extrabold text-indigo-700 mb-2 truncate">
				title
				</h2>

				{/* Price & Quantity Grid */}
				<div className="grid grid-cols-2 gap-4 my-3 pb-3 border-b border-gray-200">
					<div>
						{/* 3. Price (per unit) */}
						<p className="text-sm font-medium text-gray-500 uppercase">
							Price (Per Unit)
						</p>
						<p className="text-3xl font-bold text-green-600">
							90$
						</p>
					</div>
					<div>
						{/* 4. Ticket Quantity */}
						<p className="text-sm font-medium text-gray-500 uppercase">
							Available
						</p>
						<p className="text-3xl font-bold text-gray-800">quantity</p>
					</div>
				</div>

				{/* 5. Transport Type */}
				<div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
					<span className="mr-2 text-indigo-500">
						train
					</span>
					transport
				</div>

				{/* 6. Perks List */}
				<p className="text-md font-bold text-gray-700 mb-2">Key Perks:</p>
				<ul className="list-none space-y-1 text-sm text-gray-600 mb-5 pl-0">
					perks
				</ul>

				{/* 7. "See details" Button */}
				<button
					className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300"
					
				>
					See details
				</button>
			</div>
		</div>
	);
};

export default Advertise;
