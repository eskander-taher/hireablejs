import type React from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">Hireablejs</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-300"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/generate"
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Generate
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-8">
        <div className="grid gap-6">{children}</div>
      </main>
    </div>
  )
}

