import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
	id: string;
	username: string;
	resume: string;
	token: string;
}

interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	removeUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	const removeUser = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		<UserContext.Provider value={{ user, setUser, removeUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
