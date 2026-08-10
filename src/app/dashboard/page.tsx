import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  { title: "total workspaces", value: "04" },
  { title: "active boards", value: "12" },
  { title: "tasks completed", value: "86" },
];

const nextSteps = [
  "auth.js login system — google + credentials",
  "workspace creation & management",
  "kanban board UI with columns",
  "drag and drop task management",
  "realtime collaboration via websockets",
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge variant="secondary" className="rounded-full">
              alpha — phase 01
            </Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              dashboard overview
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Foundation is ready. Auth, boards, and real data coming next.
            </p>
          </div>

          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/">back to home</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="rounded-2xl">
              <CardContent className="p-6">
                <p className="text-sm capitalize text-muted-foreground">
                  {stat.title}
                </p>
                <p className="mt-3 text-4xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="mt-6 rounded-2xl">
          <CardHeader>
            <CardTitle className="capitalize">implementation roadmap</CardTitle>
            <CardDescription>
              Features being built in sequence — each step is production-grade.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border bg-background p-4 text-sm"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <span className="capitalize text-muted-foreground">{step}</span>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </main>
  );
}