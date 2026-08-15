import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createTaskSchema } from "@/features/task/schemas";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid task data" },
        { status: 400 },
      );
    }

    const { title, description, priority, columnId, boardId } = parsed.data;

    const lastTask = await db.task.findFirst({
      where: { columnId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = (lastTask?.order ?? 0) + 1;

    const task = await db.task.create({
      data: {
        title,
        description: description || null,
        priority,
        columnId,
        boardId,
        order: newOrder,
        assigneeId: session.user.id,
      },
    });

    return NextResponse.json(
      { message: "Task created", task },
      { status: 201 },
    );
  } catch (error) {
    console.error("[TASK_CREATE_ERROR]", error);

    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 },
    );
  }
}