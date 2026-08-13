"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="rounded-xl"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      sign out
    </Button>
  );
}