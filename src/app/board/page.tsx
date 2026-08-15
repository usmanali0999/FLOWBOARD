import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/features/board/components/kanban-board";

export default async function BoardPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const params = await searchParams;
  const boardId = params.id;

  if (!boardId) {
    redirect("/dashboard");
  }

  const board = await db.board.findFirst({
    where: {
      id: boardId,
      workspace: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    },
    include: {
      workspace: {
        select: {
          name: true,
          slug: true,
        },
      },
      columns: {
        orderBy: {
          order: "asc",
        },
        include: {
          tasks: {
            orderBy: {
              order: "asc",
            },
            include: {
              assignee: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!board) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Button asChild size="sm" variant="outline" className="rounded-xl">
                <Link href={`/dashboard?workspace=${board.workspace.slug}`}>
                  <ArrowLeft className="h-4 w-4" />
                  back
                </Link>
              </Button>

              <Badge variant="secondary" className="rounded-full">
                {board.workspace.name}
              </Badge>
            </div>

            <h1 className="mt-3 text-3xl font-semibold capitalize tracking-tight">
              {board.title}
            </h1>

            {board.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {board.description}
              </p>
            )}
          </div>
        </div>

        <KanbanBoard
          boardId={board.id}
          boardTitle={board.title}
          columns={board.columns}
        />
      </div>
    </div>
  );
}