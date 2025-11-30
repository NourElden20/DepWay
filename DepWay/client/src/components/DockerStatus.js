"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const DockerStatus = () => {
  const [containers, setContainers] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContainers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/containers");
      setContainers(response.data);
    } catch (error) {
      console.error("Error fetching containers:", error);
    }
    setLoading(false);
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  const startContainer = async (containerId) => {
    try {
      await axios.post(`/api/containers/${containerId}/start`);
      fetchContainers();
    } catch (error) {
      console.error("Error starting container:", error);
    }
  };

  const stopContainer = async (containerId) => {
    try {
      await axios.post(`/api/containers/${containerId}/stop`);
      fetchContainers();
    } catch (error) {
      console.error("Error stopping container:", error);
    }
  };

  useEffect(() => {
    fetchContainers();
    fetchImages();
  }, []);

  const DockerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V6.29a.186.186 0 00-.185-.185H8.1a.186.186 0 00-.185.185v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V6.29a.186.186 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.185zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.082.185.185.185zM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
    </svg>
  );

  const RefreshIcon = () => (
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
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );

  const PlayIcon = () => (
    <svg
      width="14"
      height="14"
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

  const StopIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    </svg>
  );

  return (
    <div className="card">
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
        <h2 style={{ margin: 0 }}>Docker Status</h2>
      </div>

      <div
        style={{
          marginBottom: "28px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button className="btn" onClick={fetchContainers} disabled={loading}>
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
              Updating...
            </>
          ) : (
            <>
              <RefreshIcon />
              Refresh Containers
            </>
          )}
        </button>
        <button
          className="btn btn-secondary"
          onClick={fetchImages}
          disabled={loading}
        >
          <RefreshIcon />
          Refresh Images
        </button>
      </div>

      <div style={{ marginBottom: "36px" }}>
        <h3
          style={{
            color: "#f1f5f9",
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Active Containers ({containers.length})
        </h3>
        {containers.length > 0 ? (
          <div className="grid">
            {containers.map((container) => (
              <div key={container.Id} className="repo-card">
                <h4>
                  {container.Names
                    ? container.Names[0].substring(1)
                    : "Unnamed"}
                </h4>
                <p>
                  <strong>Image:</strong> {container.Image}
                </p>
                <p>
                  <strong>Status:</strong> {container.State}
                </p>
                <p>
                  <strong>Ports:</strong>{" "}
                  {container.Ports
                    ? container.Ports.map((p) => p.PublicPort).join(", ")
                    : "Not specified"}
                </p>

                <div className="docker-status">
                  <div
                    className={`status-indicator ${
                      container.State === "running" ? "" : "stopped"
                    }`}
                  ></div>
                  <span
                    style={{
                      color:
                        container.State === "running" ? "#10b981" : "#ef4444",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {container.State === "running" ? "Running" : "Stopped"}
                  </span>
                </div>

                <div style={{ marginTop: "16px" }}>
                  {container.State === "running" ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => stopContainer(container.Id)}
                      style={{ padding: "10px 18px", fontSize: "13px" }}
                    >
                      <StopIcon />
                      Stop
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => startContainer(container.Id)}
                      style={{ padding: "10px 18px", fontSize: "13px" }}
                    >
                      <PlayIcon />
                      Start
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#94a3b8" }}>No active containers</p>
        )}
      </div>

      <div>
        <h3
          style={{
            color: "#f1f5f9",
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Docker Images ({images.length})
        </h3>
        {images.length > 0 ? (
          <div className="grid">
            {images.map((image, index) => (
              <div key={index} className="repo-card">
                <h4>{image.RepoTags ? image.RepoTags[0] : "Untagged"}</h4>
                <p>
                  <strong>Size:</strong> {(image.Size / 1024 / 1024).toFixed(2)}{" "}
                  MB
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(image.Created * 1000).toLocaleDateString("en-US")}
                </p>
                <p>
                  <strong>ID:</strong> {image.Id.substring(0, 12)}...
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#94a3b8" }}>No Docker images</p>
        )}
      </div>
    </div>
  );
};

export default DockerStatus;
