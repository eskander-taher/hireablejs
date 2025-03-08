import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import CV from "../pages/CV";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import NotFound from "../pages/notfound";
import Navbar from "./Navbar";
import CoverLetters from "../pages/coverletters";

const AppRoutes: React.FC = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/CV" element={<CV />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/coverletters" element={<CoverLetters />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;
