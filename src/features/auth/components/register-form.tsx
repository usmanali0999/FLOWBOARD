"use client";

import { useState } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      toast.error(data.message ?? "Unable to create account");
      return;
    }

    const loginResult = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (loginResult?.error) {
      toast.success("Account created. Please sign in.");
      return;
    }

    toast.success("Account created successfully");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl capitalize">create account</CardTitle>
        <CardDescription>
          Start with a secure account and protected dashboard access.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium capitalize">name</label>
            <Input
              type="text"
              placeholder="Usman Ali"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium capitalize">email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium capitalize">password</label>
            <Input
              type="password"
              placeholder="minimum 6 characters"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                creating account...
              </>
            ) : (
              <>
                <UserPlus />
                create account
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}