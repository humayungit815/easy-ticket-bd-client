import React from "react";
import AddTickets from "../Dashboard/Vendor/AddTickets";
import AdvertiseTicket from "./AdvertiseTicket/AdvertiseTicket";
import RecentAddedTickets from "./RecentAddedTickets/RecentAddedTickets";
import PopularRoute from "./PopularRoute/PopularRoute";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import Slider from "./Slider";
import About from "../About/About";
import HowItWorks from "../HowItWorks/HowItWorks";
import CustomerReviews from "../CustomerReviews/CustomerReviews";
const Home = () => {
	return (
		<div>
			<Slider></Slider>
			<div className="mt-20">
				<AdvertiseTicket></AdvertiseTicket>
			</div>
			<div>
				<RecentAddedTickets></RecentAddedTickets>
			</div>
			<div>
				<PopularRoute></PopularRoute>
			</div>
			<div>
				<WhyChooseUs></WhyChooseUs>
			</div>
			<div>
				<About></About>
			</div>
			<div>
				<HowItWorks></HowItWorks>
			</div>
			<div>
				<CustomerReviews></CustomerReviews>
			</div>
		</div>
	);
};

export default Home;
