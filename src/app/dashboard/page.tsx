import { CalendarClock, FolderKanban, Layers3, Users2 } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateWorkspaceDialog } from "@/features/workspace/components/create-workspace-dialog";
import { WorkspaceCard } from "@/features/workspace/components/workspace-card";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ workspace?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const params = await searchParams;
  const selectedSlugFromQuery = params.workspace;

  const workspaces = await db.workspace.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      _count: {
        select: {
          boards: true,
          members: true,
        },
      },
      members: {
        where: {
          userId: session.user.id,
        },
        select: {
          role: true,
        },
        take: 1,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const validSelectedSlug = workspaces.some(
    (workspace) => workspace.slug === selectedSlugFromQuery,
  )
    ? selectedSlugFromQuery
    : workspaces[0]?.slug;

  const selectedWorkspace = validSelectedSlug
    ? await db.workspace.findFirst({
        where: {
          slug: validSelectedSlug,
          members: {
            some: {
              userId: session.user.id,
            },
          },
        },
        include: {
          _count: {
            select: {
              boards: true,
              members: true,
            },
          },
          boards: {
            include: {
              columns: {
                orderBy: {
                  order: "asc",
                },
                include: {
                  _count: {
                    select: {
                      tasks: true,
                    },
                  },
                },
              },
              _count: {
                select: {
                  tasks: true,
                },
              },
            },
            orderBy: {
              updatedAt: "desc",
            },
          },
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      })
    : null;

  const totalBoards = workspaces.reduce(
    (sum, workspace) => sum + workspace._count.boards,
    0,
  );

  const totalMembers = workspaces.reduce(
    (sum, workspace) => sum + workspace._count.members,
    0,
  );

  const totalTasksInSelectedWorkspace =
    selectedWorkspace?.boards.reduce(
      (sum, board) => sum + board._count.tasks,
      0,
    ) ?? 0;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="secondary" className="rounded-full">
            workspace engine
          </Badge>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            build workspaces like a real product team
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Create team workspaces, generate default boards automatically, and
            manage product execution from a real database-backed dashboard.
          </p>
        </div>

        <CreateWorkspaceDialog />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2 text-primary">
                <Layers3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">workspaces</p>
                <p className="text-3xl font-semibold">{workspaces.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2 text-primary">
                <FolderKanban className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">boards</p>
                <p className="text-3xl font-semibold">{totalBoards}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2 text-primary">
                <Users2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">members</p>
                <p className="text-3xl font-semibold">{totalMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2 text-primary">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  selected workspace tasks
                </p>
                <p className="text-3xl font-semibold">
                  {totalTasksInSelectedWorkspace}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {workspaces.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="rounded-2xl bg-primary/10 p-4 text-primary">
              <Layers3 className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">no workspace yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your first workspace and Flowboard will automatically set
                up a default launch board for you.
              </p>
            </div>
            <CreateWorkspaceDialog />
          </CardContent>
        </Card>
      ) : (
        <>
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="capitalize">workspace switcher</CardTitle>
                <CardDescription>
                  Select a workspace and inspect its board structure.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4 md:grid-cols-2">
                {workspaces.map((workspace) => (
                  <WorkspaceCard
                    key={workspace.id}
                    name={workspace.name}
                    slug={workspace.slug}
                    description={workspace.description}
                    boardsCount={workspace._count.boards}
                    membersCount={workspace._count.members}
                    role={workspace.members[0]?.role ?? "MEMBER"}
                    active={workspace.slug === validSelectedSlug}
                  />
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="capitalize">
                  selected workspace summary
                </CardTitle>
                <CardDescription>
                  Real-time database-backed overview for the active workspace.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {selectedWorkspace ? (
                  <>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        active workspace
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold capitalize">
                        {selectedWorkspace.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {selectedWorkspace.description ||
                          "No description has been added to this workspace yet."}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border bg-background p-4">
                        <p className="text-sm text-muted-foreground">boards</p>
                        <p className="mt-2 text-2xl font-semibold">
                          {selectedWorkspace._count.boards}
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-background p-4">
                        <p className="text-sm text-muted-foreground">members</p>
                        <p className="mt-2 text-2xl font-semibold">
                          {selectedWorkspace._count.members}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-medium capitalize">
                        team members
                      </p>

                      <div className="space-y-3">
                        {selectedWorkspace.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between rounded-2xl border bg-background p-3"
                          >
                            <div>
                              <p className="text-sm font-medium">
                                {member.user.name || "Unnamed user"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.user.email}
                              </p>
                            </div>

                            <Badge variant="secondary">{member.role}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Select a workspace to see details.
                  </p>
                )}
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="capitalize">board structure</CardTitle>
                <CardDescription>
                  Boards are auto-created with workflow columns when a workspace
                  is created.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {selectedWorkspace?.boards.map((board) => (
                  <Card key={board.id} className="rounded-2xl border-border/60">
                    <CardHeader>
                      <CardTitle className="text-lg capitalize">
                        {board.title}
                      </CardTitle>
                      <CardDescription>
                        {board.description || "No board description yet."}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border bg-muted/30 p-3">
                          <p className="text-xs text-muted-foreground">
                            columns
                          </p>
                          <p className="mt-1 text-xl font-semibold">
                            {board.columns.length}
                          </p>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                          <p className="text-xs text-muted-foreground">tasks</p>
                          <p className="mt-1 text-xl font-semibold">
                            {board._count.tasks}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {board.columns.map((column) => (
                          <div
                            key={column.id}
                            className="flex items-center justify-between rounded-xl border bg-background px-3 py-2 text-sm"
                          >
                            <span className="capitalize">{column.title}</span>
                            <Badge variant="outline">
                              {column._count.tasks} tasks
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </div>
  );
}