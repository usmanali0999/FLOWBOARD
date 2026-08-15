import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { reorderTaskSchema } from "@/features/task/schemas";

export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = reorderTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid reorder data" },
        { status: 400 },
      );
    }

    const { taskId, sourceColumnId, destinationColumnId, newOrder } =
      parsed.data;

    if (sourceColumnId === destinationColumnId) {
      const tasksInColumn = await db.task.findMany({
        where: { columnId: sourceColumnId },
        orderBy: { order: "asc" },
      });

      const taskIndex = tasksInColumn.findIndex(
        (t: { id: string }) => t.id === taskId,
      );

      if (taskIndex === -1) {
        return NextResponse.json(
          { message: "Task not found" },
          { status: 404 },
        );
      }

      const [movedTask] = tasksInColumn.splice(taskIndex, 1);
      tasksInColumn.splice(newOrder, 0, movedTask);

      await Promise.all(
        tasksInColumn.map((task: { id: string }, index: number) =>
          db.task.update({
            where: { id: task.id },
            data: { order: index + 1 },
          }),
        ),
      );
    } else {
      const sourceTasks = await db.task.findMany({
        where: { columnId: sourceColumnId },
        orderBy: { order: "asc" },
      });

      const destTasks = await db.task.findMany({
        where: { columnId: destinationColumnId },
        orderBy: { order: "asc" },
      });

      const taskIndex = sourceTasks.findIndex(
        (t: { id: string }) => t.id === taskId,
      );

      if (taskIndex === -1) {
        return NextResponse.json(
          { message: "Task not found" },
          { status: 404 },
        );
      }

      const [movedTask] = sourceTasks.splice(taskIndex, 1);
      destTasks.splice(newOrder, 0, movedTask);

      await db.task.update({
        where: { id: taskId },
        data: { columnId: destinationColumnId },
      });

      await Promise.all(
        sourceTasks.map((task: { id: string }, index: number) =>
          db.task.update({
            where: { id: task.id },
            data: { order: index + 1 },
          }),
        ),
      );

      await Promise.all(
        destTasks.map((task: { id: string }, index: number) =>
          db.task.update({
            where: { id: task.id },
            data: { order: index + 1 },
          }),
        ),
      );
    }

    return NextResponse.json({ message: "Task reordered" }, { status: 200 });
  } catch (error) {
    console.error("[TASK_REORDER_ERROR]", error);

    return NextResponse.json(
      { message: "Failed to reorder task" },
      { status: 500 },
    );
  }
}