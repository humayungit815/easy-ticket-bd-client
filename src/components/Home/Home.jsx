import React from "react";
import bg from "../../assets/bg.jpg";
import Advertise from "./Advertise/Advertise";
const Home = () => {
	return (
		<div>
			<div
				className=" bg-cover bg-center h-120"
				style={{
					backgroundImage: `linear-gradient(
					65deg,
					rgba(107, 114, 128, 0.4),       
					rgba(31, 41, 55, 0.55),    
					rgba(107, 114, 128, 0.4)  
				  ),url(${bg})`,
				}}
			>
				<div className="text-white flex flex-col justify-center items-center py-40">
					<h1 className="text-5xl font-bold my-3">More Routes, More Tickets</h1>
					<h3 className="text-2xl font-semibold">
						No 1 Online Ticketing Platform
					</h3>
				</div>
			</div>
		</div>
	);
};

export default Home;
