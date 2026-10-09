import { jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext(void 0);
function getInitialTheme() {
  try {
    return localStorage.getItem("ha_theme") === "light" ? "light" : "dark";
  } catch (error) {
    console.warn("Unable to read the saved appearance preference.", error);
    return "dark";
  }
}
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem("ha_theme", theme);
    } catch (error) {
      console.warn("Unable to save the appearance preference.", error);
    }
  }, [theme]);
  return /* @__PURE__ */ jsx(
    ThemeContext.Provider,
    {
      value: { theme, toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark") },
      children
    }
  );
};
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
export {
  ThemeProvider,
  useTheme
};
