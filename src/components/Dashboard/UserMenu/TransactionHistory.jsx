import React, {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TransactionHistory = () => {
	const {user} = useAuth();
	const axiosSecure = useAxiosSecure();
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		if (!user?.email) return;

		axiosSecure
			.get(`/transactions`)
			.then(res => setTransactions(res.data))
			.catch(err => console.error(err));
	}, [user?.email, axiosSecure]);

	return (
		<div className="max-w-7xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6 text-center">
				Transaction History
			</h1>

			{transactions.length === 0 ? (
				<p className="text-center">No transactions found.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border">
						<thead className="bg-gray-200">
							<tr>
								<th className="py-2 px-4 border">Transaction ID</th>
								<th className="py-2 px-4 border">Amount (USD)</th>
								<th className="py-2 px-4 border">Ticket Title</th>
								<th className="py-2 px-4 border">Payment Date</th>
							</tr>
						</thead>
						<tbody>
							{transactions.map(tx => (
								<tr key={tx.transactionId} className="text-center">
									<td className="py-2 px-4 border">{tx.transactionId}</td>
									<td className="py-2 px-4 border">{tx.amount}</td>
									<td className="py-2 px-4 border">{tx.ticketTitle}</td>
									<td className="py-2 px-4 border">
										{new Date(tx.paidAt).toLocaleString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default TransactionHistory;
