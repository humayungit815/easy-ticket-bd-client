import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import login2 from "../../assets/loginImg2.webp";
import login3 from "../../assets/loginImg3.jpg";
import useAuth from "../../hooks/useAuth";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router";
import {FcGoogle} from "react-icons/fc";
import {saveOrUpdateUser} from "../../Utils";

const Login = () => {
	const navigate = useNavigate();
	const {signIn, signInWithGoogle} = useAuth();
	const {
		register,
		handleSubmit,
		setValue, // ইনপুট ফিল্ড অটো-ফিল করার জন্য
		formState: {errors},
	} = useForm();

	const handleLogin = data => {
		signIn(data.email, data.password)
			.then(result => {
				toast.success("Login Successfully!");
				navigate("/");
			})
			.catch(err => {
				toast.error("Invalid email or password");
			});
	};

	// ডেমো লগইন ফাংশন
	const handleDemoLogin = (email, password) => {
		setValue("email", email);
		setValue("password", password);

		// অটো ফিল হওয়ার পর সরাসরি লগইন কল হবে
		handleLogin({email, password});
	};

	const handleGoogleSignIn = async () => {
		try {
			const result = await signInWithGoogle();
			const user = result.user;
			await saveOrUpdateUser({
				name: user.displayName,
				email: user.email,
				photo: user.photoURL,
				isFraud: false,
			});
			toast.success("Registration Successfully!");
			navigate("/");
		} catch (error) {
			toast.error("Google Sign In Failed!");
		}
	};

	return (
		<div className="flex flex-col md:flex-row w-full bg-white pt-[70px] md:pt-[69px] overflow-hidden">
			{/* LEFT SIDE IMAGE SLIDER */}
			<div className="hidden md:block md:w-1/2 h-full overflow-hidden rounded-r-3xl">
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
			<div className="flex justify-center items-center w-full md:w-1/2 h-full p-6">
				<div className="w-full max-w-md space-y-6">
					{/* Header */}
					<header className="space-y-2">
						<h1 className="text-4xl font-bold text-gray-900">Welcome</h1>
						<p className="text-gray-600">
							Login with your{" "}
							<span className="font-semibold text-green-700">EasyTicket</span>{" "}
							account and enjoy a seamless journey.
						</p>
					</header>

					{/* Quick Demo Access Buttons */}
					<div className="space-y-3">
						<div className="relative flex items-center">
							<div className="flex-grow border-t border-gray-300"></div>
							<span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
								Demo Access
							</span>
							<div className="flex-grow border-t border-gray-300"></div>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<button
								onClick={() =>
									handleDemoLogin("admin@gmail.com", "admin@gmail.com")
								}
								className="py-2 px-4 border-2 border-dashed border-green-200 rounded-xl text-sm font-bold text-green-700 hover:bg-green-50 hover:border-[#079d49] transition-all"
							>
								Admin Demo
							</button>
							<button
								onClick={() =>
									handleDemoLogin("user@gmail.com", "User@gmail.com")
								}
								className="py-2 px-4 border-2 border-dashed border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all"
							>
								User Demo
							</button>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
						{/* email */}
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Email <span className="text-red-500">*</span>
							</label>
							<input
								type="email"
								placeholder="Enter email"
								className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
								{...register("email", {required: true})}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm">Email is Required</p>
							)}
						</div>

						{/* Password */}
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Password <span className="text-red-500">*</span>
							</label>
							<input
								type="password"
								placeholder="••••••••"
								className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
								{...register("password", {required: true})}
							/>
							{errors.password && (
								<p className="text-red-500 text-sm">Password is Required</p>
							)}
						</div>

						<div className="flex justify-end">
							<a
								href="#"
								className="text-sm font-medium text-green-700 hover:text-green-800"
							>
								Forgot Password?
							</a>
						</div>

						<button
							type="submit"
							className="w-full py-3 text-lg font-medium text-white rounded-md shadow-sm bg-[#079d49] hover:bg-[#068a40] transition duration-150"
						>
							Log In
						</button>

						<div className="flex items-center gap-3">
							<div className="flex-1 h-px bg-gray-300"></div>
							<span className="text-gray-500 text-sm font-medium">OR</span>
							<div className="flex-1 h-px bg-gray-300"></div>
						</div>

						<button
							type="button"
							onClick={handleGoogleSignIn}
							className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-[#f4fdf8] transition shadow-sm"
						>
							<FcGoogle className="text-2xl" />
							<span className="text-gray-800 font-medium">
								Continue with Google
							</span>
						</button>
					</form>

					{/* Create Account */}
					<div className="pt-2 text-center">
						<p className="md:text-lg text-gray-600">
							Don’t have an account?{" "}
							<Link
								to="/register"
								className="font-bold text-green-700 hover:underline"
							>
								Create Account
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
