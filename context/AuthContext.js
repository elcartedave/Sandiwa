"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firestore";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken(); // Get Firebase ID token
        await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }); // Store session in cookies
      } else {
        setUser(null);
        await fetch("/api/session", { method: "DELETE" }); // Clear session cookie on logout
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: "Successful Log In!" };
    } catch (error) {
      if (
        error.code == "auth/invalid-email" ||
        error.code == "auth/invalid-credential"
      ) {
        return { success: false, message: "Invalid credentials!" };
      }
      return { success: false, message: "Error" };
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{ user, signIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
