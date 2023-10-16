import { Html } from "@/components/app";
import { PomodoroProvider } from "@/components/pomodoro";
import { ThemeProvider } from "@/components/theme";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workstation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultTheme = cookies().get("theme")?.value;

  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <Html>
        <body className={inter.className}>
          <PomodoroProvider>{children}</PomodoroProvider>
        </body>
      </Html>
    </ThemeProvider>
  );
}
