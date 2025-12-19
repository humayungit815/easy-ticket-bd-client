import React from "react";
import {
	ShieldCheck,
	Zap,
	Headset,
	Banknote,
	CheckCircle2,
	Globe2,
} from "lucide-react";

const WhyChooseUs = () => {
	const brandGreen = "#079d49";

	const features = [
		{
			icon: <ShieldCheck size={32} />,
			title: "Secure Transactions",
			desc: "Every booking is protected by industry-leading SSL encryption and secure payment gateways like SSLCommerz.",
		},
		{
			icon: <Zap size={32} />,
			title: "Instant E-Tickets",
			desc: "No more waiting. Receive your digital ticket via email and SMS immediately after successful payment.",
		},
		{
			icon: <Headset size={32} />,
			title: "24/7 Priority Support",
			desc: "Our dedicated support team is available round the clock to help you with cancellations or rescheduling.",
		},
		{
			icon: <Banknote size={32} />,
			title: "Transparent Pricing",
			desc: "What you see is what you pay. No hidden service charges or surprise convenience fees at checkout.",
		},
	];

	return (
		<section className="py-20 overflow-hidden">
			<div className="max-w-7xl mx-auto px-6 bg-white p-10 rounded-2xl">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
					{/* LEFT CONTENT: Headline & Context */}
					<div className="lg:col-span-5 space-y-8">
						<div>
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 mb-4">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#079d49] opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-[#079d49]"></span>
								</span>
								<span className="text-[10px] font-black uppercase tracking-widest text-[#079d49]">
									Trust & Reliability
								</span>
							</div>
							<h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1]">
								Why Travelers <br />
								<span style={{color: brandGreen}}>Choose Easy-Ticket</span>
							</h2>
						</div>

						<p className="text-gray-500 text-lg font-medium leading-relaxed">
							We've simplified the travel booking experience for thousands of
							commuters across Bangladesh. Our platform combines speed with the
							highest safety standards.
						</p>

						<ul className="space-y-4">
							{[
								"100% Verified Vendors",
								"Real-time Seat Tracking",
								"Easy Refund Policy",
							].map((item, i) => (
								<li
									key={i}
									className="flex items-center gap-3 font-bold text-slate-800"
								>
									<CheckCircle2 size={20} style={{color: brandGreen}} /> {item}
								</li>
							))}
						</ul>

						<div className="pt-4">
							<button
								style={{backgroundColor: brandGreen}}
								className="px-8 py-4 rounded-2xl text-white font-black shadow-xl shadow-green-900/20 hover:scale-105 transition-all flex items-center gap-3"
							>
								<Globe2 size={20} /> Get Started Now
							</button>
						</div>
					</div>

					{/* RIGHT CONTENT: Features Grid */}
					<div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
						{features.map((f, idx) => (
							<div
								key={idx}
								className={`p-10 rounded-[2.5rem] transition-all duration-500 border group ${
									idx === 1
										? "bg-slate-900 text-white border-slate-800"
										: "bg-gray-50 border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50"
								}`}
							>
								<div
									className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:-rotate-6 ${
										idx === 1
											? "bg-[#079d49]/20 text-[#079d49]"
											: "bg-white text-[#079d49] shadow-sm"
									}`}
								>
									{f.icon}
								</div>
								<h3
									className={`text-xl font-black mb-3 ${
										idx === 1 ? "text-white" : "text-slate-900"
									}`}
								>
									{f.title}
								</h3>
								<p
									className={`text-sm leading-relaxed font-medium ${
										idx === 1 ? "text-gray-400" : "text-gray-500"
									}`}
								>
									{f.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
