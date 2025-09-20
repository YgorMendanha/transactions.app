"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Page,
  Card,
  Brand,
  Subtitle,
  Form,
  Label,
  Row,
  Remember,
  ErrorText,
} from "./styled";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthValidation } from "@/utils/auth";

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "ym@email.com",
    password: "123456",
    remember: true,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialValues,
  });

  const authToken = Cookies.get("token");
  useEffect(() => {
    const auth = AuthValidation(authToken);
    if (auth) {
      router.push("/dashboard");
    }
  }, [authToken]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (response.error) {
        toast.error(response.error);
      } else if (response.token) {
        Cookies.set("token", response.token);
        router.push("/dashboard");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card aria-live="polite">
        <Brand>MyApp</Brand>
        <Subtitle>Sign in to your account to continue</Subtitle>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <Label htmlFor="email">Email or Username</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@example.com"
              autoComplete="username"
              aria-invalid={!!errors.email}
              {...register("email", {
                required: "Please enter your email or username",
              })}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </div>

          <Row>
            <Remember>
              <input id="remember" type="checkbox" {...register("remember")} />
              <label htmlFor="remember">Keep me signed in</label>
            </Remember>

            <a
              href="#"
              onClick={(ev) => ev.preventDefault()}
              style={{ fontSize: 13 }}
            >
              Forgot your password?
            </a>
          </Row>

          <Button type="submit" $variant="secondary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </Form>
      </Card>
    </Page>
  );
}
