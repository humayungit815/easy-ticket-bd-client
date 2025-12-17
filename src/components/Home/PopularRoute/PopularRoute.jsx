import React from "react";

const PopularRoute = () => {
	return (
		<div>
			<section class="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div class="max-w-7xl mx-auto">
					<header class="text-center mb-10">
						<h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
							Our Popular Ticket Routes
						</h2>
						<p class="mt-4 text-lg text-gray-600">
							Explore the top destinations and experiences our users love.
						</p>
					</header>

					<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
						<div class="group bg-white p-6 rounded-lg shadow-xl border-t-4 border-indigo-600 hover:shadow-2xl transition duration-300 transform hover:scale-105">
							<div class="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
								<svg
									class="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h.01M17 19h.01"
									></path>
								</svg>
							</div>
							<h3 class="text-xl font-semibold text-gray-900 mb-2">
								City Breaks
							</h3>
							<p class="text-sm text-gray-500">
								Tickets for major urban explorations.
							</p>
							<a
								href="#"
								class="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
							>
								View 15+ Options
								<svg
									class="ml-1 w-4 h-4 group-hover:translate-x-1 transition duration-150"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									></path>
								</svg>
							</a>
						</div>

						<div class="group bg-white p-6 rounded-lg shadow-xl border-t-4 border-teal-600 hover:shadow-2xl transition duration-300 transform hover:scale-105">
							<div class="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600 mb-4">
								<svg
									class="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L14 16m-2-4l1.586-1.586a2 2 0 012.828 0L20 16m-6 2h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									></path>
								</svg>
							</div>
							<h3 class="text-xl font-semibold text-gray-900 mb-2">
								Mountain Treks
							</h3>
							<p class="text-sm text-gray-500">
								High-altitude hiking and climbing passes.
							</p>
							<a
								href="#"
								class="mt-3 text-sm font-medium text-teal-600 hover:text-teal-800 flex items-center"
							>
								View 8 Options
								<svg
									class="ml-1 w-4 h-4 group-hover:translate-x-1 transition duration-150"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									></path>
								</svg>
							</a>
						</div>

						<div class="group bg-white p-6 rounded-lg shadow-xl border-t-4 border-sky-600 hover:shadow-2xl transition duration-300 transform hover:scale-105">
							<div class="flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 text-sky-600 mb-4">
								<svg
									class="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9-3 4.03-3 9 1.343 9 3 9z"
									></path>
								</svg>
							</div>
							<h3 class="text-xl font-semibold text-gray-900 mb-2">
								Coastal Escapes
							</h3>
							<p class="text-sm text-gray-500">
								Island hopping and ferry tour tickets.
							</p>
							<a
								href="#"
								class="mt-3 text-sm font-medium text-sky-600 hover:text-sky-800 flex items-center"
							>
								View 12 Options
								<svg
									class="ml-1 w-4 h-4 group-hover:translate-x-1 transition duration-150"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									></path>
								</svg>
							</a>
						</div>

						<div class="group bg-white p-6 rounded-lg shadow-xl border-t-4 border-amber-600 hover:shadow-2xl transition duration-300 transform hover:scale-105">
							<div class="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
								<svg
									class="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 5v.01M12 12v.01M12 19v.01M18 5v.01M18 12v.01M18 19v.01M6 5v.01M6 12v.01M6 19v.01"
									></path>
								</svg>
							</div>
							<h3 class="text-xl font-semibold text-gray-900 mb-2">
								Wilderness Safaris
							</h3>
							<p class="text-sm text-gray-500">
								Explore nature and wildlife experiences.
							</p>
							<a
								href="#"
								class="mt-3 text-sm font-medium text-amber-600 hover:text-amber-800 flex items-center"
							>
								View 5 Options
								<svg
									class="ml-1 w-4 h-4 group-hover:translate-x-1 transition duration-150"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									></path>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default PopularRoute;
