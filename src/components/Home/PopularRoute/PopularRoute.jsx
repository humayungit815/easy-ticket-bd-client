import React from "react";
import {MapPin, ArrowRight, Star, Users} from "lucide-react";

const PopularRoute = () => {
	const brandGreen = "#079d49";

	const popularData = [
		{
			id: 1,
			route: "Dhaka to Cox's Bazar",
			image: "https://i.ibb.co.com/xKJB1hnp/train-green-valley-summertime.jpg",
			price: "1,200",
			trips: "45+ Daily Trips",
			rating: "4.9",
			size: "large",
		},
		{
			id: 2,
			route: "Dhaka to Sylhet",
			image:
				"https://i.ibb.co.com/KjScr4pX/chris-yang-H73k0-IUQbn0-unsplash.jpg",
			price: "750",
			trips: "20+ Daily Trips",
			rating: "4.7",
			size: "small",
		},
		{
			id: 3,
			route: "Chittagong to Dhaka",
			image: "https://i.ibb.co.com/PVH89q3/login-Img1.jpg",
			price: "800",
			trips: "60+ Daily Trips",
			rating: "4.8",
			size: "small",
		},
	];

	return (
		<section className="py-24">
			<div className="max-w-7xl mx-auto px-6">
				
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="text-[10px] font-black uppercase tracking-[4px] text-gray-400 mb-4">
						Top Destinations
					</h2>
					<h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
						Most Popular <span style={{color: brandGreen}}>Routes</span>
					</h3>
					<p className="text-gray-500 font-medium">
						Join thousands of travelers booking these top-rated journeys every
						day. The best service at the most competitive prices.
					</p>
				</div>

				{/* Bento Grid Layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[550px]">
					{popularData.map(item => (
						<div
							key={item.id}
							className={`group relative overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer ${
								item.size === "large"
									? "lg:col-span-2 lg:row-span-2"
									: "lg:col-span-1"
							}`}
						>
							{/* Background Image */}
							<img
								src={item.image}
								alt={item.route}
								className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
							/>

							{/* Gradient Overlays */}
							<div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

							{/* Content */}
							<div className="absolute inset-0 p-8 flex flex-col justify-end">
								<div className="flex justify-between items-end">
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											
											<span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-white">
												<Users size={10} /> {item.trips}
											</span>
										</div>
										<h4
											className={`font-black text-white leading-tight ${
												item.size === "large" ? "text-3xl" : "text-xl"
											}`}
										>
											{item.route}
										</h4>
										<p className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
											Explore Route{" "}
											<ArrowRight
												size={14}
												className="group-hover:translate-x-2 transition-transform"
											/>
										</p>
									</div>

									<div className="text-right">
										<p className="text-[10px] font-black text-white/50 uppercase">
											From
										</p>
										<p className="text-2xl font-black text-white">
											${item.price}
										</p>
									</div>
								</div>
							</div>

							{/* Top Right Floating Badge */}
							<div className="absolute top-6 right-6">
								<div className="w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md bg-white/10 border border-white/20 group-hover:bg-[#079d49] group-hover:border-[#079d49] transition-all duration-300">
									<MapPin size={18} />
								</div>
							</div>
						</div>
					))}

					{/* Static Stats Card (Fills the last slot) */}
					<div className="lg:col-span-1 bg-green-200 border border-gray-100 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center space-y-4">
						<div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-2">
							<TrendingUpIcon brandGreen={brandGreen} />
						</div>
						<h4 className="text-2xl font-black text-slate-900 leading-tight">
							150+ <br /> New Routes
						</h4>
						<p className="text-gray-400 text-sm font-medium leading-relaxed">
							We are constantly adding new locations across Bangladesh.
						</p>
						<button
							style={{color: brandGreen}}
							className="text-sm font-black uppercase tracking-widest pt-2"
						>
							Request a Route
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

const TrendingUpIcon = ({brandGreen}) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke={brandGreen}
		strokeWidth="3"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
		<polyline points="17 6 23 6 23 12"></polyline>
	</svg>
);

export default PopularRoute;
