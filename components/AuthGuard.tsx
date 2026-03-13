"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    if (pathname === "/login") {
      setChecked(true);
      return;
    }

    if (isLoggedIn !== "true") {
      router.replace("/login");
      return;
    }

    if (userRole === "parent") {
      if (pathname !== "/parent") {
        router.replace("/parent");
        return;
      }
    }

    if (userRole === "admin") {
      if (pathname === "/parent") {
        router.replace("/");
        return;
      }
    }

    setChecked(true);
  }, [pathname, router]);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-black">Yuklanmoqda...</p>
      </div>
    );
  }

  return <>{children}</>;
}