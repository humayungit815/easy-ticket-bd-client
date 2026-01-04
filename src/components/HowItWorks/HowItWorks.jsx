import React from 'react';

const HowItWorks = () => {
    return (
			<div>
				<section class="py-16 bg-gray-50 max-w-7xl mx-auto rounded-2xl mb-20 shadow-md">
					<div class="px-4 sm:px-6 lg:px-8">
						<div class="text-center mb-12">
							<h2 class="text-3xl font-extrabold text-gray-900">
								Get Your Ticket in{" "}
								<span className="text-[#079d49]">3 Easy Steps</span>
							</h2>
							<p class="mt-4 text-gray-600 font-medium">
								Travel planning has never been this simple.
							</p>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div class="relative text-center p-6">
								<div class="flex items-center justify-center w-16 h-16  border-2 border-[#079d49] text-[#079d49] rounded-full mx-auto mb-4 text-2xl font-bold shadow-md ">
									1
								</div>
								<h3 class="text-xl font-bold mb-2">Search Route</h3>
								<p class="text-gray-500 text-sm font-medium">
									Select your destination and preferred date of travel.
								</p>
								<div class="hidden md:block absolute top-14 -right-4 text-[#079d49]">
									<svg
										class="w-8 h-8"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M14 5l7 7-7 7"
										></path>
									</svg>
								</div>
							</div>

							<div class="relative text-center p-6">
								<div class="flex items-center justify-center w-16 h-16 bg-white border-2 border-[#079d49] text-[#079d49] rounded-full mx-auto mb-4 text-2xl font-bold shadow-md">
									2
								</div>
								<h3 class="text-xl font-bold mb-2">Pick a Seat</h3>
								<p class="text-gray-500 text-sm font-medium">
									Choose from available seats and select your preferred
									operator.
								</p>
								<div class="hidden md:block absolute top-14 -right-4 text-[#079d49]">
									<svg
										class="w-8 h-8"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M14 5l7 7-7 7"
										></path>
									</svg>
								</div>
							</div>

							<div class="text-center p-6">
								<div class="flex items-center justify-center w-16 h-16 bg-white border-2 border-[#079d49] text-[#079d49] rounded-full mx-auto mb-4 text-2xl font-bold shadow-md">
									3
								</div>
								<h3 class="text-xl font-bold mb-2">Secure Payment</h3>
								<p class="text-gray-500 text-sm font-medium">
									Pay via bKash, Card, or Stripe and get your ticket instantly
									via SMS.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
};

export default HowItWorks;