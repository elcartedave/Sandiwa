"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  return (
    <div className=" flex ">
      <div className="p-3">
        {!user ? (
          <Link href={"/auth/login"} className="text-black font-bold">
            Log In
          </Link>
        ) : (
          <h2 className=" text-xl text-black">Hi!</h2>
        )}
      </div>
      {!user ? (
        <div className="p-3">
          <Link href={"/auth/signup"} className="text-black font-bold">
            Sign Up
          </Link>
        </div>
      ) : (
        <></>
      )}
      {user && (
        <div
          onClick={async () => {
            await logOut();
            router.push("/auth/login");
            // router.refresh();
          }}
          className="p-3 text-black font-bold"
        >
          <button className=" cursor-pointer">Sign Out</button>
        </div>
      )}
      {!user ? <></> : <Link href={"/users"}>See Users</Link>}
    </div>
  );
}
