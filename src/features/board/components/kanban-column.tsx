import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCard } from "@/features/task/components/task-card";
import { CreateTaskDialog } from "@/features/task/components/create-task-dialog";

type TaskItem = {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  order: number;
  assignee: {
    name: string | null;
  } | null;
};

type KanbanColumnProps = {
  id: string;
  title: string;
  boardId: string;
  tasks: TaskItem[];
};

export function KanbanColumn({ id, title, boardId, tasks }: KanbanColumnProps) {
  return (
    <Card className="flex min-h-[400px] w-[300px] shrink-0 flex-col rounded-2xl border-border/60 bg-muted/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm capitalize">{title}</CardTitle>
          <Badge variant="outline" className="text-[10px]">
            {tasks.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3">
        {tasks.map((task: TaskItem) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            assigneeName={task.assignee?.name ?? null}
          />
        ))}

        <div className="mt-auto pt-2">
          <CreateTaskDialog
            columnId={id}
            columnTitle={title}
            boardId={boardId}
          />
        </div>
      </CardContent>
    </Card>
  );
}