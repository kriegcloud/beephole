"use client";
import { Roboto } from "next/font/google";
import * as React from "react";
import { useColorScheme } from "./ColorSchemeProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export function App({
  className,
  ...other
}: React.PropsWithChildren<{ className?: string }>) {
  const { colorScheme } = useColorScheme();
  return <body {...other} className={`${roboto.variable} ${colorScheme}`} />;
}
