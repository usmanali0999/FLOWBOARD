import Link from "next/link";
import {
  ArrowRight,
  FolderKanban,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FeatureCard } from "@/components/shared/feature-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "realtime collaboration",
    description:
      "Teams can work together on boards, tasks, and workflows with instant updates — no refresh needed.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "kanban workflows",
    description:
      "Create structured boards with draggable columns and tasks for better team execution.",
    icon: <FolderKanban className="h-5 w-5" />,
  },
  {
    title: "high performance",
    description:
      "Built with modern architecture for fast rendering, scalable data flow, and smooth UX.",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "role-based access",
    description:
      "Secure workspaces with controlled permissions for owners, admins, and members.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const stats = [
  { label: "workspaces", value: "04" },
  { label: "active boards", value: "12" },
  { label: "tasks completed", value: "128" },
];

const roadmap = [
  {
    phase: "phase 01",
    title: "foundation",
    description:
      "Next.js architecture, UI system, state setup, and database design.",
  },
  {
    phase: "phase 02",
    title: "product features",
    description:
      "Auth, workspaces, boards, columns, tasks, and drag-and-drop workflows.",
  },
  {
    phase: "phase 03",
    title: "scale & polish",
    description:
      "Realtime sync, optimistic updates, permissions, analytics, and deployment.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_50%)]" />

          <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="secondary"
                className="rounded-full px-4 py-1 text-xs uppercase tracking-[0.2em]"
              >
                professional project no. 15
              </Badge>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
                build workflows that actually{" "}
                <span className="text-primary">move fast</span>
              </h1>

              <p className="mt-6 text-base leading-7 text-muted-foreground md:text-lg">
                FLOWBOARD is a modern collaborative workflow platform for teams
                that need speed, clarity, and scale — built like a real SaaS
                product.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-xl">
                  <Link href="/dashboard">
                    open dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl"
                >
                  <Link href="#features">see features</Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="rounded-2xl border-border/60 bg-card/60 backdrop-blur"
                >
                  <CardContent className="p-6">
                    <p className="text-sm capitalize text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-4xl font-semibold tracking-tight">
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-4 py-20 md:px-6"
        >
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              built like a real SaaS product
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every feature is designed to look and feel like a production
              workflow platform — not a tutorial clone.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section
          id="roadmap"
          className="mx-auto max-w-7xl px-4 pb-24 md:px-6"
        >
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              development roadmap
            </h2>
            <p className="mt-3 text-muted-foreground">
              This project is built in phases — from foundation to full
              production-grade features.
            </p>
          </div>

          <Card className="rounded-3xl border-border/60">
            <CardContent className="grid gap-8 p-6 md:grid-cols-3 md:p-10">
              {roadmap.map((item, index) => (
                <div key={index}>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {item.phase}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold capitalize">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}