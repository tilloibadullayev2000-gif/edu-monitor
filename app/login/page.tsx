"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [savedAdminLogin, setSavedAdminLogin] = useState("admin");
  const [savedAdminPassword, setSavedAdminPassword] = useState("12345");

  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");
    const adminPassword = localStorage.getItem("adminPassword");

    if (adminLogin) setSavedAdminLogin(adminLogin);
    if (adminPassword) setSavedAdminPassword(adminPassword);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (role === "admin") {
      if (username === savedAdminLogin && password === savedAdminPassword) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");
        router.replace("/");
        return;
      }

      setMessage("Admin login yoki parol noto‘g‘ri");
      return;
    }

    if (role === "parent") {
      if (username === "shaxlo" && password === "2002") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "parent");
        router.replace("/parent");
        return;
      }

      setMessage("Parent login yoki parol noto‘g‘ri");
      return;
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-black">Tizimga kirish</h1>
        <p className="mt-2 text-slate-600">Admin va Parent uchun login</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          >
            <option value="admin">Admin</option>
            <option value="parent">Parent</option>
          </select>

          <input
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          />

          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-black"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Kirish
          </button>
        </form>

        {message && (
          <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-slate-800">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}