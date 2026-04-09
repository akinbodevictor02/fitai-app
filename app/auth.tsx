"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Card, Input, Button } from "@/components/ui";

export default function Auth() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ email, password })
    );

    router.push("/dashboard");
  };

  return (
    <Container>
      <Card>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Welcome back
        </h2>

        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <Button onClick={handleAuth}>
            Continue
          </Button>
        </div>

      </Card>
    </Container>
  );
}