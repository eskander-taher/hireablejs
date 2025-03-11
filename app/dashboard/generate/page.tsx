"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Loader2, Sparkles } from "lucide-react"
import { generateCoverLetterWithAI, generateCVWithAI } from "@/app/actions"
import { AITips } from "@/components/ai-tips"

export default function GeneratePage() {
  const router = useRouter()
  const [jobDescription, setJobDescription] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [cvData, setCvData] = useState<any>(null)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"input" | "preview">("input")
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // Load CV data from local storage
    const storedCvData = localStorage.getItem("userCV")
    if (!storedCvData) {
      router.push("/dashboard/upload-cv")
      return
    }

    setCvData(JSON.parse(storedCvData))
  }, [router])

  const generateCoverLetter = async () => {
    if (!jobDescription || !companyName || !jobTitle) {
      alert("Please fill in all required fields")
      return
    }

    setIsGenerating(true)

    try {
      const result = await generateCoverLetterWithAI(cvData, jobDescription, companyName, jobTitle)

      if (result.success) {
        setGeneratedContent(result.content)
        setActiveTab("preview")

        // Save to history in local storage
        const history = JSON.parse(localStorage.getItem("coverLetterHistory") || "[]")
        history.push({
          id: Date.now(),
          company: companyName,
          jobTitle,
          date: new Date().toISOString(),
          content: result.content,
        })
        localStorage.setItem("coverLetterHistory", JSON.stringify(history))
      } else {
        alert("Failed to generate cover letter. Please try again.")
      }
    } catch (error) {
      console.error("Error generating cover letter:", error)
      alert("An error occurred while generating the cover letter.")
    } finally {
      setIsGenerating(false)
    }
  }

  const generateCV = async () => {
    setIsGenerating(true)

    try {
      const result = await generateCVWithAI(cvData)

      if (result.success) {
        setGeneratedContent(result.content)
        setActiveTab("preview")
      } else {
        alert("Failed to generate CV. Please try again.")
      }
    } catch (error) {
      console.error("Error generating CV:", error)
      alert("An error occurred while generating the CV.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Generate Documents"
        text="Create a tailored cover letter based on your CV and job description."
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "input" | "preview")} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedContent}>
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Enter information about the job you're applying for.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Textarea
                  id="company"
                  placeholder="Enter the company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Textarea
                  id="jobTitle"
                  placeholder="Enter the job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description here"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              <AITips />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={generateCV} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate CV with AI
                    </>
                  )}
                </Button>
                <Button onClick={generateCoverLetter} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Cover Letter with AI
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Generated Document</CardTitle>
              <CardDescription>Review and edit your generated document.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedContent || ""}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("input")}>
                Back to Input
              </Button>
              <div className="space-x-2">
                <Button
                  onClick={() => {
                    // Copy to clipboard
                    navigator.clipboard.writeText(generatedContent || "")
                    alert("Copied to clipboard!")
                  }}
                >
                  Copy to Clipboard
                </Button>
                <Button>Download as PDF</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

