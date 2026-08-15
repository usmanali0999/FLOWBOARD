import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createWorkspaceSchema } from "@/features/workspace/schemas";

function createBaseSlug(value: string) {
  const base = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return base || "workspace";
}

async function generateUniqueSlug(baseSlug: string) {
  const existing: Array<{ slug: string }> = await db.workspace.findMany({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: {
      slug: true,
    },
  });

  const taken = new Set(existing.map((item: { slug: string }) => item.slug));

  if (!taken.has(baseSlug)) {
    return baseSlug;
  }

  let count = 2;
  let nextSlug = `${baseSlug}-${count}`;

  while (taken.has(nextSlug)) {
    count += 1;
    nextSlug = `${baseSlug}-${count}`;
  }

  return nextSlug;
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createWorkspaceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid workspace data" },
        { status: 400 },
      );
    }

    const name = parsed.data.name.trim();
    const description = parsed.data.description?.trim() || null;

    const baseSlug = createBaseSlug(name);
    const slug = await generateUniqueSlug(baseSlug);

    const workspace = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const createdWorkspace = await tx.workspace.create({
          data: {
            name,
            slug,
            description,
          },
        });

        await tx.workspaceMember.create({
          data: {
            userId: session.user.id,
            workspaceId: createdWorkspace.id,
            role: "OWNER",
          },
        });

        const board = await tx.board.create({
          data: {
            title: "launch board",
            description:
              "Default board created automatically for this workspace.",
            workspaceId: createdWorkspace.id,
          },
        });

        await tx.column.createMany({
          data: [
            {
              title: "backlog",
              order: 1,
              boardId: board.id,
            },
            {
              title: "in progress",
              order: 2,
              boardId: board.id,
            },
            {
              title: "review",
              order: 3,
              boardId: board.id,
            },
            {
              title: "done",
              order: 4,
              boardId: board.id,
            },
          ],
        });

        return createdWorkspace;
      },
    );

    return NextResponse.json(
      {
        message: "Workspace created successfully",
        workspace,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[WORKSPACE_CREATE_ERROR]", error);

    return NextResponse.json(
      { message: "Failed to create workspace" },
      { status: 500 },
    );
  }
}