"use client";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/models/user";
import { Box, Button, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const upMail: RegExp = new RegExp(/^[a-zA-Z0-9._%+-]+@up\.edu\.ph$/);
  const router = useRouter();
  const handleSignup = async (email: string, password: string) => {
    const newUser: User = { email, password, id: 1 } as User;
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status != 200) {
        const data = await response.json();
        alert(data.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };
  const { user, loading } = useAuth();
  const route = useRouter();

  useEffect(() => {
    if (user) {
      route.replace("/");
    }
  }, [user, route]);

  if (loading) {
    return (
      <div>
        <h1 className="text-black">loading</h1>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <h1 className="text-black">loading</h1>
      </div>
    );
  }

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <h1 className="text-black">Sign Up</h1>
        <Button>
          <Link href={"/"}>Home</Link>
        </Button>
      </Stack>
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Box
          component={"form"}
          autoComplete="off"
          className="border-gray-400 border-2 pb-20 pt-20 pl-15 pr-15 rounded-[16px]"
        >
          <Stack direction={"column"} spacing={2}>
            <h1 className="text-black font-bold text-2xl text-center">
              Sign Up
            </h1>
            <TextField
              required
              label="Email"
              error={emailError}
              helperText={emailError ? "Please enter a valid UP mail" : ""}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!upMail.test(e.target.value) || !e.target.validity.valid) {
                  setEmailError(true);
                } else setEmailError(false);
              }}
            />
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              error={passwordError}
              helperText={
                passwordError ? "Passwords should be at least 6 characters" : ""
              }
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length < 6) {
                  setPasswordError(true);
                } else setPasswordError(false);
              }}
            />
            <TextField
              required
              label="Confirm Password"
              type="password"
              error={confirmPasswordError}
              helperText={confirmPasswordError ? "Passwords do not match!" : ""}
              onChange={(e) => {
                if (e.target.value !== password) {
                  setConfirmPasswordError(true);
                } else setConfirmPasswordError(false);
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                handleSignup(email, password);
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </div>
    </div>
  );
}
