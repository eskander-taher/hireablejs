import { Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AITipsProps {
  type: "cv" | "coverLetter"
}

export function AITips({ type }: AITipsProps) {
  return (
    <Card className="border-orange-500/20 bg-orange-500/5">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-orange-500" />
          <CardTitle className="text-lg">
            {type === "cv" ? "CV Generation Tips" : "Cover Letter Generation Tips"}
          </CardTitle>
        </div>
        <CardDescription>Get the best results from our AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {type === "cv" ? (
          <>
            <p>
              • Include <strong>detailed company information</strong> to tailor your CV
            </p>
            <p>
              • Add the company's <strong>mission and values</strong> for better alignment
            </p>
            <p>
              • Mention the <strong>industry and market position</strong> of the company
            </p>
            <p>
              • Include information about the <strong>company culture</strong> if available
            </p>
            <p>
              • Always <strong>review and personalize</strong> the AI-generated content before sending
            </p>
          </>
        ) : (
          <>
            <p>
              • Include the <strong>full job description</strong> with all requirements and qualifications
            </p>
            <p>
              • Add the <strong>exact company name</strong> for company-specific tailoring
            </p>
            <p>
              • Provide a <strong>specific job title</strong> that matches the position
            </p>
            <p>
              • Include any information about the <strong>team or department</strong> if available
            </p>
            <p>
              • Always <strong>review and personalize</strong> the AI-generated content before sending
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

