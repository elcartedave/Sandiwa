"use client";
import NotFound from "@/app/not-found";
import LoadingPage from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Page() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingPage />;
  if (!user) return <NotFound />;
  return (
    <>
      <h1 className="text-black">Success Login!</h1>
      <Link href={`/`} className="text-blue-500 italic underline">
        Go Home
      </Link>
    </>
  );
}
