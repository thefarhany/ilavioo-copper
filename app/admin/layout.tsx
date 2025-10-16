"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Redirect to login if not authenticated and not on login page
    if (status === "unauthenticated" && !isLoginPage) {
      router.push("/admin/login");
    }

    // Redirect to dashboard if authenticated and on login page
    if (status === "authenticated" && isLoginPage) {
      router.push("/admin/dashboard");
    }
  }, [status, router, isLoginPage]);

  // Show loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-copper-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If on login page, render without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not authenticated, don't render anything (will redirect)
  if (!session) {
    return null;
  }

  // Render admin layout with sidebar and footer
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-64 min-h-screen flex flex-col">
        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-8">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <p>
              © {new Date().getFullYear()} Ilavio Copper Crafts. All rights
              reserved.
            </p>
            <p>Admin Dashboard v1.0</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
