const Footer = () => {
  const CheckIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginRight: "8px", color: "#3b82f6" }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <footer
      style={{
        background: "#111827",
        padding: "48px 0 32px",
        marginTop: "64px",
        borderTop: "1px solid #2d3748",
      }}
    >
      <div className="container">
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h3
            style={{
              marginBottom: "12px",
              fontSize: "24px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Dockerize
          </h3>
          <p style={{ color: "#94a3b8", maxWidth: "400px", margin: "0 auto" }}>
            A complete platform for converting GitHub projects into Docker
            containers
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "80px",
            flexWrap: "wrap",
            marginBottom: "40px",
            textAlign: "left",
          }}
        >
          <div>
            <h4
              style={{
                marginBottom: "16px",
                color: "#f1f5f9",
                fontSize: "15px",
                fontWeight: "600",
                letterSpacing: "0.02em",
              }}
            >
              Features
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                color: "#94a3b8",
                fontSize: "14px",
                lineHeight: "2.2",
              }}
            >
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                GitHub Integration
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                Docker Hub Upload
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                Port Management
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                Auto Deployment
              </li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                marginBottom: "16px",
                color: "#f1f5f9",
                fontSize: "15px",
                fontWeight: "600",
                letterSpacing: "0.02em",
              }}
            >
              Supported Languages
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                color: "#94a3b8",
                fontSize: "14px",
                lineHeight: "2.2",
              }}
            >
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                JavaScript / Node.js
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                Python
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                Java
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                Ruby / PHP
              </li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                marginBottom: "16px",
                color: "#f1f5f9",
                fontSize: "15px",
                fontWeight: "600",
                letterSpacing: "0.02em",
              }}
            >
              Technologies
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                color: "#94a3b8",
                fontSize: "14px",
                lineHeight: "2.2",
              }}
            >
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                React.js
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                Node.js
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                Docker
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <CheckIcon />
                GitHub API
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #2d3748",
            paddingTop: "24px",
            color: "#64748b",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <p>2025 Dockerize. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
