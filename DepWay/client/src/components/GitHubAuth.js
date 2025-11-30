"use client";

import { useState } from "react";
import axios from "axios";

const GitHubAuth = ({ onTokenReceived }) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      onTokenReceived(token, response.data);
    } catch (error) {
      alert("Invalid token. Please check and try again.");
    }

    setLoading(false);
  };

  const LockIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
        <div style={{ color: "#3b82f6", display: "flex" }}>
          <LockIcon />
        </div>
        <h2 style={{ margin: 0 }}>Sign in with GitHub</h2>
      </div>
      <p style={{ color: "#94a3b8", marginBottom: "24px", marginLeft: "38px" }}>
        You need a GitHub Personal Access Token to access your projects
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>GitHub Personal Access Token</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            required
          />
          <small style={{ marginTop: "10px", display: "block" }}>
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              Create a new token
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "6px", verticalAlign: "middle" }}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </small>
        </div>

        <button
          type="submit"
          className="btn"
          disabled={loading}
          style={{ marginTop: "12px" }}
        >
          {loading ? (
            <>
              <span
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  display: "inline-block",
                }}
              />
              Verifying...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default GitHubAuth;
