"use client";

import React from "react";

interface HistorySidebarProps {
  history: { cv: string, result: string, type: string }[];
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history }) => {
  return (
    <div className="w-[100%] bg-gray-900 p-4 rounded-xl shadow-lg items-start mt-4">
      <h2 className="text-xl text-gray-200 font-semibold mb-4">History</h2>
      <div className="space-y-4">
        {history.length === 0 ? (
          <p className="text-gray-400">No history available.</p>
        ) : (
          history.map((entry, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <div className="font-medium text-gray-200 mb-2">{entry.type}</div>
              <div className="text-gray-300 text-sm truncate">
                CV: {entry.cv.slice(0, 50)}...
              </div>
              <div className="text-gray-300 text-sm mt-2">
                Result: {entry.result.slice(0, 50)}...
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;
