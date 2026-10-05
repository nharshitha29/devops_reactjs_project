import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  const checkBackend = async () => {
    setLoading(true);

    try {
      const messageResponse = await fetch("/api/message"
      );

      const messageData = await messageResponse.json();
      setMessage(messageData.message);

      const healthResponse = await fetch(
       "/health"
      );

      const healthData = await healthResponse.json();

      setHealth(healthData);
      setLastChecked(new Date());
    } catch (error) {
      setMessage("Backend unavailable");

      setHealth({
        status: "unhealthy",
        database: "disconnected",
      });

      setLastChecked(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  const isHealthy = health?.status === "healthy";

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="brand">

          {/* DevOps Logo */}
          <div className="logo">
            <svg
              viewBox="0 0 100 100"
              width="52"
              height="52"
              fill="none"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="6"
              />

              <path
                d="M25 50h18l7-15 10 30 7-15h8"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <h1>DevOps Dashboard</h1>
            <p>React • Node.js • PostgreSQL</p>
          </div>
        </div>

        <div className="environment">
          <span className="environment-dot"></span>
          LOCAL ENVIRONMENT
        </div>
      </header>

      {/* Main Content */}
      <main className="container">

        {/* Hero */}
        <section className="hero">
          <div>
            <p className="eyebrow">DEVOPS INTERVIEW PROJECT</p>

            <h2>
              Full Stack Application
              <span> Health Monitor</span>
            </h2>

            <p className="hero-text">
              A simple application demonstrating communication between
              React, Node.js, and PostgreSQL.
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={checkBackend}
            disabled={loading}
          >
            {loading ? "Checking..." : "↻ Refresh Status"}
          </button>
        </section>

        {/* Status Cards */}
        <section className="cards">

          {/* Frontend */}
          <div className="card">
            <div className="card-icon frontend-icon">
              ⚛
            </div>

            <div className="card-content">
              <p className="card-label">FRONTEND</p>
              <h3>React</h3>

              <div className="status">
                <span className="status-dot healthy"></span>
                Running
              </div>
            </div>
          </div>

          {/* Backend */}
          <div className="card">
            <div className="card-icon backend-icon">
              🚀
            </div>

            <div className="card-content">
              <p className="card-label">BACKEND</p>
              <h3>Node.js</h3>

              <div className="status">
                <span
                  className={`status-dot ${
                    isHealthy ? "healthy" : "unhealthy"
                  }`}
                ></span>

                {isHealthy ? "Healthy" : "Unavailable"}
              </div>
            </div>
          </div>

          {/* Database */}
          <div className="card">
            <div className="card-icon database-icon">
              🗄️
            </div>

            <div className="card-content">
              <p className="card-label">DATABASE</p>
              <h3>PostgreSQL</h3>

              <div className="status">
                <span
                  className={`status-dot ${
                    health?.database === "connected"
                      ? "healthy"
                      : "unhealthy"
                  }`}
                ></span>

                {health?.database === "connected"
                  ? "Connected"
                  : "Disconnected"}
              </div>
            </div>
          </div>

        </section>

        {/* Health Monitor */}
        <section className="health-section">

          <div className="section-header">
            <div>
              <p className="card-label">SYSTEM MONITOR</p>
              <h2>Application Health</h2>
            </div>

            {isHealthy && (
              <div className="overall-status">
                <span className="pulse"></span>
                All Systems Operational
              </div>
            )}
          </div>

          <div className="health-grid">

            <div className="health-item">
              <span>API Status</span>

              <strong>
                {isHealthy ? "200 OK" : "Unavailable"}
              </strong>
            </div>

            <div className="health-item">
              <span>Database</span>

              <strong>
                {health?.database || "Checking..."}
              </strong>
            </div>

            <div className="health-item">
              <span>Endpoint</span>

              <strong>/health</strong>
            </div>

            <div className="health-item">
              <span>Environment</span>

              <strong>Development</strong>
            </div>

          </div>
        </section>

        {/* API Response */}
        <section className="api-section">

          <div className="section-header">
            <div>
              <p className="card-label">API RESPONSE</p>
              <h2>Backend Message</h2>
            </div>

            <span className="method">GET</span>
          </div>

          <div className="terminal">

            <div className="terminal-header">
              <div className="terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span>localhost:5000</span>
            </div>

            <div className="terminal-body">
              <p>
                <span className="terminal-command">
                  GET /api/message
                </span>
              </p>

              <p className="terminal-response">
                {loading
                  ? "Checking backend..."
                  : message}
              </p>
            </div>

          </div>
        </section>

        {/* Architecture */}
        <section className="architecture">

          <div className="section-header">
            <div>
              <p className="card-label">ARCHITECTURE</p>
              <h2>Application Flow</h2>
            </div>
          </div>

          <div className="flow">

            <div className="flow-item">
              <div className="flow-icon">⚛</div>
              <strong>React</strong>
              <small>Frontend</small>
            </div>

            <div className="arrow">→</div>

            <div className="flow-item">
              <div className="flow-icon">🚀</div>
              <strong>Node.js</strong>
              <small>REST API</small>
            </div>

            <div className="arrow">→</div>

            <div className="flow-item">
              <div className="flow-icon">🗄️</div>
              <strong>PostgreSQL</strong>
              <small>Database</small>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer>
          <p>
            Built for DevOps Interview Demonstration
          </p>

          {lastChecked && (
            <p>
              Last checked:{" "}
              {lastChecked.toLocaleTimeString()}
            </p>
          )}
        </footer>

      </main>
    </div>
  );
}

export default App;
