import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  Users2,
} from "lucide-react";

import { auth } from "@/auth";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

const navItems = [
  {
    title: "overview",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "workspaces",
    href: "/dashboard",
    icon: <FolderKanban className="h-4 w-4" />,
  },
  {
    title: "members",
    href: "/dashboard",
    icon: <Users2 className="h-4 w-4" />,
  },
  {
    title: "analytics",
    href: "/dashboard",
    icon: <BarChart3 className="h-4 w-4" />,
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r bg-background lg:flex lg:flex-col">
          <div className="flex h-16 items-center px-6">
            <Logo />
          </div>

          <Separator />

          <div className="flex flex-1 flex-col justify-between p-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm capitalize text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="rounded-2xl border bg-muted/40 p-4">
              <p className="text-sm font-medium">
                {session.user.name ?? "Flowboard User"}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
              <div>
                <p className="text-sm font-medium capitalize">
                  flowboard dashboard
                </p>
                <p className="text-xs text-muted-foreground">
                  workspace operating system for modern teams
                </p>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <SignOutButton />
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}