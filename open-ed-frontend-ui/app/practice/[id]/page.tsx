"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProblemSolving({ params }: { params: { id: string } }) {
  const [solution, setSolution] = useState("")
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleSubmit = () => {
    // Here you would typically send the solution to your backend for AI processing
    // For this example, we'll just set some mock feedback
    setFeedback(
      "Your solution is partially correct. The time complexity is optimal, but there's a more efficient way to handle edge cases.",
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Problem #{params.id}: Binary Search Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Implement a binary search algorithm to find a target value in a sorted array. Your function should
                return the index of the target if found, or -1 if not found.
              </p>
              <h3 className="font-semibold mt-4">Input:</h3>
              <p>nums = [1, 3, 5, 7, 9], target = 5</p>
              <h3 className="font-semibold mt-4">Output:</h3>
              <p>2</p>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your solution here..."
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="min-h-[200px]"
            />
            <Button onClick={handleSubmit}>Submit Solution</Button>
            {feedback && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feedback}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

