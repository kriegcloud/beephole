"use client";
import * as DateTime from "effect/DateTime";
import * as F from "effect/Function";
import * as React from "react";
const ColorSchemeContext = React.createContext<{
  colorScheme: string;
  setColorScheme: React.Dispatch<React.SetStateAction<string>>;
}>({
  colorScheme: "dark",
  setColorScheme: () => "",
});

function setCookie(name: string, value: string, days = 100) {
  let expires = "";
  if (days) {
    // Use DateTime module to handle date calculations
    const currentDate = DateTime.unsafeNow();
    const expiryDate = F.pipe(
      currentDate,
      (date) => DateTime.add(date, { days }),
      // Use toDate to get a JavaScript Date object
      (date) => DateTime.toDateUtc(date),
      // Use the standard Date toUTCString for cookie format
      (date) => date.toUTCString(),
    );
    expires = `; expires=${expiryDate}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

export function ColorSchemeProvider({
  colorScheme: initialColorScheme,
  children,
}: React.PropsWithChildren<{ colorScheme: string }>) {
  const [colorScheme, setColorScheme] =
    React.useState<string>(initialColorScheme);

  const contextValue = React.useMemo(
    () => ({ colorScheme, setColorScheme }),
    [colorScheme, setColorScheme],
  );

  // Set the colorScheme in localStorage
  React.useEffect(() => {
    setCookie("colorScheme", colorScheme);
    localStorage.setItem("colorScheme", colorScheme);
  }, [colorScheme]);

  // Handle when localStorage has changed
  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      const value = event.newValue;
      if (
        typeof event.key === "string" &&
        event.key === "colorScheme" &&
        typeof value === "string"
      ) {
        setColorScheme(value);
      }
    };
    // For syncing color-scheme changes between iframes
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [setColorScheme]);

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export const useColorScheme = () => {
  return React.useContext(ColorSchemeContext);
};
