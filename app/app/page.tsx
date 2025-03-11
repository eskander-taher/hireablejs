"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, Sparkles, Upload, FileText, Copy, Download, RefreshCw, Trash2, Edit, Save, X } from "lucide-react"
import { generateCVWithAI, generateCoverLetterWithAI } from "@/app/actions"
import { UserCVForm } from "@/components/user-cv-form"
import { CVTemplate } from "@/components/cv-template"
import { generatePDF } from "@/utils/generate-pdf"
import { toast } from "@/components/ui/use-toast"
import { CoverLetterTemplate } from "@/components/cover-letter-template"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "generate">("upload")
  const [cvData, setCvData] = useState<any>(null)
  const [companyName, setCompanyName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [generationType, setGenerationType] = useState<"cv" | "coverLetter" | null>(null)
  const [parsedCvData, setParsedCvData] = useState<any>(null)
  const [editingCV, setEditingCV] = useState(false)
  const [editingGeneratedCV, setEditingGeneratedCV] = useState(false)
  const [editingCoverLetter, setEditingCoverLetter] = useState(false)
  const [editedCoverLetter, setEditedCoverLetter] = useState<string>("")
  const [editedGeneratedCV, setEditedGeneratedCV] = useState<string>("")
  const [showCVDialog, setShowCVDialog] = useState(false)
  const { theme } = useTheme()

  // Add new state variables for storing generated CVs
  const [savedGeneratedCVs, setSavedGeneratedCVs] = useState<{
    [key: string]: { content: string; company: string; date: string }
  }>({})
  const [currentCompanyKey, setCurrentCompanyKey] = useState<string>("")

  // Update the useEffect to load both CV data and generated CVs
  useEffect(() => {
    // Check if CV data exists in local storage
    const storedCvData = localStorage.getItem("userCV")
    if (storedCvData) {
      setCvData(JSON.parse(storedCvData))
      setActiveTab("generate")
    }

    // Load saved generated CVs
    const storedGeneratedCVs = localStorage.getItem("generatedCVs")
    if (storedGeneratedCVs) {
      setSavedGeneratedCVs(JSON.parse(storedGeneratedCVs))
    }

    // Check if there's a last viewed CV
    const lastViewedCV = localStorage.getItem("lastViewedCV")
    if (lastViewedCV) {
      const { key, content } = JSON.parse(lastViewedCV)
      setCurrentCompanyKey(key)
      setGeneratedContent(content)
      setEditedGeneratedCV(content)
      setGenerationType("cv")

      try {
        if (storedCvData) {
          const parsedData = parseAIGeneratedCV(content, JSON.parse(storedCvData))
          setParsedCvData(parsedData)
        }
      } catch (error) {
        console.error("Error parsing last viewed CV:", error)
      }
    }
  }, [])

  // Update when editing cover letter
  useEffect(() => {
    if (generatedContent && generationType === "coverLetter") {
      setEditedCoverLetter(generatedContent)
    }
  }, [generatedContent, generationType])

  // Update when editing generated CV
  useEffect(() => {
    if (generatedContent && generationType === "cv") {
      setEditedGeneratedCV(generatedContent)
    }
  }, [generatedContent, generationType])

  const handleCVSubmit = (data: any) => {
    localStorage.setItem("userCV", JSON.stringify(data))
    setCvData(data)
    setActiveTab("generate")
    setShowCVDialog(false)
  }

  // Update the handleGenerateCV function to save generated CVs
  const handleGenerateCV = async () => {
    if (!description || !companyName) {
      toast({
        title: "Missing information",
        description: "Please enter company name and description",
        variant: "destructive",
      })
      return
    }

    // Create a unique key for this company
    const companyKey = `${companyName.trim().toLowerCase().replace(/\s+/g, "_")}`
    setCurrentCompanyKey(companyKey)

    // Check if we already have a generated CV for this company
    if (
      savedGeneratedCVs[companyKey] &&
      !confirm("You already have a CV tailored for this company. Generate a new one?")
    ) {
      const savedCV = savedGeneratedCVs[companyKey]
      setGeneratedContent(savedCV.content)
      setEditedGeneratedCV(savedCV.content)
      setGenerationType("cv")

      // Save as last viewed CV
      localStorage.setItem(
        "lastViewedCV",
        JSON.stringify({
          key: companyKey,
          content: savedCV.content,
        }),
      )

      // Try to parse the saved content
      try {
        const parsedData = parseAIGeneratedCV(savedCV.content, cvData)
        setParsedCvData(parsedData)
      } catch (parseError) {
        console.error("Error parsing saved CV:", parseError)
      }

      return
    }

    setIsGenerating(true)
    setGenerationType("cv")
    setParsedCvData(null)

    try {
      const result = await generateCVWithAI(cvData, description)

      if (result.success) {
        setGeneratedContent(result.content)
        setEditedGeneratedCV(result.content)

        // Save to local storage with metadata
        const updatedGeneratedCVs = {
          ...savedGeneratedCVs,
          [companyKey]: {
            content: result.content,
            company: companyName,
            date: new Date().toISOString(),
          },
        }
        setSavedGeneratedCVs(updatedGeneratedCVs)
        localStorage.setItem("generatedCVs", JSON.stringify(updatedGeneratedCVs))

        // Save as last viewed CV
        localStorage.setItem(
          "lastViewedCV",
          JSON.stringify({
            key: companyKey,
            content: result.content,
          }),
        )

        // Try to parse the AI-generated content into structured data
        try {
          const parsedData = parseAIGeneratedCV(result.content, cvData)
          setParsedCvData(parsedData)
        } catch (parseError) {
          console.error("Error parsing AI-generated CV:", parseError)
        }

        toast({
          title: "CV Generated Successfully",
          description: "Your CV has been tailored for " + companyName,
        })
      } else {
        toast({
          title: "Generation Failed",
          description: "Failed to generate CV. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating CV:", error)
      toast({
        title: "Error",
        description: "An error occurred while generating the CV.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateCoverLetter = async () => {
    if (!description || !companyName || !jobTitle) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationType("coverLetter")

    try {
      const result = await generateCoverLetterWithAI(cvData, description, companyName, jobTitle)

      if (result.success) {
        setGeneratedContent(result.content)
        setEditedCoverLetter(result.content)

        // Save to history in local storage with more metadata
        const coverLetterKey = `${companyName.trim().toLowerCase().replace(/\s+/g, "_")}_${jobTitle.trim().toLowerCase().replace(/\s+/g, "_")}`

        const history = JSON.parse(localStorage.getItem("coverLetterHistory") || "[]")
        const newEntry = {
          id: Date.now(),
          key: coverLetterKey,
          company: companyName,
          jobTitle,
          date: new Date().toISOString(),
          content: result.content,
        }

        // Add to history, avoiding duplicates
        const existingIndex = history.findIndex((item: any) => item.key === coverLetterKey)
        if (existingIndex >= 0) {
          history[existingIndex] = newEntry
        } else {
          history.push(newEntry)
        }

        localStorage.setItem("coverLetterHistory", JSON.stringify(history))

        // Save as last viewed cover letter
        localStorage.setItem(
          "lastViewedCoverLetter",
          JSON.stringify({
            key: coverLetterKey,
            content: result.content,
          }),
        )

        toast({
          title: "Cover Letter Generated",
          description: "Your cover letter has been created successfully.",
        })
      } else {
        toast({
          title: "Generation Failed",
          description: "Failed to generate cover letter. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating cover letter:", error)
      toast({
        title: "Error",
        description: "An error occurred while generating the cover letter.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Add a function to load a previously generated CV
  const loadSavedCV = (companyKey: string) => {
    if (savedGeneratedCVs[companyKey]) {
      const savedCV = savedGeneratedCVs[companyKey]
      setGeneratedContent(savedCV.content)
      setEditedGeneratedCV(savedCV.content)
      setGenerationType("cv")
      setCurrentCompanyKey(companyKey)

      // Save as last viewed CV
      localStorage.setItem(
        "lastViewedCV",
        JSON.stringify({
          key: companyKey,
          content: savedCV.content,
        }),
      )

      // Try to parse the saved content
      try {
        const parsedData = parseAIGeneratedCV(savedCV.content, cvData)
        setParsedCvData(parsedData)
      } catch (parseError) {
        console.error("Error parsing saved CV:", parseError)
      }

      // Update the company name and description fields
      setCompanyName(savedCV.company || companyKey.replace(/_/g, " "))
    }
  }

  // Add a function to delete a saved CV
  const deleteSavedCV = (companyKey: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the parent button click

    if (confirm(`Are you sure you want to delete the CV for ${companyKey.replace(/_/g, " ")}?`)) {
      const updatedGeneratedCVs = { ...savedGeneratedCVs }
      delete updatedGeneratedCVs[companyKey]

      setSavedGeneratedCVs(updatedGeneratedCVs)
      localStorage.setItem("generatedCVs", JSON.stringify(updatedGeneratedCVs))

      // If we're currently viewing this CV, clear it
      if (currentCompanyKey === companyKey) {
        setGeneratedContent(null)
        setEditedGeneratedCV("")
        setParsedCvData(null)
        setCurrentCompanyKey("")
        localStorage.removeItem("lastViewedCV")
      }

      toast({
        title: "CV Deleted",
        description: `CV for ${companyKey.replace(/_/g, " ")} has been deleted.`,
      })
    }
  }

  // Add a function to regenerate a CV
  const regenerateCV = async () => {
    if (!currentCompanyKey || !savedGeneratedCVs[currentCompanyKey]) {
      toast({
        title: "No CV Selected",
        description: "Please select a CV to regenerate or create a new one.",
        variant: "destructive",
      })
      return
    }

    if (!description) {
      setDescription(savedGeneratedCVs[currentCompanyKey].company || "")
    }

    // Now call the generate function
    await handleGenerateCV()
  }

  // Update the resetCV function to also clear generated CVs if needed
  const resetCV = () => {
    if (confirm("This will reset your CV data. Do you also want to clear all generated CVs?")) {
      localStorage.removeItem("userCV")
      localStorage.removeItem("generatedCVs")
      localStorage.removeItem("lastViewedCV")
      setCvData(null)
      setSavedGeneratedCVs({})
      setActiveTab("upload")
      setGeneratedContent(null)
      setEditedGeneratedCV("")
      setParsedCvData(null)
      setCurrentCompanyKey("")

      toast({
        title: "Reset Complete",
        description: "All CV data and generated CVs have been cleared.",
      })
    } else {
      localStorage.removeItem("userCV")
      localStorage.removeItem("lastViewedCV")
      setCvData(null)
      setActiveTab("upload")
      setGeneratedContent(null)
      setEditedGeneratedCV("")
      setParsedCvData(null)
      setCurrentCompanyKey("")

      toast({
        title: "CV Reset",
        description: "Your CV data has been reset. Generated CVs are still available.",
      })
    }
  }

  // Function to save edited generated CV
  const saveEditedGeneratedCV = () => {
    if (!currentCompanyKey) {
      toast({
        title: "Error",
        description: "No company selected to save the CV for.",
        variant: "destructive",
      })
      return
    }

    setGeneratedContent(editedGeneratedCV)

    // Update in local storage
    const updatedGeneratedCVs = {
      ...savedGeneratedCVs,
      [currentCompanyKey]: {
        ...savedGeneratedCVs[currentCompanyKey],
        content: editedGeneratedCV,
        lastEdited: new Date().toISOString(),
      },
    }

    setSavedGeneratedCVs(updatedGeneratedCVs)
    localStorage.setItem("generatedCVs", JSON.stringify(updatedGeneratedCVs))

    // Update last viewed CV
    localStorage.setItem(
      "lastViewedCV",
      JSON.stringify({
        key: currentCompanyKey,
        content: editedGeneratedCV,
      }),
    )

    // Try to parse the edited content
    try {
      const parsedData = parseAIGeneratedCV(editedGeneratedCV, cvData)
      setParsedCvData(parsedData)
    } catch (parseError) {
      console.error("Error parsing edited CV:", parseError)
    }

    setEditingGeneratedCV(false)

    toast({
      title: "CV Saved",
      description: "Your edited CV has been saved successfully.",
    })
  }

  // Function to save edited cover letter
  const saveEditedCoverLetter = () => {
    setGeneratedContent(editedCoverLetter)

    // Create a key for this cover letter
    const coverLetterKey = `${companyName.trim().toLowerCase().replace(/\s+/g, "_")}_${jobTitle.trim().toLowerCase().replace(/\s+/g, "_")}`

    // Update in history
    const history = JSON.parse(localStorage.getItem("coverLetterHistory") || "[]")
    const existingIndex = history.findIndex((item: any) => item.key === coverLetterKey)

    if (existingIndex >= 0) {
      history[existingIndex] = {
        ...history[existingIndex],
        content: editedCoverLetter,
        lastEdited: new Date().toISOString(),
      }
    } else {
      history.push({
        id: Date.now(),
        key: coverLetterKey,
        company: companyName,
        jobTitle,
        date: new Date().toISOString(),
        content: editedCoverLetter,
      })
    }

    localStorage.setItem("coverLetterHistory", JSON.stringify(history))

    // Update last viewed cover letter
    localStorage.setItem(
      "lastViewedCoverLetter",
      JSON.stringify({
        key: coverLetterKey,
        content: editedCoverLetter,
      }),
    )

    setEditingCoverLetter(false)

    toast({
      title: "Cover Letter Saved",
      description: "Your edited cover letter has been saved successfully.",
    })
  }

  // Function to parse AI-generated CV content into structured data
  const parseAIGeneratedCV = (content: string, originalData: any) => {
    // Start with the original data as a base
    const parsedData = { ...originalData }

    // For now, we'll just use the original structure but with the AI content
    // In a real implementation, you would parse the AI response more intelligently
    parsedData.aiGenerated = true
    parsedData.aiContent = content

    return parsedData
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800 dark:border-slate-700 py-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hireablejs</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {cvData && (
                <Button variant="outline" size="sm" onClick={resetCV}>
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "upload" | "generate")} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" disabled={activeTab === "generate" && !cvData}>
              <Upload className="mr-2 h-4 w-4" />
              Upload CV
            </TabsTrigger>
            <TabsTrigger value="generate" disabled={!cvData}>
              <FileText className="mr-2 h-4 w-4" />
              Generate Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your CV Information</CardTitle>
              </CardHeader>
              <CardContent>
                <UserCVForm onSubmit={handleCVSubmit} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="space-y-6">
            {cvData && (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>My CV</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCVDialog(true)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Edit CV
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md bg-slate-100 dark:bg-slate-900 p-4">
                      <p>
                        <strong>Name:</strong> {cvData.name}
                      </p>
                      <p>
                        <strong>Title:</strong> {cvData.title}
                      </p>
                      <p>
                        <strong>Email:</strong> {cvData.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {cvData.phone}
                      </p>
                      <p>
                        <strong>Location:</strong> {cvData.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {Object.keys(savedGeneratedCVs).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Tailored CVs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Your previously generated CVs:</p>
                        <div className="grid gap-2 mt-2">
                          {Object.keys(savedGeneratedCVs).map((key) => {
                            const cv = savedGeneratedCVs[key]
                            return (
                              <div
                                key={key}
                                className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${currentCompanyKey === key
                                    ? "bg-slate-200 dark:bg-slate-800"
                                    : "bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800"
                                  }`}
                                onClick={() => loadSavedCV(key)}
                              >
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-orange-500" />
                                  <div>
                                    <p className="font-medium">{cv.company || key.replace(/_/g, " ")}</p>
                                    {cv.date && (
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Created: {formatDate(cv.date)}
                                      </p>
                                    )}
                                    {cv.lastEdited && (
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Edited: {formatDate(cv.lastEdited)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-500"
                                  onClick={(e) => deleteSavedCV(key, e)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          placeholder="Enter company name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          placeholder="Enter job title"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        <span className="flex items-center">
                          <Sparkles className="mr-2 h-4 w-4 text-orange-500" />
                          Company/Job Description
                        </span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Paste company or job description here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>
                    {!generatedContent && (
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <p>
                          <span className="text-orange-500">✨</span> Our AI will analyze the company description and
                          create a completely tailored CV that highlights your most relevant skills and experiences.
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
                      {currentCompanyKey && (
                        <Button
                          variant="outline"
                          onClick={regenerateCV}
                          disabled={isGenerating}
                          className="flex items-center gap-1"
                        >
                          <RefreshCw className="h-4 w-4" />
                          Regenerate CV
                        </Button>
                      )}
                      <Button variant="outline" onClick={handleGenerateCV} disabled={isGenerating}>
                        {isGenerating && generationType === "cv" ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Generate Tailored CV
                      </Button>
                      <Button
                        onClick={handleGenerateCoverLetter}
                        disabled={isGenerating}
                        className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
                      >
                        {isGenerating && generationType === "coverLetter" ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Generate Cover Letter
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {isGenerating && (
                  <Card className="border-orange-500/20">
                    <CardContent className="flex items-center justify-center p-6">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {generationType === "cv"
                            ? "Creating a tailored CV for this company..."
                            : "Generating your cover letter..."}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {generationType === "cv"
                            ? "Our AI is analyzing the company description and creating a customized CV that highlights your most relevant qualifications."
                            : "This may take a few moments"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {generatedContent && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>
                        {generationType === "cv"
                          ? `Tailored CV for ${companyName || currentCompanyKey?.replace(/_/g, " ") || "Company"}`
                          : "Generated Cover Letter"}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {generationType === "cv" ? (
                          editingGeneratedCV ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={saveEditedGeneratedCV}
                                className="flex items-center gap-1"
                              >
                                <Save className="h-4 w-4" />
                                Save
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingGeneratedCV(false)
                                  setEditedGeneratedCV(generatedContent || "")
                                }}
                                className="flex items-center gap-1"
                              >
                                <X className="h-4 w-4" />
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingGeneratedCV(true)}
                              className="flex items-center gap-1"
                            >
                              <Edit className="h-4 w-4" />
                              Edit CV
                            </Button>
                          )
                        ) : editingCoverLetter ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={saveEditedCoverLetter}
                              className="flex items-center gap-1"
                            >
                              <Save className="h-4 w-4" />
                              Save
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingCoverLetter(false)
                                setEditedCoverLetter(generatedContent || "")
                              }}
                              className="flex items-center gap-1"
                            >
                              <X className="h-4 w-4" />
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingCoverLetter(true)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Cover Letter
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {generationType === "cv" ? (
                        editingGeneratedCV ? (
                          <Textarea
                            value={editedGeneratedCV}
                            onChange={(e) => setEditedGeneratedCV(e.target.value)}
                            className="min-h-[400px] font-mono text-sm"
                          />
                        ) : (
                          <div
                            id="cv-template"
                            className={`bg-white dark:bg-white rounded-lg shadow-lg ${theme === "dark" ? "dark-preview" : ""}`}
                          >
                            {parsedCvData ? (
                              <CVTemplate data={parsedCvData} aiContent={generatedContent} />
                            ) : (
                              <div className="p-6 whitespace-pre-wrap font-mono text-sm text-black">
                                {generatedContent}
                              </div>
                            )}
                          </div>
                        )
                      ) : editingCoverLetter ? (
                        <Textarea
                          value={editedCoverLetter}
                          onChange={(e) => setEditedCoverLetter(e.target.value)}
                          className="min-h-[400px] font-mono text-sm"
                        />
                      ) : (
                        <div
                          id="cover-letter-content"
                          className={`bg-white dark:bg-white rounded-lg shadow-lg ${theme === "dark" ? "dark-preview" : ""}`}
                        >
                          <CoverLetterTemplate content={generatedContent || ""} />
                        </div>
                      )}

                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedContent || "")
                            toast({
                              title: "Copied to clipboard",
                              description: "Content has been copied to your clipboard.",
                            })
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button
                          onClick={() => {
                            if (generationType === "cv") {
                              const filename = currentCompanyKey
                                ? `${cvData.name.replace(/\s+/g, "_")}_CV_for_${currentCompanyKey}.pdf`
                                : `${cvData.name.replace(/\s+/g, "_")}_CV.pdf`
                              generatePDF("cv-template", filename)
                              toast({
                                title: "PDF Generated",
                                description: `Your CV has been downloaded as ${filename}`,
                              })
                            } else {
                              // For cover letter, use the existing element
                              const filename = companyName
                                ? `${cvData.name.replace(/\s+/g, "_")}_Cover_Letter_for_${companyName.replace(/\s+/g, "_")}.pdf`
                                : `${cvData.name.replace(/\s+/g, "_")}_Cover_Letter.pdf`

                              generatePDF("cover-letter-content", filename).then(() => {
                                toast({
                                  title: "PDF Generated",
                                  description: `Your cover letter has been downloaded as ${filename}`,
                                })
                              })
                            }
                          }}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialog for editing CV */}
      <Dialog open={showCVDialog} onOpenChange={setShowCVDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Your CV</DialogTitle>
          </DialogHeader>
          <UserCVForm onSubmit={handleCVSubmit} initialData={cvData} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

