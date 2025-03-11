"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Sparkles, Building, Briefcase } from "lucide-react"
import { generateCVWithAI, generateCoverLetterWithAI } from "@/app/actions"

export default function DashboardPage() {
  const router = useRouter()
  const [cvData, setCvData] = useState<any>(null)
  const [companyDescription, setCompanyDescription] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [contentType, setContentType] = useState<"cv" | "coverLetter" | null>(null)
  const [activeTab, setActiveTab] = useState<"company" | "job">("company")

  useEffect(() => {
    // Load CV data from local storage
    const storedCvData = localStorage.getItem("userCV")
    if (storedCvData) {
      setCvData(JSON.parse(storedCvData))
    }
  }, [])

  const handleGenerateCV = async () => {
    if (!cvData) {
      alert("Please upload your CV first")
      return
    }

    if (!companyDescription || !companyName) {
      alert("Please enter company name and description")
      return
    }

    setIsGenerating(true)
    setContentType("cv")

    try {
      const result = await generateCVWithAI(cvData, companyDescription)

      if (result.success) {
        setGeneratedContent(result.content)
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

  const handleGenerateCoverLetter = async () => {
    if (!cvData) {
      alert("Please upload your CV first")
      return
    }

    if (!jobDescription || !companyName || !jobTitle) {
      alert("Please fill in all job details")
      return
    }

    setIsGenerating(true)
    setContentType("coverLetter")

    try {
      const result = await generateCoverLetterWithAI(cvData, jobDescription, companyName, jobTitle)

      if (result.success) {
        setGeneratedContent(result.content)

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

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Upload your CV and generate tailored documents." />

      <div className="grid gap-6">
        {!cvData ? (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="file" />
            <EmptyPlaceholder.Title>No CV uploaded</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You haven&apos;t uploaded your CV yet. Start by adding your CV details.
            </EmptyPlaceholder.Description>
            <Button onClick={() => router.push("/dashboard/upload-cv")}>Upload CV</Button>
          </EmptyPlaceholder>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>My CV</CardTitle>
                <CardDescription>Your CV information is saved and ready to use.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Personal Information</h3>
                    <div className="mt-2 rounded-md bg-slate-900 p-4">
                      <p>
                        <strong>Name:</strong> {cvData.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {cvData.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {cvData.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Skills</h3>
                    <div className="mt-2 rounded-md bg-slate-900 p-4">
                      <p>{cvData.skills.join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => router.push("/dashboard/edit-cv")}>
                      Edit CV
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        localStorage.removeItem("userCV")
                        setCvData(null)
                      }}
                    >
                      Delete CV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "company" | "job")} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="company" className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  Company Info
                </TabsTrigger>
                <TabsTrigger value="job" className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Job Info
                </TabsTrigger>
              </TabsList>

              <TabsContent value="company">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>Enter information about the company to generate a tailored CV.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Textarea
                        id="companyName"
                        placeholder="Enter the company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyDescription">Company Description</Label>
                      <Textarea
                        id="companyDescription"
                        placeholder="Paste the company description, values, mission statement, etc."
                        value={companyDescription}
                        onChange={(e) => setCompanyDescription(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>

                    <div className="rounded-md bg-orange-500/10 p-4 text-sm">
                      <p className="font-medium text-orange-500">Tips for Company Description</p>
                      <ul className="mt-2 list-disc pl-5 text-slate-300">
                        <li>Include the company's mission and values</li>
                        <li>Describe their products or services</li>
                        <li>Mention their industry and market position</li>
                        <li>Include any notable company culture information</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleGenerateCV} disabled={isGenerating}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate CV for This Company
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="job">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Information</CardTitle>
                    <CardDescription>
                      Enter information about the job to generate a tailored cover letter.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobCompanyName">Company Name</Label>
                      <Textarea
                        id="jobCompanyName"
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
                        placeholder="Paste the full job description here"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>

                    <div className="rounded-md bg-orange-500/10 p-4 text-sm">
                      <p className="font-medium text-orange-500">Tips for Job Description</p>
                      <ul className="mt-2 list-disc pl-5 text-slate-300">
                        <li>Include the full job posting with all requirements</li>
                        <li>Don't remove any sections, even if they seem irrelevant</li>
                        <li>Include qualifications, responsibilities, and preferred skills</li>
                        <li>Add any information about the team or department</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleGenerateCoverLetter} disabled={isGenerating}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Cover Letter for This Job
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {isGenerating && (
              <Card className="border-orange-500/20">
                <CardContent className="flex items-center justify-center p-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    <p className="text-sm text-slate-300">
                      Generating your {contentType === "cv" ? "CV" : "cover letter"}...
                    </p>
                    <p className="text-xs text-slate-400">This may take a few moments</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedContent && !isGenerating && (
              <Card>
                <CardHeader>
                  <CardTitle>{contentType === "cv" ? "Generated CV" : "Generated Cover Letter"}</CardTitle>
                  <CardDescription>Review and edit your generated document.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                  />
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    onClick={() => {
                      // Copy to clipboard
                      navigator.clipboard.writeText(generatedContent)
                      alert("Copied to clipboard!")
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                  <Button>Download as PDF</Button>
                </CardFooter>
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardShell>
  )
}

