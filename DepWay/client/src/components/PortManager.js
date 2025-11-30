"use client";

const PortManager = ({ ports, onPortsChange }) => {
  const addPort = () => {
    const newPort = Math.max(...ports, 3000) + 1;
    onPortsChange([...ports, newPort]);
  };

  const removePort = (index) => {
    if (ports.length > 1) {
      const newPorts = ports.filter((_, i) => i !== index);
      onPortsChange(newPorts);
    }
  };

  const updatePort = (index, value) => {
    const newPorts = [...ports];
    newPorts[index] = Number.parseInt(value) || 3000;
    onPortsChange(newPorts);
  };

  const SettingsIcon = () => (
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );

  const PlusIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const TrashIcon = () => (
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );

  const ArrowIcon = () => (
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
        <div style={{ color: "#f59e0b", display: "flex" }}>
          <SettingsIcon />
        </div>
        <h2 style={{ margin: 0 }}>Port Management</h2>
      </div>
      <p style={{ color: "#94a3b8", marginBottom: "24px", marginLeft: "38px" }}>
        Configure the ports you want to use for your project
      </p>

      <div className="port-config">
        {ports.map((port, index) => (
          <div key={index} className="port-item">
            <label>Port {index + 1}</label>
            <input
              type="number"
              value={port}
              onChange={(e) => updatePort(index, e.target.value)}
              min="1000"
              max="65535"
              placeholder="3000"
            />
            <span
              style={{
                color: "#64748b",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ArrowIcon />
              localhost:{port}
            </span>
            {ports.length > 1 && (
              <button
                className="btn btn-danger"
                onClick={() => removePort(index)}
                style={{
                  padding: "8px 14px",
                  fontSize: "13px",
                  marginLeft: "auto",
                }}
              >
                <TrashIcon />
                Remove
              </button>
            )}
          </div>
        ))}

        <div style={{ marginTop: "20px" }}>
          <button className="btn btn-secondary" onClick={addPort}>
            <PlusIcon />
            Add Port
          </button>
        </div>
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
            color: "#f59e0b",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          Port Reference
        </h4>
        <ul
          style={{
            margin: "0",
            paddingLeft: "20px",
            color: "#94a3b8",
            fontSize: "14px",
            lineHeight: "2.2",
          }}
        >
          <li>
            <strong style={{ color: "#e2e8f0" }}>3000:</strong> React, Next.js,
            Node.js
          </li>
          <li>
            <strong style={{ color: "#e2e8f0" }}>8000:</strong> Python Flask,
            Django
          </li>
          <li>
            <strong style={{ color: "#e2e8f0" }}>8080:</strong> Java Spring
            Boot, Vue.js
          </li>
          <li>
            <strong style={{ color: "#e2e8f0" }}>5000:</strong> Python Flask
            (default)
          </li>
          <li>
            <strong style={{ color: "#e2e8f0" }}>80/443:</strong> HTTP/HTTPS
            (production)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PortManager;
