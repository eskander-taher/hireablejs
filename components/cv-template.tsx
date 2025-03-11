"use client"

import { Star, StarHalf } from "lucide-react"
import { useEffect, useState } from "react"

interface CVTemplateProps {
  data: any
  aiContent?: string
}

export function CVTemplate({ data, aiContent }: CVTemplateProps) {
  const [parsedSections, setParsedSections] = useState<any>({})
  const [htmlContent, setHtmlContent] = useState<string>("")

  useEffect(() => {
    if (aiContent) {
      // Check if the content is HTML
      if (aiContent.includes("<h1>") || aiContent.includes("<h2>") || aiContent.includes("<p>")) {
        setHtmlContent(aiContent)
      } else {
        // Parse the AI content into sections
        const sections = parseAIContent(aiContent)
        setParsedSections(sections)
      }
    }
  }, [aiContent])

  // Function to parse AI-generated content into sections
  const parseAIContent = (content: string) => {
    const sections: any = {}

    // Simple parsing logic - in a real app, you'd want more robust parsing
    const lines = content.split("\n")
    let currentSection = ""
    let sectionContent: string[] = []

    lines.forEach((line) => {
      // Check if this is a section header
      if (line.match(/^#+\s/) || line.match(/^[A-Z][A-Za-z\s]+:$/) || line.match(/^[A-Z][A-Za-z\s]+$/)) {
        // Save previous section if it exists
        if (currentSection && sectionContent.length) {
          sections[currentSection] = sectionContent.join("\n")
        }

        // Start new section
        currentSection = line.replace(/^#+\s/, "").replace(/:$/, "")
        sectionContent = []
      } else if (currentSection) {
        sectionContent.push(line)
      }
    })

    // Save the last section
    if (currentSection && sectionContent.length) {
      sections[currentSection] = sectionContent.join("\n")
    }

    return sections
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-current" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-current" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return stars
  }

  // If we have HTML content, render it directly
  if (htmlContent) {
    return (
      <div className="max-w-[800px] mx-auto bg-white text-black p-8">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    )
  }

  // Function to render a section from AI content or fall back to form data
  const renderSection = (sectionName: string, formDataSection: any) => {
    if (parsedSections[sectionName]) {
      return <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: parsedSections[sectionName] }} />
    }
    return formDataSection
  }

  // Get summary from AI content or fall back to form data
  const summary = parsedSections["Summary"] || parsedSections["SUMMARY"] || data.summary

  return (
    <div className="max-w-[800px] mx-auto bg-white text-black p-8">
      {/* Header */}
      <header className="flex items-center gap-4 mb-6">
        {data.photoUrl && (
          <img
            src={data.photoUrl || "/placeholder.svg"}
            alt={data.name}
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="text-gray-600">{data.title}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            {data.location && <span className="flex items-center gap-1">📍 {data.location}</span>}
            {data.phone && <span className="flex items-center gap-1">📞 {data.phone}</span>}
            {data.email && <span className="flex items-center gap-1">📧 {data.email}</span>}
          </div>
        </div>
      </header>

      {/* Company Tailoring Indicator */}
      {aiContent && (
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 text-sm font-medium">
            ✨ This CV has been professionally tailored to highlight your most relevant qualifications for this specific
            company/job.
          </p>
        </div>
      )}

      {/* Profiles */}
      {data.profiles?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">📱 Profiles</h2>
          <div className="flex flex-wrap gap-4">
            {data.profiles.map((profile: any, index: number) => (
              <a
                key={index}
                href={
                  profile.username.startsWith("http")
                    ? profile.username
                    : `https://${profile.platform.toLowerCase()}.com/${profile.username}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                {profile.platform}: {profile.username}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">📝 Professional Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {(parsedSections["Experience"] || parsedSections["EXPERIENCE"] || data.experience?.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4">💼 Experience</h2>
          {parsedSections["Experience"] || parsedSections["EXPERIENCE"] ? (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: parsedSections["Experience"] || parsedSections["EXPERIENCE"],
              }}
            />
          ) : (
            data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.company}</h3>
                    <p className="text-gray-600">{exp.position}</p>
                  </div>
                  <div className="text-right text-gray-600">
                    <p>
                      📅 {exp.startDate} – {exp.endDate}
                    </p>
                    {exp.location && <p>📍 {exp.location}</p>}
                  </div>
                </div>
                {exp.website && (
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    🔗 Company Website
                  </a>
                )}
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  {exp.description.split("\n").map((item: string, i: number) => (
                    <li key={i}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>
      )}

      {/* Education */}
      {(parsedSections["Education"] || parsedSections["EDUCATION"] || data.education?.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4">🎓 Education</h2>
          {parsedSections["Education"] || parsedSections["EDUCATION"] ? (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: parsedSections["Education"] || parsedSections["EDUCATION"],
              }}
            />
          ) : (
            data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <p className="text-gray-600">{edu.degree}</p>
                  </div>
                  <div className="text-right">
                    <p>{edu.year}</p>
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* Projects */}
      {(parsedSections["Projects"] || parsedSections["PROJECTS"] || data.projects?.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4">🚀 Projects</h2>
          {parsedSections["Projects"] || parsedSections["PROJECTS"] ? (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: parsedSections["Projects"] || parsedSections["PROJECTS"],
              }}
            />
          ) : (
            data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">
                  {project.name}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-2 text-sm"
                    >
                      🔗 Live Project
                    </a>
                  )}
                </h3>
                <p className="text-gray-700">{project.description}</p>
              </div>
            ))
          )}
        </section>
      )}

      {/* Skills */}
      {(parsedSections["Skills"] || parsedSections["SKILLS"] || data.skillCategories?.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4">🛠️ Skills</h2>
          {parsedSections["Skills"] || parsedSections["SKILLS"] ? (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: parsedSections["Skills"] || parsedSections["SKILLS"],
              }}
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {data.skillCategories.map((category: any, index: number) => (
                <div key={index}>
                  <h3 className="font-semibold mb-2">{category.category}</h3>
                  <p className="text-gray-700">{category.skills}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Certifications */}
      {(parsedSections["Certifications"] || parsedSections["CERTIFICATIONS"] || data.certifications?.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4">🏆 Certifications</h2>
          {parsedSections["Certifications"] || parsedSections["CERTIFICATIONS"] ? (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: parsedSections["Certifications"] || parsedSections["CERTIFICATIONS"],
              }}
            />
          ) : (
            data.certifications.map((cert: any, index: number) => (
              <div key={index} className="mb-2">
                <p>
                  <span className="font-medium">{cert.name}</span> – {cert.issuer} ({cert.year})
                </p>
              </div>
            ))
          )}
        </section>
      )}

      {/* Languages */}
      {(parsedSections["Languages"] || parsedSections["LANGUAGES"] || data.languages?.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4">🗣️ Languages</h2>
          {parsedSections["Languages"] || parsedSections["LANGUAGES"] ? (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: parsedSections["Languages"] || parsedSections["LANGUAGES"],
              }}
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {data.languages.map((lang: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{lang.language}</span>
                  <div className="flex items-center gap-1">
                    {renderStars(
                      lang.proficiency === "Native"
                        ? 5
                        : lang.proficiency.includes("Advanced")
                          ? 4
                          : lang.proficiency.includes("Intermediate")
                            ? 3
                            : 2,
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

