"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import ApplyComponent from "./ApplyComponent";
import HistorySidebar from "./HistorySidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user } = useUser();
  const [step, setStep] = useState<"upload" | "apply">("upload");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState<string>("");
  const [history, setHistory] = useState<{ cv: string, result: string, type: string }[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCvFile(event.target.files[0]);
      setCvText("");
      toast.success("CV file uploaded successfully!");
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvText(event.target.value);
    setCvFile(null);
  };

  const handleSave = async () => {
    if (cvFile || cvText.trim()) {
      try {
        if (cvFile) {
          const formData = new FormData();
          formData.append("file", cvFile);
          // Example: Upload file to your API
        } else {
          // Example: Send CV text to your API
        }

        setStep("apply");
        toast.success("CV saved successfully! Proceeding to the next step.");
      } catch (error) {
        toast.error("Failed to save CV. Please try again." + error);
      }
    } else {
      toast.error("Please upload a CV file or enter the CV text.");
    }
  };

  const handleReset = () => {
    setStep("upload");
    setCvFile(null);
    setCvText("");
    toast.info("Process reset. Provide your CV again.");
  };

  const saveHistory = (cvText: string, result: string, type: "coverLetter" | "proposal") => {
    setHistory((prevHistory) => [...prevHistory, { cv: cvText, result, type }]);
    toast.success("History saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-8">
      <ToastContainer />
      <div className="flex w-full max-w-7xl flex-col md:flex-row gap-6">
        {/* Sidebar for history */}
        <div className="w-full md:w-1/4 bg-gray-800 p-4 rounded-xl shadow-lg">
          <HistorySidebar history={history} />
        </div>

        {/* Main content area */}
        <div className="w-full md:w-3/4 bg-gray-800 p-8 md:p-12 rounded-xl shadow-lg mt-8 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-200 mb-6">
            Hi {user?.firstName}, let’s apply for more jobs
          </h1>

          {step === "upload" ? (
            <div className="flex flex-col space-y-6">
              {/* File Upload */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 font-medium">Upload your CV:</label>
                <input
                  placeholder="Please upload your CV"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png,.txt"
                  onChange={handleFileUpload}
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Text Input for CV */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 font-medium">Or enter your CV text:</label>
                <textarea
                  placeholder="Enter your CV here..."
                  value={cvText}
                  onChange={handleTextChange}
                  rows={6}
                  className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-all"
              >
                Save CV and Proceed
              </button>
            </div>
          ) : (
            <ApplyComponent
              cvFile={cvFile}
              cvText={cvText}
              onReset={handleReset}
              saveHistory={saveHistory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
