"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UserCVForm } from "@/components/user-cv-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"

export default function UploadCVPage() {
  const router = useRouter()
  const [uploadMethod, setUploadMethod] = useState<"form" | "file">("form")

  const handleFormSubmit = (data: any) => {
    // Save CV data to local storage
    localStorage.setItem("userCV", JSON.stringify(data))
    router.push("/dashboard")
  }

  const handleFileUpload = (fileContent: string) => {
    try {
      // This is a simplified version - in a real app, you'd parse the CV file
      // For now, we'll just store the raw content
      const mockParsedData = {
        name: "Extracted Name",
        email: "extracted@example.com",
        phone: "123-456-7890",
        skills: ["JavaScript", "React", "Next.js"],
        experience: [
          {
            title: "Frontend Developer",
            company: "Example Corp",
            startDate: "2020-01",
            endDate: "Present",
            description: "Developed web applications using React and Next.js",
          },
        ],
        education: [
          {
            degree: "Computer Science",
            institution: "Example University",
            year: "2019",
          },
        ],
      }

      localStorage.setItem("userCV", JSON.stringify(mockParsedData))
      router.push("/dashboard")
    } catch (error) {
      console.error("Error parsing CV file:", error)
      // Handle error
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Upload CV" text="Upload your CV or fill out the form with your details." />
      <Tabs value={uploadMethod} onValueChange={(v) => setUploadMethod(v as "form" | "file")} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Fill Form</TabsTrigger>
          <TabsTrigger value="file">Upload File</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>CV Information</CardTitle>
              <CardDescription>Fill out the form with your professional details.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserCVForm onSubmit={handleFormSubmit} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="file">
          <Card>
            <CardHeader>
              <CardTitle>Upload CV File</CardTitle>
              <CardDescription>Upload your CV file (PDF, DOCX, or TXT format).</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader onFileProcessed={handleFileUpload} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

