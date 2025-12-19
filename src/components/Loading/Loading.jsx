import React from 'react';

const Loading = () => {
    return (
			<div className="flex h-screen items-center justify-center bg-[#f8fafc]">
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 border-4 border-t-[#079d49] border-gray-200 rounded-full animate-spin"></div>
					<p className="font-black text-xs uppercase tracking-[3px] text-gray-400">
						Loading..
					</p>
				</div>
			</div>
		);
};

export default Loading;