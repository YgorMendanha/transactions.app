"use client";

import React, { useState, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import Cookies from "js-cookie";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { darkTheme, lightTheme } from "@/styles/theme";
import { Moon, Sun } from "lucide-react";
import { BtnChangeTheme } from "./style";
import { Toaster } from "react-hot-toast";

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme: "light" | "dark";
}

export const CustomThemeProvider = ({
  children,
  initialTheme,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    Cookies.set("theme", newTheme);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <BtnChangeTheme
        onClick={() =>
          theme === "light" ? toggleTheme("dark") : toggleTheme("light")
        }
      >
        {theme === "light" ? <Moon /> : <Sun color="#ffff" />}
      </BtnChangeTheme>
      {children}
      <Toaster position="bottom-center" />
    </ThemeProvider>
  );
};
