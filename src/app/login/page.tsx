import { redirect } from "next/navigation";
import { Layers3, ShieldCheck, Zap } from "lucide-react";

import { auth } from "@/auth";
import { LoginForm } from "@/features/auth/components/login-form";
import { RegisterForm } from "@/features/auth/components/register-form";
import { Badge } from "@/components/ui/badge";

const highlights = [
  {
    title: "secure auth flow",
    description: "Credentials-based access with encrypted passwords.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "fast dashboard access",
    description: "Protected routes with server-side session checks.",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "scalable architecture",
    description: "Auth built to support teams, workspaces, and roles.",
    icon: <Layers3 className="h-5 w-5" />,
  },
];

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-10 md:px-6 lg:grid-cols-2 lg:items-center">
        <section>
          <Badge variant="secondary" className="rounded-full">
            auth phase
          </Badge>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            secure access for a real product workflow
          </h1>

          <p className="mt-4 max-w-xl text-muted-foreground">
            Flowboard authentication is connected to the database with
            protected dashboard access and scalable user sessions.
          </p>

          <div className="mt-8 space-y-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-background p-4"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="font-medium capitalize">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6">
          <LoginForm />
          <RegisterForm />
        </section>
      </div>
    </main>
  );
}