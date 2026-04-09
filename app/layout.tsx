import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitAI Dashboard",
  description: "Fitness plan generator app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        
        <div className="flex min-h-screen">

          {/* Main Content */}
          <main className="flex-1 px-4 md:px-8 py-6">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}