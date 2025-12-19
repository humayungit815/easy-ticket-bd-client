import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import login2 from "../../assets/loginImg2.webp";
import login3 from "../../assets/loginImg3.jpg";
import "swiper/css";
import "swiper/css/pagination";
import {FcGoogle} from "react-icons/fc";
import {useForm} from "react-hook-form";
import useAuth from "./../../hooks/useAuth";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router";
import {saveOrUpdateUser} from "../../Utils";

const Register = () => {
	const navigate = useNavigate();
	const {createUser, updateUserProfile, signInWithGoogle} = useAuth();
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();

	const onSubmit = data => {
		const {name, email, photo} = data;
		createUser(email, data.password)
			.then(result => {
				console.log(result);

				updateUserProfile(name, photo);

				saveOrUpdateUser({name, email, photo});

				toast.success("Sign Up Successfully!");
				navigate("/");
			})
			.catch(err => {
				console.log(err.message);
				toast.error("Email already used");
			});
	};
	const handleGoogleSignIn = async () => {
		try {
			const result = await signInWithGoogle();
			const user = result.user;

			console.log("user g", user);

			// save to backend
			await saveOrUpdateUser({
				name: user.displayName,
				email: user.email,
				photo: user.photoURL,
				isFraud: false,
			});

			toast.success("Registration Successfully!");
			navigate("/");
		} catch (error) {
			console.log(error);
			toast.error("Google Sign In Failed!");
		}
	};

	return (
		<div className="flex flex-col md:flex-row w-full bg-white overflow-hidden pt-[69px]">
			{/* LEFT SIDE IMAGE SLIDER */}
			<div className="hidden md:block md:w-1/2 overflow-hidden rounded-r-3xl">
				<Swiper
					pagination={{dynamicBullets: true}}
					autoplay={{
						delay: 3500,
						disableOnInteraction: false,
					}}
					modules={[Pagination, Autoplay]}
					className="h-full"
				>
					{[login2, login3].map((img, i) => (
						<SwiperSlide key={i} className="overflow-hidden">
							<img
								src={img}
								className="w-full h-full object-cover"
								alt="login-slide"
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* RIGHT SIDE FORM */}
			<div className="flex justify-center items-center w-full md:w-1/2 p-6">
				<div className="w-full max-w-md space-y-6">
					{/* Header */}
					<header className="space-y-2">
						<h1 className="text-4xl font-bold text-gray-900">
							Create an account
						</h1>
						<p className="text-gray-600">
							Create your account once and enjoy a seamless journey across all
							<span className="font-semibold text-green-700 mx-1">
								EasyTicket
							</span>
							services. One account for all your travel needs.
						</p>
					</header>

					{/* Form */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Name */}
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700"
							>
								Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								placeholder="Enter your name"
								className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
								{...register("name", {required: true, maxLength: 20})}
							/>
							{errors.name?.type === "required" && (
								<p className="text-red-500">Name is Required</p>
							)}
						</div>
						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email <span className="text-red-500">*</span>
							</label>
							<input
								type="email"
								placeholder="Enter your email"
								className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
								{...register("email", {
									required: true,
									pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								})}
							/>
							{errors.email?.type === "required" && (
								<p className="text-red-500">Email is Required</p>
							)}
							{errors.email?.type === "pattern" && (
								<p className="text-red-500">Please Input Valid Email</p>
							)}
						</div>
						{/* Photo URL */}
						<div>
							<label
								htmlFor="photo"
								className="block text-sm font-medium text-gray-700"
							>
								Photo URL <span className="text-red-500">*</span>
							</label>
							<input
								type="url"
								placeholder="Enter your photo URL"
								className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
								{...register("photo", {required: true})}
							/>
							{errors.password?.type === "required" && (
								<p className="text-red-500">Photo URL is Required</p>
							)}
						</div>

						{/* Password */}
						<div className="relative">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password <span className="text-red-500">*</span>
							</label>
							<input
								type="password"
								id="password"
								placeholder="••••••••"
								className="w-full pr-10 px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
								{...register("password", {
									required: true,
									pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
								})}
							/>
							{errors.password?.type === "required" && (
								<p className="text-red-500">Password is Required</p>
							)}
							{errors.password?.type === "pattern" && (
								<p className="text-red-500">
									Password must contain uppercase, lowercase letters and be at
									least 6 characters long.
								</p>
							)}
						</div>

						{/* Forgot */}
						<div className="flex justify-end">
							<a
								href="#"
								className="text-sm font-medium text-green-700 hover:text-green-800"
							>
								Forgot Password?
							</a>
						</div>

						{/* Login Button */}
						<button
							type="submit"
							className="w-full py-3 text-lg font-medium text-white rounded-md transition duration-150 ease-in-out shadow-sm bg-[#079d49]"
						>
							Sign Up
						</button>
						<div className="flex items-center gap-3">
							<div className="flex-1 h-px bg-gray-300"></div>
							<span className="text-gray-500 text-sm font-medium">OR</span>
							<div className="flex-1 h-px bg-gray-300"></div>
						</div>
						<button
						type="button"
							onClick={handleGoogleSignIn}
							className="
                                w-full flex items-center justify-center gap-3 
                                  py-2.5 rounded-xl 
                                   border border-gray-300 
                                   bg-white 
                                         hover:bg-[#f4fdf8] 
                                               transition shadow-sm
                                                        "
						>
							<FcGoogle className="text-2xl" />
							<span className="text-gray-800 font-medium">
								Continue with Google
							</span>
						</button>
					</form>

					{/* Create Account */}
					<div className="pt-4 text-center">
						<p className="text-lg text-gray-600">
							Already have an account?{" "}
							<Link
								to="/login"
								className="font-bold text-green-700 hover:text-green-800 hover:underline"
							>
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
