"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createTaskSchema,
  type CreateTaskInput,
} from "@/features/task/schemas";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CreateTaskDialogProps = {
  columnId: string;
  columnTitle: string;
  boardId: string;
};

export function CreateTaskDialog({
  columnId,
  columnTitle,
  boardId,
}: CreateTaskDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      columnId,
      boardId,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CreateTaskInput) {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message ?? "Failed to create task");
      return;
    }

    toast.success("Task created");

    form.reset({
      title: "",
      description: "",
      priority: "MEDIUM",
      columnId,
      boardId,
    });

    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        className="w-full rounded-xl text-xs"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-3 w-3" />
        add task
      </Button>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            form.reset({
              title: "",
              description: "",
              priority: "MEDIUM",
              columnId,
              boardId,
            });
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="capitalize">
              add task to {columnTitle}
            </DialogTitle>
            <DialogDescription>
              Create a new task inside this column.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium capitalize">title</label>
              <Input
                placeholder="Design homepage"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium capitalize">
                description
              </label>
              <Textarea
                placeholder="Optional task details"
                rows={3}
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium capitalize">priority</label>
              <select
                className="w-full rounded-xl border bg-background px-3 py-2 text-sm"
                {...form.register("priority")}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
              {form.formState.errors.priority && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.priority.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  create task
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}