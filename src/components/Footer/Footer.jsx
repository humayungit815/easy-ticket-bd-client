import { Ticket } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Footer = () => {
	return (
		<div>
			<footer class="bg-gray-900 text-white pt-12">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="grid grid-cols-1 gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4">
						<div>
							<Link to="/">
								<div className="flex items-center gap-2 cursor-pointer">
									<div className="p-1.5 rounded-lg bg-[#079d49]">
										<Ticket className="text-white" size={24} />
									</div>
									<span className="text-2xl font-black tracking-tighter">
										Easy<span className="text-[#079d49]">-Ticket</span>
										<span className="text-gray-400 font-light">BD</span>
									</span>
								</div>
							</Link>
							<p class="mt-4 text-sm text-gray-400">
								Book bus, train, launch & flight tickets easily—your reliable
								partner for hassle-free travel planning.
							</p>
						</div>

						<div>
							<h3 class="text-lg font-semibold text-white mb-4 border-b-2 border-indigo-500 inline-block pb-1">
								Quick Links
							</h3>
							<nav class="space-y-2">
								<Link
									to="/"
									href="/home"
									class="block text-sm text-gray-400 hover:text-indigo-400 transition duration-150"
								>
									Home
								</Link>
								<Link
									to="/all-tickets"
									href="/tickets"
									class="block text-sm text-gray-400 hover:text-indigo-400 transition duration-150"
								>
									All Tickets
								</Link>
								<a
									href="/contact"
									class="block text-sm text-gray-400 hover:text-indigo-400 transition duration-150"
								>
									Contact Us
								</a>
								<a
									href="/about"
									class="block text-sm text-gray-400 hover:text-indigo-400 transition duration-150"
								>
									About
								</a>
							</nav>
						</div>

						<div>
							<h3 class="text-lg font-semibold text-white mb-4 border-b-2 border-indigo-500 inline-block pb-1">
								Contact Info
							</h3>
							<address class="space-y-3 not-italic text-sm">
								<div class="flex items-center">
									<svg
										class="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										></path>
									</svg>
									<a
										href="mailto:support@ticketbari.com"
										class="text-gray-400 hover:text-indigo-400 transition duration-150 break-all"
									>
										humayunkobir2546@gmail.com
									</a>
								</div>
								<div class="flex items-center">
									<svg
										class="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
										></path>
									</svg>
									<a
										href="tel:+8801234567890"
										class="text-gray-400 hover:text-indigo-400 transition duration-150"
									>
										+880 1818486857
									</a>
								</div>
								<div class="flex items-center">
									<svg
										class="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										></path>
									</svg>
									<a
										href="https://www.facebook.com/humayun.kobir.810316"
										target="_blank"
										rel="noopener noreferrer"
										class="text-gray-400 hover:text-indigo-400 transition duration-150"
									>
										Facebook Page
									</a>
								</div>
							</address>
						</div>

						<div>
							<h3 class="text-lg font-semibold text-white mb-4 border-b-2 border-indigo-500 inline-block pb-1">
								Secure Payments
							</h3>
							<div class="flex flex-wrap gap-3">
								<div class="w-12 h-8 bg-white rounded-md flex items-center justify-center shadow-lg">
									<span class="text-xs font-bold text-gray-800">Stripe</span>
								</div>
							</div>
							<p class="mt-4 text-sm text-gray-500">
								Trusted payment gateways ensure your security.
							</p>
						</div>
					</div>

					<div class="border-t border-gray-800 mt-8 pt-6 pb-6 text-center">
						<p class="text-sm text-gray-500">
							&copy; 2025 Easy-TicketBD. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
