"use client";

import { useState } from "react";
import { generateCoverLetter, generateProposal } from "../../lib/utils";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ApplyComponentProps {
  cvFile: File | null;
  cvText: string;
  onReset: () => void;
  saveHistory: (cvText: string, result: string, type: "coverLetter" | "proposal") => void;
}

const ApplyComponent: React.FC<ApplyComponentProps> = ({
  cvFile,
  cvText,
  onReset,
  saveHistory,
}) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [generationType, setGenerationType] = useState<"coverLetter" | "proposal" | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!generationType) {
      toast.error("Please choose whether to generate a Cover Letter or Proposal.");
      return;
    }

    let finalCvText = cvText;
    if (cvFile) {
      finalCvText = await readCVFile(cvFile);
    }
    setLoading(true);

    try {
      let output: string;

      if (generationType === "coverLetter") {
        output = (await generateCoverLetter(input, finalCvText)) ?? "No content generated.";
      } else if (generationType === "proposal") {
        output = (await generateProposal(input, finalCvText)) ?? "No content generated.";
      } else {
        output = "No content generated.";
      }

      setResult(output);

      // Save history to localStorage
      saveHistory(finalCvText, output, generationType);
    } catch (error) {
      console.error("Error generating content:", error);
      setResult("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  const readCVFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
          Generate a Cover Letter or Proposal
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            className={`px-6 py-3 rounded-full font-semibold text-white transition-all ${generationType === "coverLetter"
              ? "bg-blue-700 shadow-lg"
              : "bg-blue-600 hover:bg-blue-500"
              }`}
            onClick={() => setGenerationType("coverLetter")}
          >
            Cover Letter
          </button>
          <button
            className={`px-6 py-3 rounded-full font-semibold text-white transition-all ${generationType === "proposal"
              ? "bg-red-700 shadow-lg"
              : "bg-red-600 hover:bg-red-500"
              }`}
            onClick={() => setGenerationType("proposal")}
          >
            Proposal
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-500 transition-all"
            onClick={onReset}
          >
            Upload New CV
          </button>
        </div>

        <textarea
          className="w-full p-4 mb-4 h-32 rounded-lg border-2 border-gray-700 bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
          placeholder="Describe the job or project..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          className="w-full py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-500 transition-all mb-4 shadow-lg"
        >
          Generate
        </button>

        {loading && (
          <div className="text-center text-white mb-4">Generating content, please wait...</div>
        )}

        <div className="relative bg-gray-100 p-6 rounded-lg text-gray-800 mb-4 shadow-inner">
          <p className="whitespace-pre-wrap">{result || "Generated result will appear here"}</p>
          {result && (
            <button
              type="button"
              title="Copy to clipboard"
              onClick={handleCopy}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaCopy size={20} />
            </button>
          )}
        </div>

        {copied && <p className="text-center text-green-500 mb-4">Copied to clipboard!</p>}

        <button
          onClick={handleCopy}
          className="w-full py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all shadow-lg"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ApplyComponent;
