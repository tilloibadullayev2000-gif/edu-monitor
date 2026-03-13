import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";

export const metadata = {
  title: "Edu Monitor",
  description: "Edu Monitor Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>
          <LayoutContent>{children}</LayoutContent>
        </AuthGuard>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SidebarWrapper />
      <main className="flex-1">{children}</main>
    </div>
  );
}

function SidebarWrapper() {
  if (typeof window !== "undefined" && window.location.pathname === "/login") {
    return null;
  }

  return <Sidebar />;
}