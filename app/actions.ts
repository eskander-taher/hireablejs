"use server"

import { mistral } from "@ai-sdk/mistral"
import { generateText } from "ai"

import dotenv from "dotenv";
dotenv.config();


export async function generateCoverLetterWithAI(
  cvData: any,
  jobDescription: string,
  companyName: string,
  jobTitle: string,
) {
  try {
    const prompt = `
You are a professional career coach and expert resume writer. Create a highly personalized, compelling cover letter based on the following information:

CV DATA:
Name: ${cvData.name}
Professional Title: ${cvData.title}
Location: ${cvData.location}
Phone: ${cvData.phone}
Email: ${cvData.email}

Profiles: ${cvData.profiles.map((p: any) => `${p.platform}: ${p.username}`).join(", ")}

Summary: ${cvData.summary}

Experience: 
${cvData.experience
  .map(
    (exp: any) =>
      `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate}) | ${exp.location}
   ${exp.description}`,
  )
  .join("\n")}

Education:
${cvData.education
  .map((edu: any) => `- ${edu.degree} from ${edu.institution} (${edu.year})${edu.gpa ? ` - GPA: ${edu.gpa}` : ""}`)
  .join("\n")}

Projects:
${cvData.projects
  .map(
    (proj: any) =>
      `- ${proj.name}${proj.link ? ` (${proj.link})` : ""}
   ${proj.description}`,
  )
  .join("\n")}

Skills:
${cvData.skillCategories.map((cat: any) => `- ${cat.category}: ${cat.skills}`).join("\n")}

Certifications:
${cvData.certifications.map((cert: any) => `- ${cert.name} - ${cert.issuer} (${cert.year})`).join("\n")}

Languages:
${cvData.languages.map((lang: any) => `- ${lang.language} - ${lang.proficiency}`).join("\n")}

JOB DETAILS:
Company: ${companyName}
Job Title: ${jobTitle}
Job Description: ${jobDescription}

IMPORTANT FORMATTING INSTRUCTIONS:
1. Format the cover letter as a proper business letter with the following header:
   - Include the candidate's full name, address, email, and phone from the CV data
   - Include today's date
   - Include the company name and "Hiring Manager" as the recipient
   - DO NOT use placeholders like [Your Name] or [Your Address] - use the actual data provided

2. Content requirements:
   - Address the letter to "Hiring Manager" or a specific name if provided
   - Create a compelling opening paragraph that shows interest in the specific position
   - Highlight relevant skills and experiences that match the job requirements
   - Explain why the candidate is interested in this specific company
   - Include a strong closing paragraph with a call to action
   - End with "Sincerely," followed by the candidate's full name

3. The letter should be concise (250-350 words) and compelling
4. The letter should be ready to send without further editing
5. DO NOT include any placeholders or fields to be filled in later - use the actual data provided
`

    const { text } = await generateText({
      model: mistral("mistral-large-latest"),
      prompt,
      maxTokens: 1500,
    })

    return { success: true, content: text }
  } catch (error) {
    console.error("Error generating cover letter:", error)
    return {
      success: false,
      content: "Failed to generate cover letter. Please try again later.",
    }
  }
}

export async function generateCVWithAI(cvData: any, companyDescription = "") {
  try {
    const prompt = `
You are a professional CV writer with 15+ years of experience creating high-impact, ATS-optimized CVs for job seekers. Your task is to create an exceptional CV based on the provided information, specifically tailored to match the target company.

CV DATA:
Name: ${cvData.name}
Professional Title: ${cvData.title}
Location: ${cvData.location}
Phone: ${cvData.phone}
Email: ${cvData.email}

Profiles: ${cvData.profiles.map((p: any) => `${p.platform}: ${p.username}`).join(", ")}

Summary: ${cvData.summary}

Experience: 
${cvData.experience
  .map(
    (exp: any) =>
      `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate}) | ${exp.location}
   ${exp.description}`,
  )
  .join("\n")}

Education:
${cvData.education
  .map((edu: any) => `- ${edu.degree} from ${edu.institution} (${edu.year})${edu.gpa ? ` - GPA: ${edu.gpa}` : ""}`)
  .join("\n")}

Projects:
${cvData.projects
  .map(
    (proj: any) =>
      `- ${proj.name}${proj.link ? ` (${proj.link})` : ""}
   ${proj.description}`,
  )
  .join("\n")}

Skills:
${cvData.skillCategories.map((cat: any) => `- ${cat.category}: ${cat.skills}`).join("\n")}

Certifications:
${cvData.certifications.map((cert: any) => `- ${cert.name} - ${cert.issuer} (${cert.year})`).join("\n")}

Languages:
${cvData.languages.map((lang: any) => `- ${lang.language} - ${lang.proficiency}`).join("\n")}

TARGET COMPANY/JOB DESCRIPTION:
${companyDescription}

INSTRUCTIONS:
1. COMPLETELY REWRITE the CV to create a highly targeted document that aligns with the company's needs and culture
2. Create a POWERFUL, ACHIEVEMENT-FOCUSED professional summary that positions the candidate as an ideal fit
3. TRANSFORM experience descriptions into impactful bullet points that emphasize relevant achievements and quantifiable results
4. PRIORITIZE skills and experiences that directly match the company's requirements
5. INCORPORATE keywords from the company description throughout the CV to optimize for ATS systems
6. MAINTAIN a clean, professional structure with clear section headers
7. USE emojis for section headers (📝, 💼, 🎓, 🚀, 🛠️, 🏆, 🗣️) to create visual interest
8. ENSURE the CV is comprehensive yet concise, focusing on quality over quantity
9. INCLUDE all relevant sections: Summary, Experience, Education, Projects, Skills, Certifications, and Languages

FORMAT:
- Use HTML formatting for the CV with appropriate tags (<h1>, <h2>, <p>, <ul>, <li>, etc.)
- Create a visually appealing, professional layout
- Use bullet points for achievements and skills
- Include appropriate spacing and formatting for readability

The final CV should be a complete, ready-to-use document that will significantly increase the candidate's chances of getting an interview.
`

    const { text } = await generateText({
      model: mistral("mistral-large-latest"),
      prompt,
      maxTokens: 2000,
    })

    return { success: true, content: text }
  } catch (error) {
    console.error("Error generating CV:", error)
    return {
      success: false,
      content: "Failed to generate CV. Please try again later.",
    }
  }
}

