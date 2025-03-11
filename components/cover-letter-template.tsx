"use client"

interface CoverLetterTemplateProps {
  content: string
}

export function CoverLetterTemplate({ content }: CoverLetterTemplateProps) {
  return (
    <div className="max-w-[800px] mx-auto bg-white text-black p-8 font-serif">
      <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
    </div>
  )
}

