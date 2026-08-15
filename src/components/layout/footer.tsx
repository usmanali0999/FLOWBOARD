import { siteConfig } from "@/config/site";
import { Layers3 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 md:flex-row md:justify-between md:px-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Layers3 className="h-3 w-3" />
          </span>
          <span className="font-medium">{siteConfig.name}</span>
        </div>

        <p className="text-xs text-muted-foreground">
          Built as professional project no. 15 — production-grade workflow
          management platform.
        </p>

        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          github
        </a>
      </div>
    </footer>
  );
}