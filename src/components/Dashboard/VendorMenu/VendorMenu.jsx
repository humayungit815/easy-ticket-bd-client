import React from 'react';
import { Link } from 'react-router';

const VendorMenu = () => {
    return (
			<div>
				<Link to="profile">
					<li>
						<button
							className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
							data-tip="Settings"
						>
							{/* Settings icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								strokeLinejoin="round"
								strokeLinecap="round"
								strokeWidth="2"
								fill="none"
								stroke="currentColor"
								className="my-1.5 inline-block size-4"
							>
								<path d="M20 7h-9"></path>
								<path d="M14 17H5"></path>
								<circle cx="17" cy="17" r="3"></circle>
								<circle cx="7" cy="7" r="3"></circle>
							</svg>
							<span className="is-drawer-close:hidden">Profile</span>
						</button>
					</li>
				</Link>
				<Link to="add-tickets">
					<li>
						<button
							className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
							data-tip="Settings"
						>
							{/* Settings icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								strokeLinejoin="round"
								strokeLinecap="round"
								strokeWidth="2"
								fill="none"
								stroke="currentColor"
								className="my-1.5 inline-block size-4"
							>
								<path d="M20 7h-9"></path>
								<path d="M14 17H5"></path>
								<circle cx="17" cy="17" r="3"></circle>
								<circle cx="7" cy="7" r="3"></circle>
							</svg>
							<span className="is-drawer-close:hidden">Add Tickets</span>
						</button>
					</li>
				</Link>
				<Link to="my-added-tickets">
					<li>
						<button
							className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
							data-tip="Settings"
						>
							{/* Settings icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								strokeLinejoin="round"
								strokeLinecap="round"
								strokeWidth="2"
								fill="none"
								stroke="currentColor"
								className="my-1.5 inline-block size-4"
							>
								<path d="M20 7h-9"></path>
								<path d="M14 17H5"></path>
								<circle cx="17" cy="17" r="3"></circle>
								<circle cx="7" cy="7" r="3"></circle>
							</svg>
							<span className="is-drawer-close:hidden">My Added Tickets</span>
						</button>
					</li>
				</Link>
				<Link to='requested-bookings'>
				<li>
					<button
						className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Settings"
					>
						{/* Settings icon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeLinejoin="round"
							strokeLinecap="round"
							strokeWidth="2"
							fill="none"
							stroke="currentColor"
							className="my-1.5 inline-block size-4"
						>
							<path d="M20 7h-9"></path>
							<path d="M14 17H5"></path>
							<circle cx="17" cy="17" r="3"></circle>
							<circle cx="7" cy="7" r="3"></circle>
						</svg>
						<span className="is-drawer-close:hidden">Requested Bookings </span>
					</button>
				</li>
				</Link>
				<li>
					<button
						className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Settings"
					>
						{/* Settings icon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeLinejoin="round"
							strokeLinecap="round"
							strokeWidth="2"
							fill="none"
							stroke="currentColor"
							className="my-1.5 inline-block size-4"
						>
							<path d="M20 7h-9"></path>
							<path d="M14 17H5"></path>
							<circle cx="17" cy="17" r="3"></circle>
							<circle cx="7" cy="7" r="3"></circle>
						</svg>
						<span className="is-drawer-close:hidden">Revenue Overview</span>
					</button>
				</li>
			</div>
		);
};

export default VendorMenu;