import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { CiDark, CiLight } from "react-icons/ci";
import { useTheme } from "../context/ThemeContext"; // Import the useTheme hook

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, removeUser } = useUser();
	const location = useLocation();
	const navigate = useNavigate();
	const { theme, toggleTheme } = useTheme(); // Use the useTheme hook

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const isActive = (path: string) => {
		return location.pathname === path
			? "text-blue-500 dark:text-blue-400"
			: "text-gray-800 dark:text-gray-400";
	};

	const handleSignOut = () => {
		removeUser();
		navigate("/");
	};

	return (
		<nav className="w-full bg-white dark:bg-gray-900 shadow-md fixed">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<div className="flex-shrink-0 mr-5">
							<Link
								to="/"
								className="text-xl font-bold text-gray-800 dark:text-white"
							>
								HireableJS
							</Link>
						</div>
						<div className="hidden md:flex space-x-8">
							<Link
								to="/"
								className={`hover:text-gray-600 dark:hover:text-gray-400 ${isActive(
									"/"
								)}`}
							>
								Home
							</Link>
							{user ? (
								<Link
									to="/resume"
									className={`hover:text-gray-600 dark:hover:text-gray-400 ${isActive(
										"/resume"
									)}`}
								>
									Resume
								</Link>
							) : null}
							{user?.resume ? (
								<Link
									to="/coverletters"
									className={`hover:text-gray-600 dark:hover:text-gray-400 ${isActive(
										"/coverletters"
									)}`}
								>
									Cover Letters
								</Link>
							) : null}
						</div>
					</div>
					<div className="hidden md:flex space-x-4">
						<button
							onClick={toggleTheme}
							className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
						>
							{theme === "dark" ? <CiLight size={30} /> : <CiDark size={30} />}
						</button>
						{!user ? (
							<Link
								to="/signin"
								className={`text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400	 ${isActive(
									"/signin"
								)}`}
							>
								<BiLogIn size={30} />
							</Link>
						) : (
							<button
								onClick={handleSignOut}
								className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
							>
								<BiLogOut size={30} />
							</button>
						)}
					</div>
					<div className="-mr-2 flex md:hidden">
						<button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
						>
							<svg
								className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							</svg>
							<svg
								className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			<div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					<Link
						to="/"
						className={`block px-3 py-2 rounded-md text-base font-medium hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 ${isActive(
							"/"
						)}`}
					>
						Home
					</Link>
					{user ? (
						<Link
							to="/resume"
							className={`block px-3 py-2 rounded-md text-base font-medium hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 ${isActive(
								"/resume"
							)}`}
						>
							Resume
						</Link>
					) : null}
					{user ? (
						<Link
							to="/coverletters"
							className={`block px-3 py-2 rounded-md text-base font-medium hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 ${isActive(
								"/coverletters"
							)}`}
						>
							Cover Letters
						</Link>
					) : null}
					{!user ? (
						<Link
							to="/signin"
							className={`block px-3 py-2 rounded-md text-base font-medium hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 ${isActive(
								"/signin"
							)}`}
						>
							Sign In
						</Link>
					) : (
						<button
							onClick={handleSignOut}
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
						>
							Sign Out
						</button>
					)}
					<button
						onClick={toggleTheme}
						className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
					>
						{theme === "dark" ? "Light Mode" : "Dark Mode"}
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
