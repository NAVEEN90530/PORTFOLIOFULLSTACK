import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#0A0A0A",
        color: "#EDEDED",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          fontWeight: "900",
          color: "#FFD700",
          textShadow: "0 0 20px rgba(255,215,0,0.5)",
          marginBottom: "10px",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        404
      </h1>

      <h2 style={{ marginBottom: "10px" }}>Page Not Found</h2>
      <p style={{ opacity: 0.7, marginBottom: "20px" }}>
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="btn"
        style={{
          backgroundColor: "#FFD700",
          color: "#0A0A0A",
          fontWeight: 600,
          padding: "10px 25px",
          borderRadius: "6px",
          transition: "0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.target.style.opacity = "1")}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
