import React from "react";
import {Link, useNavigate} from "react-router";
import {Home, ArrowLeft, AlertCircle} from "lucide-react";

const ErrorPage = () => {
	const navigate = useNavigate();
	const brandGreen = "#079d49";

	return (
		<div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-6 font-sans">
			<div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
				{/* Visual Section */}
				<div className="relative">
					<h1 className="text-[150px] md:text-[200px] font-black text-slate-900 leading-none opacity-5">
						404
					</h1>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-white mb-4 transform -rotate-6">
							<AlertCircle
								size={64}
								style={{color: brandGreen}}
								strokeWidth={2.5}
							/>
						</div>
					</div>
				</div>

				{/* Text Section */}
				<div className="space-y-3">
					<h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
						Lost in <span style={{color: brandGreen}}>Transit?</span>
					</h2>
					<p className="text-gray-500 font-medium max-w-md mx-auto text-sm md:text-base">
						The page you're looking for has been moved, deleted, or never
						existed. Let's get you back on the right track.
					</p>
				</div>

				{/* Buttons Section */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
					<button
						onClick={() => navigate(-1)}
						className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group shadow-sm"
					>
						<ArrowLeft
							size={20}
							className="group-hover:-translate-x-1 transition-transform"
						/>
						Go Back
					</button>

					<Link
						to="/"
						style={{backgroundColor: brandGreen}}
						className="w-full sm:w-auto px-8 py-4 text-white font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-900/20"
					>
						<Home size={20} />
						Return Home
					</Link>
				</div>

				
				<p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] pt-8">
					EasyTicket • Error System v2.0
				</p>
			</div>
		</div>
	);
};

export default ErrorPage;
