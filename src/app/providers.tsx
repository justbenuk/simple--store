"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "@/lib/theme-provider";
type ProviderProps = {
  children: ReactNode;
};
export default function Providers({ children }: ProviderProps) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}
