"use client";

import { useState } from "react";

const DockerHubConfig = ({ username, onUsernameChange }) => {
  const [isValid, setIsValid] = useState(true);

  const handleUsernameChange = (value) => {
    const valid = /^[a-z0-9_-]+$/.test(value) && value.length >= 3;
    setIsValid(valid);
    onUsernameChange(value);
  };

  const DockerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V6.29a.186.186 0 00-.185-.185H8.1a.186.186 0 00-.185.185v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V6.29a.186.186 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.185zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.082.185.185.185zM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "8px",
        }}
      >
        <div style={{ color: "#06b6d4", display: "flex" }}>
          <DockerIcon />
        </div>
        <h2 style={{ margin: 0 }}>Docker Hub Settings</h2>
      </div>
      <p style={{ color: "#94a3b8", marginBottom: "24px", marginLeft: "38px" }}>
        Enter your Docker Hub credentials to upload images
      </p>

      <div className="form-group">
        <label>Docker Hub Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          placeholder="your-dockerhub-username"
          style={{
            borderColor: isValid ? "#2d3748" : "#ef4444",
          }}
        />
        {!isValid && username && (
          <small
            style={{ color: "#ef4444", marginTop: "10px", display: "block" }}
          >
            Username must contain only lowercase letters, numbers, _ and -
          </small>
        )}
      </div>

      <div
        style={{
          marginTop: "28px",
          padding: "24px",
          background: "#0d1321",
          borderRadius: "12px",
          border: "1px solid #2d3748",
        }}
      >
        <h4
          style={{
            marginBottom: "16px",
            color: "#3b82f6",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          Docker Hub Setup Steps
        </h4>
        <ol
          style={{
            margin: "0",
            paddingLeft: "20px",
            color: "#94a3b8",
            fontSize: "14px",
            lineHeight: "2.2",
          }}
        >
          <li>
            Go to{" "}
            <a
              href="https://hub.docker.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3b82f6" }}
            >
              Docker Hub
            </a>
          </li>
          <li>Create a new account or sign in</li>
          <li>Go to Account Settings</li>
          <li>Copy your username</li>
          <li>
            Make sure you're logged in via Docker CLI:{" "}
            <code
              style={{
                background: "#2d3748",
                padding: "3px 8px",
                borderRadius: "6px",
                color: "#e2e8f0",
                fontSize: "13px",
              }}
            >
              docker login
            </code>
          </li>
        </ol>
      </div>

      {username && isValid && (
        <div
          style={{
            marginTop: "20px",
            padding: "14px 18px",
            background: "rgba(16, 185, 129, 0.08)",
            borderRadius: "10px",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ color: "#10b981", display: "flex" }}>
            <CheckIcon />
          </span>
          <span style={{ color: "#10b981", fontWeight: "600" }}>
            Images will be uploaded as:
          </span>
          <span style={{ color: "#e2e8f0" }}>{username}/project-name</span>
        </div>
      )}
    </div>
  );
};

export default DockerHubConfig;
