import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const leaderboardData = [
  { rank: 1, name: "Alice", score: 1000, problemsSolved: 50 },
  { rank: 2, name: "Bob", score: 950, problemsSolved: 48 },
  { rank: 3, name: "Charlie", score: 900, problemsSolved: 45 },
  { rank: 4, name: "David", score: 850, problemsSolved: 42 },
  { rank: 5, name: "Eve", score: 800, problemsSolved: 40 },
]

export default function Leaderboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Problems Solved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((user) => (
                  <TableRow key={user.rank}>
                    <TableCell className="font-medium">{user.rank}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.score}</TableCell>
                    <TableCell className="text-right">{user.problemsSolved}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

