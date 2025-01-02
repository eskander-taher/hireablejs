import React from "react";
import { cn } from "../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, isLoading, className, ...props }) => {
	return (
		<button
			className={cn(
				"rounded bg-[#F57C00] px-2 py-1 font-medium text-white hover:bg-opacity-90",
				className
			)}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? "Loading..." : text}
		</button>
	);
};

export default Button;
