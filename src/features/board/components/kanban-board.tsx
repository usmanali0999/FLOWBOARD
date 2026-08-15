import { KanbanColumn } from "./kanban-column";

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

type ColumnItem = {
  id: string;
  title: string;
  order: number;
  tasks: TaskItem[];
};

type KanbanBoardProps = {
  boardId: string;
  boardTitle: string;
  columns: ColumnItem[];
};

export function KanbanBoard({ boardId, boardTitle, columns }: KanbanBoardProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold capitalize">{boardTitle}</h2>
        <p className="text-sm text-muted-foreground">
          {columns.length} columns · drag tasks between columns to manage
          workflow
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column: ColumnItem) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            boardId={boardId}
            tasks={column.tasks}
          />
        ))}
      </div>
    </div>
  );
}