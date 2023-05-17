import React, { useState } from "react";
import { login, register } from "../features/actions";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import { MdDriveFileRenameOutline } from "react-icons/md";

const Auth = () => {
	const { isLoading } = useSelector((state) => state.user);
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const submit = async (e) => {
		e.preventDefault();
		if (isLogin) {
			const response = await register({ name, username, email, password });
			if (response.type === "success") {
				toast.success(response.message, {
					duration: 2000,
					style: {
						backgroundColor: "#629fbd",
					},
				});
				setName("");
				setUsername("");
				setEmail("");
				setPassword("");
				setIsLogin(false);
			} else {
				toast.error(response.message, { duration: 2000 });
			}
		} else if (!isLogin) {
			const response = await login({ email, password });
			if (response.type === "success") {
				toast.success(response.message, {
					duration: 2000,
					style: {
						backgroundColor: "#629fbd",
					},
				});
				setName("");
				setUsername("");
				setEmail("");
				setPassword("");
			} else {
				toast.error(response.message, { duration: 2000 });
			}
		}
	};
	return (
		<div className="flex bg-blue-100 justify-center items-center h-screen w-screen">
			<Toaster />
			<div className="bg-white flex flex-col items-center">
				<form className="flex flex-col gap-2 w-96 items-center px-5 py-24">
					{isLogin && (
						<div className="w-full">
							<div className="flex flex-col w-full gap-1">
								<label className="text-slate-800">Name</label>
								<div className="bg-blue-100 h-9 flex items-center rounded-md pl-3">
									<input
										className="w-11/12 outline-none bg-blue-100 pb-1 flex"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									<div className="w-9 flex justify-center items-center bg-blue-400 h-full rounded-r-md">
										<MdDriveFileRenameOutline />
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full gap-1">
								<label className="text-slate-800">Username</label>
								<div className="bg-blue-100 h-9 flex items-center rounded-md pl-3">
									<input
										className="w-11/12 outline-none bg-blue-100 pb-1 flex"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
									<div className="w-9 flex justify-center items-center bg-blue-400 h-full rounded-r-md">
										<HiOutlineUser size={22} />
									</div>
								</div>
							</div>
						</div>
					)}
					<div className="flex flex-col w-full gap-1">
						<label className="text-slate-800">Email</label>
						<div className="bg-blue-100 h-9 flex items-center rounded-md pl-3">
							<input
								className="w-11/12 outline-none bg-blue-100 pb-1 flex"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<div className="w-9 flex justify-center items-center bg-blue-400 h-full rounded-r-md">
								<FiMail />
							</div>
						</div>
					</div>
					<div className="flex flex-col w-full gap-1">
						<label className="text-slate-800">Password</label>
						<div className="bg-blue-100 h-9 flex items-center rounded-md pl-3">
							<input
								className="w-11/12 outline-none bg-blue-100 pb-1 flex"
								type={`${showPassword ? "text" : "password"}`}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div
								onClick={togglePassword}
								className="w-9 cursor-pointer flex justify-center items-center bg-blue-400 h-full rounded-r-md"
							>
								{!showPassword ? (
									<AiOutlineEye size={22} />
								) : (
									<AiOutlineEyeInvisible size={22} />
								)}
							</div>
						</div>
					</div>

					<button
						className="bg-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-md w-full mt-6 hover:bg-blue-500 transition p-3 font-semibold text-slate-100"
						disabled={isLoading}
						type="submit"
						onClick={submit}
					>
						Register
					</button>
				</form>
				<div>
					{isLogin ? (
						<div className="flex gap-2 mb-5">
							<p>Already have an account?</p>
							<button
								disabled={isLoading}
								className="disabled:cursor-pointer"
								onClick={() => setIsLogin(false)}
							>
								Log In
							</button>
						</div>
					) : (
						<div className="flex gap-2 mb-5">
							<p>Don't have an account?</p>
							<button
								disabled={isLoading}
								className="disabled:cursor-pointer"
								onClick={() => setIsLogin(true)}
							>
								Register
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Auth;
