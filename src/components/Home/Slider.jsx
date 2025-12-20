import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Autoplay, EffectFade} from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const SLIDE_DATA = [
	{
		id: 1,
		title: "Explore the World Together",
		subtitle: "Book international flights at the best rates.",
		image:
			"https://i.ibb.co.com/pvKwM2LY/emanuviews-AKYjr-km-Yt-Q-unsplash.jpg",
	},
	{
		id: 2,
		title: "Seamless Journeys Start Here",
		subtitle: "Book domestic and international flights with zero hidden fees.",
		image:
			"https://i.ibb.co.com/WdmhFzJ/peter-hansen-Me-Gmd-PNe36w-unsplash.jpg",
	},
	{
		id: 3,
		title: "Your Seat is Just a Click Away",
		subtitle:
			"Real-time schedules and instant confirmation for your daily commute.",
		image: "https://i.ibb.co.com/xKJB1hnp/train-green-valley-summertime.jpg",
	},
];

const Slider = () => {
	return (
		<div className="relative md:h-[650px] h-[400px] w-full pt-[65px]">
			<Swiper
				modules={[Navigation, Pagination, Autoplay, EffectFade]}
				effect="fade"
				speed={800}
				autoplay={{delay: 5000}}
				pagination={{clickable: true}}
				navigation
				className="h-full w-full"
			>
				{SLIDE_DATA.map(slide => (
					<SwiperSlide key={slide.id}>
						<div
							className="relative h-full w-full bg-cover bg-center"
							style={{backgroundImage: `url(${slide.image})`}}
						>
							<div className="absolute inset-0 bg-black/40" />

							<div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
								<h1 className="mb-4 text-4xl md:text-6xl font-bold">
									{slide.title}
								</h1>
								<p className="mb-8 text-lg md:text-xl">{slide.subtitle}</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Swiper custom styles */}
			<style>{`
				.swiper-pagination-bullet {
					background: white;
					opacity: 0.7;
				}
				.swiper-pagination-bullet-active {
					background: #2563eb;
					width: 24px;
					border-radius: 4px;
				}
				.swiper-button-next,
				.swiper-button-prev {
					color: white;
					transform: scale(0.7);
				}
			`}</style>
		</div>
	);
};

export default Slider;
