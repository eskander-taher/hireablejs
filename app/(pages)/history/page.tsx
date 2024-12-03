"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HistoryPage: React.FC = () => {
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Handle click event to navigate to the history detail page
  const handleHistoryClick = (id: string) => {
    router.push(`/history/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
          History
        </h1>
        <div className="space-y-4">
          {history.map((entry: any) => (
            <div
              key={entry.id}
              className="bg-gray-100 p-6 rounded-lg text-gray-800 cursor-pointer hover:bg-gray-200 transition-all"
              onClick={() => handleHistoryClick(entry.id)}
            >
              <h3 className="font-semibold text-lg mb-2">
                {entry.type === "coverLetter" ? "Cover Letter" : "Proposal"}
              </h3>
              <p className="text-sm">{entry.result.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
