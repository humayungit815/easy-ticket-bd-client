import React, {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdvertiseTicket = () => {
	const [ads, setAds] = useState([]);
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		axiosSecure.get("/advertised-tickets").then(res => setAds(res.data));
	}, [axiosSecure]);

	console.log(ads);

	return (
		<div>
			<div className="grid md:grid-cols-3 gap-6">
				{ads.map(ticket => (
					<div key={ticket._id} className="border p-4 rounded">
						<img src={ticket.image} className="h-40 w-full object-cover" />
						<h3 className="font-bold mt-2">{ticket.TicketTitle}</h3>
						<p>৳{ticket.price}</p>
					</div>
				))}
			</div>
			
		</div>
	);
};

export default AdvertiseTicket;
