import React, { useState } from "react";

export default function ProjectCard({ project, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="col-md-4 g-5">
      <div
        style={{
          cursor: "pointer",
          borderRadius: "15px",
          height: "300px",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#111111", 
          transition: "transform 0.3s ease, box-shadow 0.3s ease", 
          position: "relative",
          transform: isHovered ? "scale(1.03)" : "scale(1)", 
          boxShadow:"0 2px 10px #FFD700",
        }}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
      >
        {/* IMAGE */}
        <div
          className="project-img-wrapper"
          style={{
            height: "180px",
            width: "100%",
            overflow: "hidden",
            visibility: isHovered ? "hidden" : "visible", 
            transition: "visibility 0.3s ease",
          }}
        >
          <img
            src={project.imageUrl || "/placeholder.png"}
            alt={project.name || "Project Image"}
            className="w-100 h-100"
            style={{
              objectFit: "cover", 
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(1)" : "scale(1.1)", 
            }}
          />
        </div>

        {/* CONTENT */}
        <div
          className="p-3"
          style={{
            color: "#EDEDED",
            background: "rgba(0, 0, 0, 0.7)",
            opacity: 1, 
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "1rem",
            zIndex: 1, 
            height: isHovered ? "100%" : "120px", 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transition: "height 0.3s ease, justify-content 0.3s ease",
          }}
        >
          {/* Title */}
          <h5
            className="project-title text-center"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              visibility: "visible",
            }}
          >
            {project.name || "Untitled Project"}
          </h5>

          {/* DOMAIN AND CATEGORY */}
          <div
            className="project-meta mb-2"
            style={{
              display: isHovered ? "block" : "none",
              transition: "display 0.3s ease",
            }}
          >
            <span
              className="badge text-dark me-2"
              style={{
                backgroundColor: "#FFD700",
                padding: "5px 10px",
                fontSize: "0.85rem",
                borderRadius: "12px",
              }}
            >
              {project.domain?.name || "No Domain"}
            </span>
            <span
              className="badge text-dark"
              style={{
                backgroundColor: "#FFD700",
                padding: "5px 10px",
                fontSize: "0.85rem",
                borderRadius: "12px",
              }}
            >
              {project.category?.name || "No Category"}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p
            className="project-desc"
            style={{
              display: isHovered ? "block" : "none",
              fontSize: "0.9rem",
              lineHeight: "1.4",
              marginBottom: "1rem",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            {project.description
              ? project.description.substring(0, 100) + "..."
              : "No description available"}
          </p>

          {/* "KNOW MORE" BUTTON */}
          {isHovered && (
            <button
              onClick={() => onClick(project)} // Trigger modal with the project
              style={{
                backgroundColor: "#FFD700",
                color: "#1A1A1A",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e6b800")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFD700")}
            >
              Know More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
