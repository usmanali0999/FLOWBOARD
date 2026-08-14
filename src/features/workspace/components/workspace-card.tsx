import Link from "next/link";
import { ArrowRight, FolderKanban, Users2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type WorkspaceCardProps = {
  name: string;
  slug: string;
  description: string | null;
  boardsCount: number;
  membersCount: number;
  role: string;
  active?: boolean;
};

export function WorkspaceCard({
  name,
  slug,
  description,
  boardsCount,
  membersCount,
  role,
  active = false,
}: WorkspaceCardProps) {
  return (
    <Card
      className={`rounded-2xl border-border/60 transition-all ${
        active ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm"
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="capitalize">{name}</CardTitle>
            <CardDescription className="mt-2 line-clamp-2">
              {description || "No description added yet for this workspace."}
            </CardDescription>
          </div>

          <Badge variant={active ? "default" : "secondary"}>{role}</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <FolderKanban className="h-4 w-4" />
          <span>{boardsCount} boards</span>
        </div>

        <div className="flex items-center gap-2">
          <Users2 className="h-4 w-4" />
          <span>{membersCount} members</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          asChild
          variant={active ? "default" : "outline"}
          className="w-full rounded-xl"
        >
          <Link href={`/dashboard?workspace=${slug}`}>
            {active ? "current workspace" : "open workspace"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}