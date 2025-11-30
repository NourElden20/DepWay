"use client";

import { useState } from "react";

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const KeyIcon = () => (
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
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );

  const DockerIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V6.29a.186.186 0 00-.185-.185H8.1a.186.186 0 00-.185.185v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V6.29a.186.186 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.185zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.082.185.185.185zM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
    </svg>
  );

  const SettingsIcon = () => (
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );

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

  const RocketIcon = () => (
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );

  const SlidersIcon = () => (
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
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );

  const BookIcon = () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );

  const LightbulbIcon = () => (
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
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
    </svg>
  );

  const ArrowLeftIcon = () => (
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
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );

  const ArrowRightIcon = () => (
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
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

  const steps = [
    {
      title: "Set Up GitHub Token",
      content:
        "Create a Personal Access Token from GitHub Settings > Developer settings > Personal access tokens",
      icon: <KeyIcon />,
      details: [
        "Go to GitHub Settings",
        "Select Developer settings",
        "Click on Personal access tokens",
        "Create a new token",
        "Select scopes: repo, user",
        "Copy the token",
      ],
    },
    {
      title: "Configure Docker Hub",
      content: "Sign up for Docker Hub and enter your username in the app",
      icon: <DockerIcon />,
      details: [
        "Go to hub.docker.com",
        "Create a new account or sign in",
        "Copy your username",
        "Make sure you're logged in via Docker CLI: docker login",
      ],
    },
    {
      title: "Configure Ports",
      content: "Specify the ports you want to use for your project",
      icon: <SettingsIcon />,
      details: [
        "3000: React, Next.js, Node.js",
        "8000: Python Flask, Django",
        "8080: Java Spring Boot, Vue.js",
        "5000: Python Flask (default)",
        "80: HTTP (production)",
        "443: HTTPS (production)",
      ],
    },
    {
      title: "Fetch Projects",
      content: 'Click "Refresh Projects" to view all your GitHub projects',
      icon: <FolderIcon />,
      details: [
        "Make sure you've entered your GitHub Token",
        'Click "Refresh Projects"',
        "Wait for projects to load",
        "You'll see a list of all your projects",
      ],
    },
    {
      title: "Dockerize Project",
      content: 'Select a project and click "Dockerize" to convert it to Docker',
      icon: <RocketIcon />,
      details: [
        "Select a project from the list",
        'Click "Dockerize"',
        "Wait for analysis to complete",
        "A Dockerfile will be created automatically",
        "The image will be built and uploaded to Docker Hub",
      ],
    },
    {
      title: "Manage Containers",
      content: "You can start and stop containers from the control panel",
      icon: <SlidersIcon />,
      details: [
        'Go to the "Docker" section',
        "View available images",
        "Start/stop containers",
        "Monitor container status",
      ],
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetTutorial = () => {
    setCurrentStep(0);
  };

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
            <BookIcon />
          </div>
          <h2 style={{ margin: 0 }}>User Guide</h2>
        </div>
        <button
          className="btn btn-secondary"
          onClick={resetTutorial}
          style={{ padding: "10px 18px", fontSize: "14px" }}
        >
          <RefreshIcon />
          Restart Guide
        </button>
      </div>

      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
          padding: "36px",
          borderRadius: "14px",
          marginBottom: "28px",
          textAlign: "center",
          border: "1px solid rgba(59, 130, 246, 0.15)",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            color: "#3b82f6",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {steps[currentStep].icon}
        </div>
        <h3
          style={{
            marginBottom: "14px",
            color: "#f1f5f9",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          {steps[currentStep].title}
        </h3>
        <p
          style={{ color: "#94a3b8", marginBottom: "28px", lineHeight: "1.6" }}
        >
          {steps[currentStep].content}
        </p>

        <div
          style={{
            background: "rgba(0, 0, 0, 0.25)",
            padding: "24px",
            borderRadius: "12px",
            textAlign: "left",
          }}
        >
          <h4
            style={{
              marginBottom: "18px",
              color: "#3b82f6",
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            Step-by-step instructions:
          </h4>
          <ol
            style={{
              margin: 0,
              paddingLeft: "20px",
              color: "#94a3b8",
              lineHeight: "2.2",
            }}
          >
            {steps[currentStep].details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ol>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "28px",
        }}
      >
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "none",
              background:
                index === currentStep
                  ? "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)"
                  : "#2d3748",
              cursor: "pointer",
              transition: "all 0.2s ease",
              transform: index === currentStep ? "scale(1.2)" : "scale(1)",
            }}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            className="btn btn-secondary"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeftIcon />
            Previous
          </button>
          <button
            className="btn"
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
          >
            Next
            <ArrowRightIcon />
          </button>
        </div>

        <div
          style={{
            background: "#2d3748",
            padding: "10px 18px",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#e2e8f0",
            fontWeight: "500",
          }}
        >
          {currentStep + 1} of {steps.length}
        </div>
      </div>

      <div
        style={{
          marginTop: "36px",
          padding: "24px",
          background: "#0d1321",
          borderRadius: "12px",
          border: "1px solid #2d3748",
        }}
      >
        <h4
          style={{
            marginBottom: "18px",
            color: "#f59e0b",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          <LightbulbIcon />
          Important Tips
        </h4>
        <ul
          style={{
            margin: 0,
            paddingLeft: "20px",
            color: "#94a3b8",
            lineHeight: "2.2",
          }}
        >
          <li>Make sure Docker is running on your machine</li>
          <li>Docker Hub login is required</li>
          <li>You can add/remove ports as needed</li>
          <li>Large projects may take longer to process</li>
          <li>Check container status regularly</li>
        </ul>
      </div>
    </div>
  );
};

export default Tutorial;
