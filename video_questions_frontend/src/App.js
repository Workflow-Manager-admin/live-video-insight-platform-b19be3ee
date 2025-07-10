import React, { useState, useEffect } from "react";
import "./App.css";
import LiveVideoPlayer from "./LiveVideoPlayer";

// PUBLIC_INTERFACE
function App() {
  /**
   * Main app component: dark themed background, centered video player and url input.
   */
  const [theme, setTheme] = useState("dark");
  const [inputUrl, setInputUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  // Effect to apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.backgroundColor = "#000"; // force black bg for this page
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  // PUBLIC_INTERFACE
  const handlePlay = (e) => {
    e.preventDefault();
    setCurrentUrl(inputUrl.trim());
  };

  return (
    <div className="App black-bg">
      <header className="App-header" style={{ background: "#000", minHeight: "100vh" }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <h1 className="title" style={{ color: "#fff", marginBottom: "2rem" }}>
          Live Video Stream Player
        </h1>
        <form className="video-url-form" onSubmit={handlePlay}>
          <input
            type="url"
            className="video-url-input"
            value={inputUrl}
            onChange={handleInputChange}
            placeholder="Paste live stream URL (HLS, RTMP, HTTP...)" 
            autoFocus
            style={{
              padding: "12px 16px",
              borderRadius: "8px 0 0 8px",
              border: "none",
              minWidth: "260px",
              fontSize: "1rem",
              outline: "none",
            }}
            required
          />
          <button
            type="submit"
            className="btn-play"
            style={{
              padding: "12px 24px",
              background: "var(--button-bg)",
              color: "var(--button-text)",
              border: "none",
              borderRadius: "0 8px 8px 0",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              transition: "background 0.3s",
            }}
          >
            ▶ Play
          </button>
        </form>
        <LiveVideoPlayer url={currentUrl} />
      </header>
    </div>
  );
}

export default App;
