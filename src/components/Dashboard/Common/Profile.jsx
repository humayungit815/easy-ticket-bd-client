import React from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "./../../../hooks/useRole";
import {
	Mail,
	User as UserIcon,
	Shield,
	Fingerprint,
	Calendar,
	Camera,
} from "lucide-react";

const Profile = () => {
	const {user} = useAuth();
	const [role, isRoleLoading] = useRole();
	const brandGreen = "#079d49";

	if (isRoleLoading) {
		return (
			<div className="flex h-[60vh] items-center justify-center">
				<div className="w-10 h-10 border-4 border-t-[#079d49] border-gray-100 rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto">
			{/* Profile Card Container */}
			<div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
				{/* 1. Header/Cover Area */}
				<div className="h-48 w-full relative bg-slate-900 overflow-hidden">
					{/* Decorative Background Pattern */}
					<div
						className="absolute inset-0 opacity-20"
						style={{
							backgroundImage: `radial-gradient(circle at 2px 2px, ${brandGreen} 1px, transparent 0)`,
							backgroundSize: "24px 24px",
						}}
					></div>
					<div className="absolute -bottom-1 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
				</div>

				{/* 2. Avatar & Essential Info */}
				<div className="relative px-10 pb-10">
					<div className="flex flex-col md:flex-row md:items-end justify-between -mt-20 mb-10 gap-6">
						<div className="relative group inline-block">
							<img
								alt="profile"
								src={user?.photoURL}
								className="h-40 w-40 object-cover rounded-[2.5rem] border-8 border-white shadow-xl"
							/>
							<button className="absolute bottom-4 right-4 p-2 bg-white rounded-xl shadow-lg text-gray-500 hover:text-[#079d49] transition-colors">
								<Camera size={18} />
							</button>
						</div>

						<div className="flex-1 md:pb-4">
							<div className="flex items-center gap-3 mb-1">
								<h1 className="text-3xl font-black text-slate-900 tracking-tight">
									{user?.displayName}
								</h1>
								<span className="px-3 py-1 rounded-lg bg-green-50 text-[#079d49] text-[10px] font-black uppercase tracking-widest border border-green-100">
									{role}
								</span>
							</div>
							<p className="text-gray-400 font-bold flex items-center gap-2">
								<Mail size={14} /> {user?.email}
							</p>
						</div>

					</div>

					{/* 3. Detailed Information Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Account Security Card */}
						<div className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-white rounded-xl shadow-sm text-[#079d49]">
									<Shield size={20} />
								</div>
								<h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">
									Account Security
								</h3>
							</div>

							<div className="space-y-6">
								<InfoRow
									icon={<Fingerprint size={16} />}
									label="Unique User ID"
									value={user?.uid}
									isMono
								/>
								<InfoRow
									icon={<Calendar size={16} />}
									label="Account Status"
									value="Verified & Active"
									highlight
								/>
							</div>
						</div>

						{/* Personal Details Card */}
						<div className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-white rounded-xl shadow-sm text-[#079d49]">
									<UserIcon size={20} />
								</div>
								<h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">
									Personal Details
								</h3>
							</div>

							<div className="space-y-6">
								<InfoRow label="Full Name" value={user?.displayName} />
								<InfoRow label="Primary Email" value={user?.email} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Reusable Info Component
const InfoRow = ({icon, label, value, isMono, highlight}) => (
	<div className="flex flex-col gap-1">
		<p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
			{icon} {label}
		</p>
		<p
			className={`text-sm font-bold ${
				isMono ? "font-mono text-gray-500 text-xs break-all" : "text-slate-800"
			} ${highlight ? "text-[#079d49]" : ""}`}
		>
			{value}
		</p>
	</div>
);

export default Profile;
