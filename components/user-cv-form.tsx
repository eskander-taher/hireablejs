"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Trash2, Upload, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface UserCVFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function UserCVForm({ onSubmit, initialData }: UserCVFormProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    title: "",
    location: "",
    phone: "",
    email: "",

    // Profiles
    profiles: [{ platform: "", username: "" }],

    // Summary
    summary: "",

    // Experience
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        location: "",
        website: "",
        description: "",
      },
    ],

    // Education
    education: [
      {
        institution: "",
        degree: "",
        gpa: "",
        year: "",
      },
    ],

    // Projects
    projects: [
      {
        name: "",
        link: "",
        description: "",
      },
    ],

    // Skills
    skillCategories: [
      {
        category: "Programming",
        skills: "",
      },
      {
        category: "Web Technologies",
        skills: "",
      },
      {
        category: "Frameworks & Tools",
        skills: "",
      },
    ],

    // Certifications
    certifications: [
      {
        name: "",
        issuer: "",
        year: "",
      },
    ],

    // Languages
    languages: [
      {
        language: "",
        proficiency: "",
      },
    ],
  })

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        title: initialData.title || "",
        location: initialData.location || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        profiles: initialData.profiles?.length ? initialData.profiles : [{ platform: "", username: "" }],
        summary: initialData.summary || "",
        experience: initialData.experience?.length
          ? initialData.experience
          : [{ company: "", position: "", startDate: "", endDate: "", location: "", website: "", description: "" }],
        education: initialData.education?.length
          ? initialData.education
          : [{ institution: "", degree: "", gpa: "", year: "" }],
        projects: initialData.projects?.length ? initialData.projects : [{ name: "", link: "", description: "" }],
        skillCategories: initialData.skillCategories?.length
          ? initialData.skillCategories
          : [{ category: "Programming", skills: "" }],
        certifications: initialData.certifications?.length
          ? initialData.certifications
          : [{ name: "", issuer: "", year: "" }],
        languages: initialData.languages?.length ? initialData.languages : [{ language: "", proficiency: "" }],
      })

      if (initialData.photoUrl) {
        setPhotoUrl(initialData.photoUrl)
      }
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Profiles handlers
  const handleProfileChange = (index: number, field: string, value: string) => {
    const updatedProfiles = [...formData.profiles]
    updatedProfiles[index] = {
      ...updatedProfiles[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      profiles: updatedProfiles,
    }))
  }

  const addProfile = () => {
    setFormData((prev) => ({
      ...prev,
      profiles: [...prev.profiles, { platform: "", username: "" }],
    }))
  }

  const removeProfile = (index: number) => {
    const updatedProfiles = formData.profiles.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      profiles: updatedProfiles,
    }))
  }

  // Experience handlers
  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperience = [...formData.experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      experience: updatedExperience,
    }))
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          location: "",
          website: "",
          description: "",
        },
      ],
    }))
  }

  const removeExperience = (index: number) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      experience: updatedExperience,
    }))
  }

  // Education handlers
  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...formData.education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }))
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          gpa: "",
          year: "",
        },
      ],
    }))
  }

  const removeEducation = (index: number) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }))
  }

  // Projects handlers
  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...formData.projects]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }))
  }

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          link: "",
          description: "",
        },
      ],
    }))
  }

  const removeProject = (index: number) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }))
  }

  // Skills handlers
  const handleSkillCategoryChange = (index: number, field: string, value: string) => {
    const updatedSkillCategories = [...formData.skillCategories]
    updatedSkillCategories[index] = {
      ...updatedSkillCategories[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      skillCategories: updatedSkillCategories,
    }))
  }

  const addSkillCategory = () => {
    setFormData((prev) => ({
      ...prev,
      skillCategories: [
        ...prev.skillCategories,
        {
          category: "",
          skills: "",
        },
      ],
    }))
  }

  const removeSkillCategory = (index: number) => {
    const updatedSkillCategories = formData.skillCategories.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      skillCategories: updatedSkillCategories,
    }))
  }

  // Certifications handlers
  const handleCertificationChange = (index: number, field: string, value: string) => {
    const updatedCertifications = [...formData.certifications]
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      certifications: updatedCertifications,
    }))
  }

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          issuer: "",
          year: "",
        },
      ],
    }))
  }

  const removeCertification = (index: number) => {
    const updatedCertifications = formData.certifications.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      certifications: updatedCertifications,
    }))
  }

  // Languages handlers
  const handleLanguageChange = (index: number, field: string, value: string) => {
    const updatedLanguages = [...formData.languages]
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      languages: updatedLanguages,
    }))
  }

  const addLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          language: "",
          proficiency: "",
        },
      ],
    }))
  }

  const removeLanguage = (index: number) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      languages: updatedLanguages,
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      photoUrl,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Profile Photo</h3>
          <div className="flex items-center gap-4">
            {photoUrl ? (
              <div className="relative">
                <img
                  src={photoUrl || "/placeholder.svg"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2"
                  onClick={() => setPhotoUrl(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="h-6 w-6 text-gray-400" />
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm text-gray-500">Upload a professional photo (optional)</p>
              <p className="text-xs text-gray-400">Recommended: Square image, at least 400x400px</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Personal Information */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">📝 Personal Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Abdulrahman Mohammed"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Software Engineer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">
                <span>📍 Location</span>
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Moscow, Russia"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                <span>📞 Phone</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +7 (917) 482-84-74"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <span>📧 Email</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., abdulrahmangooba@gmail.com"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profiles */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">🔗 Profiles</h3>
            <Button type="button" variant="outline" size="sm" onClick={addProfile} className="h-8 gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Profile
            </Button>
          </div>
          <div className="space-y-4">
            {formData.profiles.map((profile, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor={`profile-platform-${index}`}>Platform</Label>
                    <Input
                      id={`profile-platform-${index}`}
                      value={profile.platform}
                      onChange={(e) => handleProfileChange(index, "platform", e.target.value)}
                      placeholder="e.g., GitHub, LinkedIn"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`profile-username-${index}`}>Username/URL</Label>
                    <Input
                      id={`profile-username-${index}`}
                      value={profile.username}
                      onChange={(e) => handleProfileChange(index, "username", e.target.value)}
                      placeholder="e.g., A_Gaoba"
                      required
                    />
                  </div>
                </div>
                {formData.profiles.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProfile(index)}
                    className="h-8 w-8 mt-8"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">📋 Professional Summary</h3>
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief overview of your professional background, skills, and career goals"
              className="min-h-[120px]"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">💼 Work Experience</h3>
            <Button type="button" variant="outline" size="sm" onClick={addExperience} className="h-8 gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Experience
            </Button>
          </div>
          <div className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div key={index} className="space-y-4 rounded-lg border border-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  {formData.experience.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExperience(index)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`exp-company-${index}`}>
                      <span>Company</span>
                    </Label>
                    <Input
                      id={`exp-company-${index}`}
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                      placeholder="e.g., CereSoftware"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-position-${index}`}>Position</Label>
                    <Input
                      id={`exp-position-${index}`}
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                      placeholder="e.g., Frontend Developer"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-start-${index}`}>
                      <span>📅 Start Date</span>
                    </Label>
                    <Input
                      id={`exp-start-${index}`}
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                      placeholder="e.g., April 2023"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                    <Input
                      id={`exp-end-${index}`}
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                      placeholder="e.g., Present"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-location-${index}`}>
                      <span>📍 Location</span>
                    </Label>
                    <Input
                      id={`exp-location-${index}`}
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                      placeholder="e.g., Yemen"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-website-${index}`}>
                      <span>🔗 Website</span>
                    </Label>
                    <Input
                      id={`exp-website-${index}`}
                      value={exp.website}
                      onChange={(e) => handleExperienceChange(index, "website", e.target.value)}
                      placeholder="e.g., https://company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-desc-${index}`}>Description</Label>
                  <Textarea
                    id={`exp-desc-${index}`}
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements"
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">🎓 Education</h3>
            <Button type="button" variant="outline" size="sm" onClick={addEducation} className="h-8 gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Education
            </Button>
          </div>
          <div className="space-y-6">
            {formData.education.map((edu, index) => (
              <div key={index} className="space-y-4 rounded-lg border border-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Education {index + 1}</h4>
                  {formData.education.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEducation(index)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                    <Input
                      id={`edu-institution-${index}`}
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                      placeholder="e.g., Ufa University of Science and Technology"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-degree-${index}`}>Degree/Certificate</Label>
                    <Input
                      id={`edu-degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      placeholder="e.g., Bachelor's in Software Engineering"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-gpa-${index}`}>GPA</Label>
                    <Input
                      id={`edu-gpa-${index}`}
                      value={edu.gpa}
                      onChange={(e) => handleEducationChange(index, "gpa", e.target.value)}
                      placeholder="e.g., 4.8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-year-${index}`}>Year</Label>
                    <Input
                      id={`edu-year-${index}`}
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                      placeholder="e.g., 2024"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">🚀 Projects</h3>
            <Button type="button" variant="outline" size="sm" onClick={addProject} className="h-8 gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Project
            </Button>
          </div>
          <div className="space-y-6">
            {formData.projects.map((project, index) => (
              <div key={index} className="space-y-4 rounded-lg border border-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Project {index + 1}</h4>
                  {formData.projects.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProject(index)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                    <Input
                      id={`project-name-${index}`}
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                      placeholder="e.g., To Russia  "
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`project-link-${index}`}>
                      <span>🔗 Project Link</span>
                    </Label>
                    <Input
                      id={`project-link-${index}`}
                      value={project.link}
                      onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                      placeholder="e.g., https://project-url.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-desc-${index}`}>Description</Label>
                  <Textarea
                    id={`project-desc-${index}`}
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    placeholder="Brief description of the project, technologies used, and your role"
                    className="min-h-[80px]"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">🛠️ Skills</h3>
            <Button type="button" variant="outline" size="sm" onClick={addSkillCategory} className="h-8 gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Skill Category
            </Button>
          </div>
          <div className="space-y-4">
            {formData.skillCategories.map((category, index) => (
              <div key={index} className="space-y-4 rounded-lg border border-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor={`skill-category-${index}`}>Category</Label>
                    <Input
                      id={`skill-category-${index}`}
                      value={category.category}
                      onChange={(e) => handleSkillCategoryChange(index, "category", e.target.value)}
                      placeholder="e.g., Programming, Web Technologies"
                      required
                    />
                  </div>
                  {formData.skillCategories.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSkillCategory(index)}
                      className="h-8 w-8 ml-2 mt-8"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`skill-list-${index}`}>Skills</Label>
                  <Textarea
                    id={`skill-list-${index}`}
                    value={category.skills}
                    onChange={(e) => handleSkillCategoryChange(index, "skills", e.target.value)}
                    placeholder="e.g., Algorithms, OOP, Data Structures, Design Patterns"
                    className="min-h-[80px]"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">🏆 Certifications</h3>
            <Button type="button" variant="outline" size="sm" onClick={addCertification} className="h-8 gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Certification
            </Button>
          </div>
          <div className="space-y-4">
            {formData.certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="grid grid-cols-3 gap-4 flex-1">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                    <Input
                      id={`cert-name-${index}`}
                      value={cert.name}
                      onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                      placeholder="e.g., Introduction to Artificial Intelligence"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cert-year-${index}`}>Year</Label>
                    <Input
                      id={`cert-year-${index}`}
                      value={cert.year}
                      onChange={(e) => handleCertificationChange(index, "year", e.target.value)}
                      placeholder="e.g., 2024"
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor={`cert-issuer-${index}`}>Issuing Organization</Label>
                    <Input
                      id={`cert-issuer-${index}`}
                      value={cert.issuer}
                      onChange={(e) => handleCertificationChange(index, "issuer", e.target.value)}
                      placeholder="e.g., Ufa State Aviation Technical University"
                      required
                    />
                  </div>
                </div>
                {formData.certifications.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCertification(index)}
                    className="h-8 w-8 mt-8"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">🗣️ Languages</h3>
            <Button type="button" variant="outline" size="sm" onClick={addLanguage} className="h-8 gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Language
            </Button>
          </div>
          <div className="space-y-4">
            {formData.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor={`lang-name-${index}`}>Language</Label>
                    <Input
                      id={`lang-name-${index}`}
                      value={lang.language}
                      onChange={(e) => handleLanguageChange(index, "language", e.target.value)}
                      placeholder="e.g., Arabic, English, Russian"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`lang-proficiency-${index}`}>Proficiency</Label>
                    <Input
                      id={`lang-proficiency-${index}`}
                      value={lang.proficiency}
                      onChange={(e) => handleLanguageChange(index, "proficiency", e.target.value)}
                      placeholder="e.g., Native, Advanced (C1)"
                      required
                    />
                  </div>
                </div>
                {formData.languages.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLanguage(index)}
                    className="h-8 w-8 mt-8"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          Save CV
        </Button>
      </div>
    </form>
  )
}

