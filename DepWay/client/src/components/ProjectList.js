"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProjectCard from "./ProjectCard";
import DockerizationProcess from "./DockerizationProcess";

const ProjectList = ({ githubToken, onProjectDockerized }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDockerization, setShowDockerization] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");

  const fetchRepos = async () => {
    if (!githubToken) {
      toast.error("Please enter a GitHub Token first");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("/api/repos", {
        headers: { token: githubToken },
      });
      setRepos(response.data);
      toast.success(`Successfully fetched ${response.data.length} projects`);
    } catch (error) {
      toast.error("Failed to fetch projects: " + error.response?.data?.error);
    }
    setLoading(false);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleDockerize = (project) => {
    setSelectedProject(project);
    setShowDockerization(true);
  };

  const handleDockerizationComplete = (result) => {
    setShowDockerization(false);
    setSelectedProject(null);
    onProjectDockerized(result);
  };

  const handleDockerizationCancel = () => {
    setShowDockerization(false);
    setSelectedProject(null);
  };

  const filterRepos = (searchTerm) => {
    return repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (repo.language &&
          repo.language.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const filteredRepos = filterRepos(searchTerm).filter(
    (repo) => languageFilter === "all" || repo.language === languageFilter
  );

  const languages = [
    ...new Set(repos.map((repo) => repo.language).filter(Boolean)),
  ];

  const FolderIcon = () => (
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
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
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

  const SearchIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        position: "absolute",
        left: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#64748b",
      }}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

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
            <FolderIcon />
          </div>
          <h2 style={{ margin: 0 }}>GitHub Projects ({repos.length})</h2>
        </div>
        <button className="btn" onClick={fetchRepos} disabled={loading}>
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
              Loading...
            </>
          ) : (
            <>
              <RefreshIcon />
              Refresh Projects
            </>
          )}
        </button>
      </div>

      {repos.length > 0 && (
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              gap: "14px",
              marginBottom: "18px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 18px 14px 46px",
                  background: "#0d1321",
                  border: "1px solid #2d3748",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                  fontSize: "14px",
                }}
              />
            </div>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              style={{
                minWidth: "160px",
                padding: "14px 18px",
                background: "#0d1321",
                border: "1px solid #2d3748",
                borderRadius: "10px",
                color: "#e2e8f0",
                fontSize: "14px",
              }}
            >
              <option value="all">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <span
              style={{
                background: "#2d3748",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#e2e8f0",
                fontWeight: "500",
              }}
            >
              Showing {filteredRepos.length} of {repos.length} projects
            </span>
            {searchTerm && (
              <span
                style={{
                  background: "rgba(59, 130, 246, 0.12)",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#3b82f6",
                  fontWeight: "500",
                }}
              >
                Search: "{searchTerm}"
              </span>
            )}
            {languageFilter !== "all" && (
              <span
                style={{
                  background: "rgba(16, 185, 129, 0.12)",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#10b981",
                  fontWeight: "500",
                }}
              >
                Language: {languageFilter}
              </span>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "3px solid #2d3748",
              borderTop: "3px solid #3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 24px",
            }}
          />
          Fetching projects from GitHub...
        </div>
      ) : filteredRepos.length > 0 ? (
        <div className="grid">
          {filteredRepos.map((repo) => (
            <ProjectCard
              key={repo.id}
              project={repo}
              onSelect={handleProjectSelect}
              onDockerize={handleDockerize}
            />
          ))}
        </div>
      ) : repos.length > 0 ? (
        <div style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
          <h3 style={{ color: "#e2e8f0", marginBottom: "8px" }}>
            No projects found
          </h3>
          <p>Try changing your search criteria</p>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
          <h3 style={{ color: "#e2e8f0", marginBottom: "8px" }}>
            No projects yet
          </h3>
          <p>Click "Refresh Projects" to fetch your projects from GitHub</p>
        </div>
      )}

      {showDockerization && selectedProject && (
        <DockerizationProcess
          project={selectedProject}
          onComplete={handleDockerizationComplete}
          onCancel={handleDockerizationCancel}
        />
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

export default ProjectList;
