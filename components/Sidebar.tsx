"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const adminMenu = [
  { name: "Dashboard", href: "/" },
  { name: "Students", href: "/students" },
  { name: "Add Student", href: "/add-student" },
  { name: "Payments", href: "/payments" },
  { name: "Attendance", href: "/attendance" },
  { name: "Grades", href: "/grades" },
  { name: "Settings", href: "/settings" },
];

const parentMenu = [{ name: "Parent Panel", href: "/parent" }];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "parent">("admin");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole === "parent") {
      setRole("parent");
    } else {
      setRole("admin");
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    router.replace("/login");
  };

  const menuItems = role === "parent" ? parentMenu : adminMenu;

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 p-6 text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edu Monitor</h1>
        <p className="mt-1 text-sm text-slate-300">
          {role === "parent" ? "Parent Panel" : "Admin Panel"}
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 transition ${
                isActive
                  ? "bg-white font-semibold text-slate-900"
                  : "text-white hover:bg-slate-800"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full rounded-2xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}