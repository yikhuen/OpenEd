import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-20 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            OpenEd – Open Learning for All
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Empower your learning journey with interactive problem-solving
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/practice">Start Learning</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/practice">Browse Questions</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Features Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">AI-Powered Feedback</h3>
                <p className="text-muted-foreground">Get instant, intelligent feedback on your solutions</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Open-Ended Problems</h3>
                <p className="text-muted-foreground">Tackle real-world scenarios with creative solutions</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">Monitor your growth and achievements over time</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
              <li>Sign up for an account or log in</li>
              <li>Browse and select a problem to solve</li>
              <li>Submit your solution via text, file upload, or LaTeX</li>
              <li>Receive instant AI feedback and explanations</li>
              <li>Improve your skills and climb the leaderboard</li>
            </ol>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "OpenEd has revolutionized the way I approach problem-solving. The AI feedback is incredibly helpful!"
                <footer className="mt-2 font-semibold">- Sarah K., Computer Science Student</footer>
              </blockquote>
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "As an educator, I find OpenEd to be an invaluable tool for my students. It promotes critical thinking
                and creativity."
                <footer className="mt-2 font-semibold">- Prof. James L., University Instructor</footer>
              </blockquote>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6 text-center">
        <p className="text-sm text-muted-foreground">&copy; 2023 OpenEd. All rights reserved.</p>
      </footer>
    </div>
  )
}

