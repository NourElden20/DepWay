"use client";

const ProjectCard = ({ project, onSelect, onDockerize }) => {
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "#f7df1e",
      TypeScript: "#3178c6",
      Python: "#3776ab",
      Java: "#f89820",
      Ruby: "#cc342d",
      PHP: "#777bb4",
      Go: "#00add8",
      Rust: "#dea584",
      "C++": "#00599c",
      "C#": "#239120",
    };
    return colors[language] || "#64748b";
  };

  const DockerIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V6.29a.186.186 0 00-.185-.185H8.1a.186.186 0 00-.185.185v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V6.29a.186.186 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.185zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .102.082.185.185.185zM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
    </svg>
  );

  return (
    <div className="repo-card" onClick={() => onSelect(project)}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <h3 style={{ wordBreak: "break-word" }}>{project.name}</h3>
        <div
          className="language"
          style={{
            backgroundColor: getLanguageColor(project.language),
            color: "white",
            flexShrink: 0,
          }}
        >
          {project.language || "Unknown"}
        </div>
      </div>

      <p
        style={{
          margin: "14px 0",
          color: "#94a3b8",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        {project.description || "No description available"}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "18px",
        }}
      >
        <small style={{ color: "#64748b", fontSize: "13px" }}>
          Updated: {new Date(project.updated_at).toLocaleDateString("en-US")}
        </small>

        <button
          className="btn btn-success"
          onClick={(e) => {
            e.stopPropagation();
            onDockerize(project);
          }}
          style={{ padding: "10px 18px", fontSize: "13px" }}
        >
          <DockerIcon />
          Dockerize
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
