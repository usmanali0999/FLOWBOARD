import { auth } from "@/auth";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { Badge } from "@/components/ui/badge";
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
  "workspace creation and member invites",
  "kanban board ui with columns",
  "drag and drop task management",
  "realtime updates across teams",
  "role-based permissions and analytics",
];

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <Badge variant="secondary" className="rounded-full">
              authenticated dashboard
            </Badge>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              welcome back, {session?.user?.name ?? "builder"}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Signed in as {session?.user?.email}
            </p>
          </div>

          <SignOutButton />
        </div>

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

        <Card className="mt-6 rounded-2xl">
          <CardHeader>
            <CardTitle className="capitalize">next implementation roadmap</CardTitle>
            <CardDescription>
              Authentication is complete. Product modules come next.
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