import React from "react";

const About = () => {
	return (
		<section class="py-16  overflow-hidden" id="about">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="relative lg:flex lg:items-center lg:gap-12 mb-20">
					<div class="lg:w-1/2">
						<h2 class="text-[#079d49] font-bold tracking-wide uppercase text-sm mb-2">
							Our Journey
						</h2>
						<h3 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
							Making Every Journey Simple, Fast, and Accessible.
						</h3>
						<p class="text-lg text-gray-600 mb-6">
							At <span class="text-[#079d49] font-bold">TicketBari</span>,
							we believe that traveling shouldn't be a hassle. Founded in 2025,
							we set out to build a platform where booking a seat on a bus,
							train, launch, or flight is as easy as sending a message.
						</p>
						<p class="text-lg text-gray-600">
							Our platform bridges the gap between travelers and transport
							providers, offering a secure and transparent environment to plan
							your trips with absolute confidence.
						</p>
					</div>

					<div class="mt-12 lg:mt-0 lg:w-1/2 relative">
						<div class="absolute -top-6 -right-6 w-64 h-64 bg-[#079d49]/10 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
						<img
							class="relative rounded-2xl shadow-2xl w-full object-cover h-96 border-l-8 border-[#079d49]"
							src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
							alt="Sustainable Travel"
						/>
					</div>
				</div>

				<div class="bg-[#079d49] rounded-2xl shadow-xl p-8 sm:p-12 mb-20 transform -rotate-1 lg:-rotate-0">
					<div class="grid grid-cols-2 gap-y-8 md:grid-cols-4 text-center">
						<div>
							<p class="text-4xl font-black text-white">500k+</p>
							<p class="mt-2 text-green-50 text-sm font-medium uppercase tracking-wider">
								Tickets Sold
							</p>
						</div>
						<div>
							<p class="text-4xl font-black text-white">150+</p>
							<p class="mt-2 text-green-50 text-sm font-medium uppercase tracking-wider">
								Partners
							</p>
						</div>
						<div>
							<p class="text-4xl font-black text-white">99.9%</p>
							<p class="mt-2 text-green-50 text-sm font-medium uppercase tracking-wider">
								Reliability
							</p>
						</div>
						<div>
							<p class="text-4xl font-black text-white">24/7</p>
							<p class="mt-2 text-green-50 text-sm font-medium uppercase tracking-wider">
								Help Desk
							</p>
						</div>
					</div>
				</div>

				<div class="text-center mb-12">
					<h3 class="text-3xl font-bold text-gray-900">Why Travel With Us?</h3>
					<div class="h-1 w-20 bg-[#079d49] mx-auto mt-4 rounded-full"></div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div class="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-2xl transition duration-500 border-b-4 border-transparent hover:border-[#079d49] group">
						<div class="w-14 h-14 bg-[#079d49]/10 text-[#079d49] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#079d49] group-hover:text-white transition duration-500">
							<svg
								class="w-7 h-7"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								></path>
							</svg>
						</div>
						<h4 class="text-xl font-bold text-gray-900 mb-3">
							Instant Booking
						</h4>
						<p class="text-gray-600 text-sm leading-relaxed">
							Skip the counter. Browse, select, and pay for your tickets in a
							few clicks with our lightning-fast interface.
						</p>
					</div>

					<div class="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-2xl transition duration-500 border-b-4 border-transparent hover:border-[#079d49] group">
						<div class="w-14 h-14 bg-[#079d49]/10 text-[#079d49] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#079d49] group-hover:text-white transition duration-500">
							<svg
								class="w-7 h-7"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
								></path>
							</svg>
						</div>
						<h4 class="text-xl font-bold text-gray-900 mb-3">
							Verified Safety
						</h4>
						<p class="text-gray-600 text-sm leading-relaxed">
							We only list admin-approved transport providers. Your safety and
							ticket validity are our top priorities.
						</p>
					</div>

					<div class="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-2xl transition duration-500 border-b-4 border-transparent hover:border-[#079d49] group">
						<div class="w-14 h-14 bg-[#079d49]/10 text-[#079d49] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#079d49] group-hover:text-white transition duration-500">
							<svg
								class="w-7 h-7"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								></path>
							</svg>
						</div>
						<h4 class="text-xl font-bold text-gray-900 mb-3">Always Online</h4>
						<p class="text-gray-600 text-sm leading-relaxed">
							Our support team and booking systems never sleep. Get help or book
							your journey at any hour of the day.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
