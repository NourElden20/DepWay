"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const Stats = () => {
  const [stats, setStats] = useState({
    totalRepos: 0,
    totalImages: 0,
    runningContainers: 0,
    totalContainers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [imagesRes, containersRes] = await Promise.all([
        axios.get("/api/images").catch(() => ({ data: [] })),
        axios.get("/api/containers").catch(() => ({ data: [] })),
      ]);

      const images = imagesRes.data || [];
      const containers = containersRes.data || [];

      setStats({
        totalRepos: 0,
        totalImages: images.length,
        runningContainers: containers.filter((c) => c.State === "running")
          .length,
        totalContainers: containers.length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
    setLoading(false);
  };

  const FolderIcon = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );

  const DockerIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V6.29a.186.186 0 00-.185-.185H8.1a.186.186 0 00-.185.185v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V6.29a.186.186 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.185zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.082.185.185.185zM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg
      width="32"
      height="32"
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

  const BoxIcon = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );

  const ChartIcon = () => (
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
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
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

  const TargetIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );

  const statCards = [
    {
      title: "GitHub Projects",
      value: stats.totalRepos,
      icon: <FolderIcon />,
      color: "#3b82f6",
    },
    {
      title: "Docker Images",
      value: stats.totalImages,
      icon: <DockerIcon />,
      color: "#10b981",
    },
    {
      title: "Running Containers",
      value: stats.runningContainers,
      icon: <PlayIcon />,
      color: "#06b6d4",
    },
    {
      title: "Total Containers",
      value: stats.totalContainers,
      icon: <BoxIcon />,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ color: "#3b82f6", display: "flex" }}>
            <ChartIcon />
          </div>
          <h2 style={{ margin: 0 }}>Statistics</h2>
        </div>
        <button
          className="btn btn-secondary"
          onClick={fetchStats}
          disabled={loading}
          style={{ padding: "10px 18px", fontSize: "14px" }}
        >
          <RefreshIcon />
          Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "48px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "3px solid #2d3748",
              borderTop: "3px solid #3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          />
          <p style={{ marginTop: "20px", color: "#94a3b8" }}>
            Loading statistics...
          </p>
        </div>
      ) : (
        <div className="grid">
          {statCards.map((stat, index) => (
            <div
              key={index}
              style={{
                background: "#0d1321",
                padding: "32px",
                borderRadius: "14px",
                textAlign: "center",
                border: `1px solid ${stat.color}30`,
                transition: "all 0.25s ease",
              }}
            >
              <div
                style={{
                  marginBottom: "20px",
                  color: stat.color,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {stat.icon}
              </div>
              <h3
                style={{
                  fontSize: "3rem",
                  margin: "0 0 10px 0",
                  color: stat.color,
                  fontWeight: "700",
                }}
              >
                {stat.value}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "#94a3b8",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {stat.title}
              </p>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: "36px",
          padding: "28px",
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)",
          borderRadius: "14px",
          border: "1px solid rgba(59, 130, 246, 0.15)",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            marginBottom: "14px",
            color: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <TargetIcon />
          Our Mission
        </h3>
        <p
          style={{
            margin: 0,
            color: "#94a3b8",
            lineHeight: "1.7",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Simplify the process of converting projects to Docker containers and
          uploading them to Docker Hub for seamless deployment and distribution.
        </p>
      </div>

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

export default Stats;
