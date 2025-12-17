import React from "react";

const WhyChooseUs = () => {
	return (
		<div>
			<section class="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-b border-gray-200">
				<div class="max-w-7xl mx-auto">
					<header class="text-center mb-10">
						<h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
							Why Choose Our Ticket Platform?
						</h2>
						<p class="mt-4 text-xl text-gray-600">
							Commitment to quality, transparency, and a smooth booking
							experience.
						</p>
					</header>

					<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div class="text-center p-6 bg-indigo-600 rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.02]">
							<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-indigo-600 mb-4 shadow-lg">
								<svg
									class="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
							</div>
							<h3 class="text-xl font-bold mb-2 text-white">Admin-Verified</h3>
							<p class="text-indigo-100">
								Every ticket is manually approved by our team, guaranteeing
								legitimacy and quality.
							</p>
						</div>

						<div class="text-center p-6 bg-indigo-600 rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.02]">
							<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-indigo-600 mb-4 shadow-lg">
								<svg
									class="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM15 7h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V9a2 2 0 012-2z"
									></path>
								</svg>
							</div>
							<h3 class="text-xl font-bold mb-2 text-white">
								Transparent Pricing
							</h3>
							<p class="text-indigo-100">
								No hidden fees or unexpected charges. The price you see is the
								final price you pay.
							</p>
						</div>

						<div class="text-center p-6 bg-indigo-600 rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.02]">
							<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-indigo-600 mb-4 shadow-lg">
								<svg
									class="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z"
									></path>
								</svg>
							</div>
							<h3 class="text-xl font-bold mb-2 text-white">100% Secure</h3>
							<p class="text-indigo-100">
								Your personal and payment information is protected with
								industry-leading encryption.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default WhyChooseUs;
