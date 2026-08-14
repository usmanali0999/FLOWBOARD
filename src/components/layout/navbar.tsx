import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { auth } from "@/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm capitalize text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {session?.user ? (
            <Button asChild className="rounded-xl">
              <Link href="/dashboard">dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/login">sign in</Link>
              </Button>
              <Button asChild className="rounded-xl">
                <Link href="/login">get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}