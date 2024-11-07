import React from "react";

// useDarkMode.js
import { useState, useEffect } from "react";

const useDarkMode = () => {
  // Set initial mode based on localStorage or use 'light' by default
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode ? savedMode : "light"; // Default to light mode
  });

  useEffect(() => {
    // Apply the mode to the body element
    document.body.className = mode;
    // Store the selected mode in localStorage so it persists
    localStorage.setItem("mode", mode);
  }, [mode]);

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return [mode, toggleColorMode];
};

export default useDarkMode;
