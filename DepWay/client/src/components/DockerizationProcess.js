"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DockerizationProcess = ({ project, onComplete, onCancel }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const steps = [
    "Analyzing project...",
    "Creating Dockerfile...",
    "Building Docker image...",
    "Uploading to Docker Hub...",
    "Cleaning up temporary files...",
  ];

  const startDockerization = async () => {
    setLoading(true);

    try {
      for (let i = 0; i < steps.length; i++) {
        setStep(i);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const response = await axios.post("/api/dockerize", {
        repoUrl: project.clone_url,
        projectName: project.name,
        ports: [3000, 8000],
        dockerHubUsername: localStorage.getItem("dockerHubUsername"),
      });

      setResult(response.data);
      toast.success("Project successfully dockerized!");
      onComplete(response.data);
    } catch (error) {
      toast.error(
        "Failed to dockerize project: " + error.response?.data?.error
      );
      onCancel();
    }

    setLoading(false);
  };

  const DockerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V6.29a.186.186 0 00-.185-.185H8.1a.186.186 0 00-.185.185v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V6.29a.186.186 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.185zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.082.185.185.185zM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  const ExternalLinkIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );

  const PlayIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );

  return (
    <div className="card" style={{ marginTop: "24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        <div style={{ color: "#06b6d4", display: "flex" }}>
          <DockerIcon />
        </div>
        <h2 style={{ margin: 0 }}>Dockerizing: {project.name}</h2>
      </div>

      {!loading && !result && (
        <div>
          <div style={{ marginBottom: "28px" }}>
            <h3
              style={{
                color: "#f1f5f9",
                marginBottom: "18px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Project Details
            </h3>
            <div
              style={{
                background: "#0d1321",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #2d3748",
              }}
            >
              <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
                <strong style={{ color: "#f1f5f9" }}>Name:</strong>{" "}
                {project.name}
              </p>
              <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
                <strong style={{ color: "#f1f5f9" }}>Language:</strong>{" "}
                {project.language || "Unknown"}
              </p>
              <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
                <strong style={{ color: "#f1f5f9" }}>Description:</strong>{" "}
                {project.description || "No description"}
              </p>
              <p style={{ color: "#94a3b8" }}>
                <strong style={{ color: "#f1f5f9" }}>Last updated:</strong>{" "}
                {new Date(project.updated_at).toLocaleDateString("en-US")}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <h3
              style={{
                color: "#f1f5f9",
                marginBottom: "18px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Process Steps
            </h3>
            <ol
              style={{
                paddingLeft: "20px",
                color: "#94a3b8",
                lineHeight: "2.2",
              }}
            >
              <li>Analyze project structure</li>
              <li>Generate appropriate Dockerfile</li>
              <li>Build Docker image</li>
              <li>Upload image to Docker Hub</li>
              <li>Clean up temporary files</li>
            </ol>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn btn-success" onClick={startDockerization}>
              <PlayIcon />
              Start Dockerization
            </button>
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: "center", padding: "48px" }}>
          <div style={{ marginBottom: "28px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                border: "4px solid #2d3748",
                borderTop: "4px solid #3b82f6",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto",
              }}
            />
          </div>
          <h3
            style={{ color: "#f1f5f9", marginBottom: "20px", fontSize: "18px" }}
          >
            {steps[step]}
          </h3>
          <div style={{ marginTop: "24px" }}>
            <div
              style={{
                width: "100%",
                height: "10px",
                backgroundColor: "#2d3748",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((step + 1) / steps.length) * 100}%`,
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <p
              style={{ marginTop: "14px", color: "#94a3b8", fontSize: "14px" }}
            >
              Step {step + 1} of {steps.length}
            </p>
          </div>
        </div>
      )}

      {result && (
        <div style={{ textAlign: "center", padding: "28px" }}>
          <div
            style={{
              marginBottom: "24px",
              color: "#10b981",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CheckCircleIcon />
          </div>
          <h3
            style={{
              color: "#10b981",
              marginBottom: "24px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Successfully Dockerized!
          </h3>

          <div
            style={{
              background: "#0d1321",
              padding: "24px",
              borderRadius: "12px",
              marginBottom: "28px",
              textAlign: "left",
              border: "1px solid #2d3748",
            }}
          >
            <h4
              style={{
                color: "#f1f5f9",
                marginBottom: "16px",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              Result Details
            </h4>
            <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
              <strong style={{ color: "#f1f5f9" }}>Image name:</strong>{" "}
              {result.imageName}
            </p>
            <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
              <strong style={{ color: "#f1f5f9" }}>Ports:</strong>{" "}
              {result.ports?.join(", ") || "Not specified"}
            </p>
            <p style={{ color: "#94a3b8" }}>
              <strong style={{ color: "#f1f5f9" }}>Upload status:</strong>{" "}
              Uploaded to Docker Hub
            </p>
          </div>

          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center" }}
          >
            <button
              className="btn btn-success"
              onClick={() =>
                window.open(
                  `https://hub.docker.com/r/${result.imageName}`,
                  "_blank"
                )
              }
            >
              <ExternalLinkIcon />
              View on Docker Hub
            </button>
            <button className="btn" onClick={() => onComplete(result)}>
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default DockerizationProcess;
