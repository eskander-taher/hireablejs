import type React from "react"
import { FileIcon, HistoryIcon } from "lucide-react"

interface EmptyPlaceholderProps {
  children?: React.ReactNode
}

export function EmptyPlaceholder({ children }: EmptyPlaceholderProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-slate-800 bg-slate-900 p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">{children}</div>
    </div>
  )
}

interface EmptyPlaceholderIconProps {
  name: "file" | "history"
}

EmptyPlaceholder.Icon = function EmptyPlaceholderIcon({ name }: EmptyPlaceholderIconProps) {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
      {name === "file" ? (
        <FileIcon className="h-10 w-10 text-slate-400" />
      ) : (
        <HistoryIcon className="h-10 w-10 text-slate-400" />
      )}
    </div>
  )
}

interface EmptyPlaceholderTitleProps {
  children?: React.ReactNode
}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({ children }: EmptyPlaceholderTitleProps) {
  return <p className="mt-6 text-xl font-semibold">{children}</p>
}

interface EmptyPlaceholderDescriptionProps {
  children?: React.ReactNode
}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({ children }: EmptyPlaceholderDescriptionProps) {
  return <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-slate-400">{children}</p>
}

