import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const questions = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
  },
  {
    id: 3,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    description:
      "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
  },
  {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
  },
  {
    id: 5,
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graph",
    description:
      "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.",
  },
]

const difficultyColor = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800",
}

export default function Practice() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold mb-8">Practice Questions</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {questions.map((question) => (
            <Card key={question.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{question.title}</span>
                  <Badge className={difficultyColor[question.difficulty as keyof typeof difficultyColor]}>
                    {question.difficulty}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <Badge variant="outline" className="mb-2">
                  {question.category}
                </Badge>
                <p className="text-muted-foreground">{question.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/practice/${question.id}`}>Solve Challenge</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

