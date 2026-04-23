"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyTheme = (nextTheme: Theme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>("light");
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedTheme = window.localStorage.getItem("theme");
        const initialTheme: Theme = storedTheme === "dark" ? "dark" : "light";
        applyTheme(initialTheme);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(initialTheme);
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        applyTheme(theme);
        window.localStorage.setItem("theme", theme);
    }, [isReady, theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
