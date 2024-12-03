"use client";
import { SignedOut, SignedIn, SignInButton, useUser } from "@clerk/clerk-react";

export default function Home() {
  const { user } = useUser();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className=" text-6xl">HireableJS</h1>
      <h1>The zone for all desperate JavaScript developers</h1>

      <SignedOut>
        <SignInButton mode="modal">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <h1>
          Hi <span className="font-bold text-xl">{user?.firstName}</span>
        </h1>
        <p>You have joined the waiting list successfully</p>
        <p>You will be notified in the near future when the website is launched</p>
      </SignedIn>
    </div>
  );
}
