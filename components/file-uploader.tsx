"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Upload } from "lucide-react"

interface FileUploaderProps {
  onFileProcessed: (fileContent: string) => void
}

export function FileUploader({ onFileProcessed }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Check file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF, DOCX, or TXT file")
      setFile(null)
      return
    }

    setFile(selectedFile)
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    try {
      // In a real app, you would send the file to a server for processing
      // Here we'll simulate reading the file and extracting text
      const reader = new FileReader()

      reader.onload = (event) => {
        const fileContent = event.target?.result as string
        onFileProcessed(fileContent)
      }

      reader.onerror = () => {
        setError("Error reading file")
        setIsUploading(false)
      }

      reader.readAsText(file)
    } catch (err) {
      setError("An error occurred while processing the file")
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-dashed border-2 border-slate-700 bg-slate-900 p-8 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-slate-800 p-4">
            <Upload className="h-8 w-8 text-slate-400" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">Drag and drop your CV file here</p>
            <p className="text-sm text-slate-400">or click to browse files</p>
          </div>
          <input type="file" id="file-upload" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileChange} />
          <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()} className="mt-2">
            Browse Files
          </Button>
        </div>
      </Card>

      {file && (
        <div className="flex items-center justify-between p-4 bg-slate-900 rounded-md">
          <div className="flex items-center space-x-2">
            <FileIcon className="h-5 w-5 text-slate-400" />
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
          </div>
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

