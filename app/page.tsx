import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, FileText, Briefcase, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/20 dark:border-slate-800/20 py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Hireable<span className="text-orange-500">JS</span>
            </h1>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button asChild variant="ghost" className="font-medium">
                <Link href="/app">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
              >
                <Link href="/app">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-white dark:bg-slate-950">
        {/* Hero Section - Full Screen */}
        <section className="relative min-h-screen flex items-center pt-16">
          {/* Background Pattern/Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 z-0"></div>
          <div className="absolute inset-0 opacity-30 dark:opacity-20 bg-[url('/grid-pattern.svg')] z-0"></div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 z-10 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                    Create Perfect <span className="text-orange-500">Cover Letters</span> in Seconds
                  </h2>
                  <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-xl">
                    Upload your CV, paste a job description, and let our AI create a tailored cover letter that gets you
                    noticed.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white h-14 px-8 text-lg"
                  >
                    <Link href="/app" className="flex items-center gap-2">
                      Start Creating <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg">
                    <Link href="#how-it-works">Learn More</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Sparkles className="h-5 w-5 text-orange-500" />
                  <span>Powered by advanced AI to match your skills with job requirements</span>
                </div>
              </div>

              <div className="relative hidden md:block">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">cover-letter.pdf</div>
                  </div>
                  <div className="space-y-3 font-serif">
                    <div className="text-right text-sm text-slate-500 dark:text-slate-400">April 15, 2025</div>
                    <div>
                      <p className="font-medium">Dear Hiring Manager,</p>
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">
                      <p>
                        I am writing to express my interest in the Software Engineer position at TechCorp as advertised
                        on your website. With my background in full-stack development and experience with React and
                        Node.js, I believe I would be a valuable addition to your team.
                      </p>
                      <p className="mt-2">My experience at InnovateTech has equipped me with the skills to...</p>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-4">[Preview continues...]</div>
                    <div className="mt-4">
                      <p className="font-medium">Sincerely,</p>
                      <p>Your Name</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-slate-500 dark:text-slate-400 mb-2">Scroll to learn more</span>
            <svg
              className="w-6 h-6 text-slate-500 dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-slate-100 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Our AI-powered platform makes creating tailored cover letters and CVs simple and efficient
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                  <FileText className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Upload Your CV</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Enter your professional details or upload your existing CV. Our system will analyze your skills and
                  experience.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Add Job Details</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Paste the job description and company information. Our AI will identify key requirements and
                  expectations.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. Generate Documents</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Our AI creates a tailored CV and cover letter that highlights your relevant skills and experience for
                  the specific job.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why Choose Hireablejs
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Our platform offers unique advantages to help you stand out in your job applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Customization",
                  description:
                    "Our advanced AI tailors your documents to match specific job requirements and company culture.",
                },
                {
                  title: "Time-Saving",
                  description:
                    "Create professional cover letters in seconds instead of hours of manual writing and editing.",
                },
                {
                  title: "Higher Response Rate",
                  description:
                    "Tailored applications have been proven to receive more interview invitations than generic ones.",
                },
                {
                  title: "Professional Templates",
                  description: "Choose from a variety of professionally designed templates for different industries.",
                },
                {
                  title: "Easy Editing",
                  description: "Fine-tune generated content with our intuitive editor to add your personal touch.",
                },
                {
                  title: "PDF Export",
                  description: "Download your documents as professional PDFs ready to be submitted to employers.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Land Your Dream Job?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Start creating tailored cover letters and CVs that get you noticed by employers
            </p>
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-slate-100 h-14 px-8 text-lg">
              <Link href="/app" className="flex items-center gap-2">
                Get Started Now <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Hireable<span className="text-orange-500">JS</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                AI-powered cover letters and CVs tailored to get you noticed by employers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "Templates", "Examples"].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Blog", "Career Tips", "Help Center", "Contact"].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            © 2025 Hireablejs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

