import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Components
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import GitHubAuth from "./components/GitHubAuth";
import DockerHubConfig from "./components/DockerHubConfig";
import PortManager from "./components/PortManager";
import ProjectList from "./components/ProjectList";
import DockerStatus from "./components/DockerStatus";
import Stats from "./components/Stats";
import Tutorial from "./components/Tutorial";
import Footer from "./components/Footer";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [githubToken, setGithubToken] = useState("");
  const [dockerHubUsername, setDockerHubUsername] = useState("");
  const [ports, setPorts] = useState([3000]);
  const [user, setUser] = useState(null);

  // Load saved data from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("githubToken");
    const savedUsername = localStorage.getItem("dockerHubUsername");
    const savedUser = localStorage.getItem("githubUser");
    if (savedToken) setGithubToken(savedToken);
    if (savedUsername) setDockerHubUsername(savedUsername);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (githubToken) localStorage.setItem("githubToken", githubToken);
  }, [githubToken]);

  useEffect(() => {
    if (dockerHubUsername)
      localStorage.setItem("dockerHubUsername", dockerHubUsername);
  }, [dockerHubUsername]);

  useEffect(() => {
    if (user) localStorage.setItem("githubUser", JSON.stringify(user));
  }, [user]);

  const handleTokenReceived = (token, userData) => {
    setGithubToken(token);
    setUser(userData);
    // <CHANGE> English toast message
    toast.success(`Welcome, ${userData.name || userData.login}!`);
  };

  const handleProjectDockerized = (result) => {
    // <CHANGE> English toast message
    toast.success(`Successfully dockerized ${result.imageName}!`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <Header />
            {!githubToken && (
              <GitHubAuth onTokenReceived={handleTokenReceived} />
            )}
            {githubToken && (
              <DockerHubConfig
                username={dockerHubUsername}
                onUsernameChange={setDockerHubUsername}
              />
            )}
            {githubToken && (
              <PortManager ports={ports} onPortsChange={setPorts} />
            )}
            {user && (
              <div className="card">
                {/* <CHANGE> English welcome text */}
                <h2>Welcome, {user.name || user.login}!</h2>
                <p style={{ color: "#94a3b8", marginTop: "8px" }}>
                  You're logged in successfully. You can now browse your
                  projects and convert them to Docker.
                </p>
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                >
                  <button
                    className="btn"
                    onClick={() => setActiveTab("projects")}
                  >
                    View Projects
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setActiveTab("docker")}
                  >
                    Manage Docker
                  </button>
                </div>
              </div>
            )}
          </>
        );
      case "projects":
        return (
          <ProjectList
            githubToken={githubToken}
            onProjectDockerized={handleProjectDockerized}
          />
        );
      case "docker":
        return <DockerStatus />;
      case "stats":
        return <Stats />;
      case "tutorial":
        return <Tutorial />;
      default:
        return <Header />;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        // <CHANGE> Changed to LTR
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // <CHANGE> Dark theme for toasts
        theme="dark"
      />
    </div>
  );
}

export default App;
