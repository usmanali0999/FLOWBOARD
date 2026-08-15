import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical } from "lucide-react";

type TaskCardProps = {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  assigneeName: string | null;
};

const priorityColors: Record<string, string> = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

export function TaskCard({
  title,
  description,
  priority,
  assigneeName,
}: TaskCardProps) {
  return (
    <Card className="cursor-grab rounded-xl border-border/60 transition-all hover:shadow-sm active:cursor-grabbing">
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />

          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium leading-5">{title}</p>

            {description && (
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {description}
              </p>
            )}

            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`text-[10px] ${priorityColors[priority] || ""}`}
              >
                {priority}
              </Badge>

              {assigneeName && (
                <span className="text-[10px] text-muted-foreground">
                  {assigneeName}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}