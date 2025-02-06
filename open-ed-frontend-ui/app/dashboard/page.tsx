import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={33} className="w-full" />
              <p className="mt-2 text-sm text-muted-foreground">33% complete</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">#42</p>
              <p className="text-sm text-muted-foreground">Out of 1000 users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Solved Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">27</p>
              <p className="text-sm text-muted-foreground">Out of 100 total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">Recent interactions</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y">
              <li className="p-4">Solved Problem #42: Binary Search Tree</li>
              <li className="p-4">Received AI feedback on Problem #39</li>
              <li className="p-4">Attempted Problem #45: Dynamic Programming</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

