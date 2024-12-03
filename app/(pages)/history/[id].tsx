"use client";

import { useRouter } from "next/router"; // Ensure useRouter is imported only once
import { useState, useEffect } from "react";

const HistoryDetailPage: React.FC = () => {
  const [entry, setEntry] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;  // Get the dynamic id from the URL

  // Fetch history from local storage or an API endpoint based on the id
  useEffect(() => {
    if (id) {
      const savedHistory = localStorage.getItem("history");
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        const selectedEntry = history.find((entry: any) => entry.id === id);
        if (selectedEntry) {
          setEntry(selectedEntry);
        } else {
          // If no entry is found
          router.push("/history");
        }
      }
    }
  }, [id, router]);

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
          {entry.type === "coverLetter" ? "Cover Letter" : "Proposal"} Details
        </h1>
        <div className="space-y-4">
          <div className="bg-gray-100 p-6 rounded-lg text-gray-800">
            <h3 className="font-semibold text-lg mb-2">CV Text</h3>
            <p className="whitespace-pre-wrap">{entry.cvText}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-gray-800">
            <h3 className="font-semibold text-lg mb-2">Generated Result</h3>
            <p className="whitespace-pre-wrap">{entry.result}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetailPage;
