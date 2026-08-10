import Link from "next/link";
import { Layers3 } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-semibold tracking-tight"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Layers3 className="h-4 w-4" />
      </span>
      <span className="text-sm">{siteConfig.name}</span>
    </Link>
  );
}