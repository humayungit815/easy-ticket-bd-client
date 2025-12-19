import React, {useEffect} from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {Link, useSearchParams} from "react-router";

const PaymentSuccess = () => {
	const [searchParams] = useSearchParams();
	const sessionId = searchParams.get("session_id");
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		if (sessionId) {
			axiosSecure.post("/payment-success", {sessionId});
		}
	}, [sessionId, axiosSecure]);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="bg-white p-10 rounded-lg shadow-lg text-center">
				{/* < className="w-16 h-16 text-green-500 mx-auto mb-4" /> */}
				<h1 className="text-3xl font-bold text-gray-800 mb-2">
					Payment Successful!
				</h1>
				<p className="text-gray-600 mb-6">
					Thank you for your purchase. Your order is being processed.
				</p>
				<Link
					to="/dashboard/transaction-history"
					className="inline-block bg-[#079d49] text-white font-semibold py-2 px-4 rounded transition duration-300"
				>
					See Your Transaction
				</Link>
			</div>
		</div>
	);
};

export default PaymentSuccess;
