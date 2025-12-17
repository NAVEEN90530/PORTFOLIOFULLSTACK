// ProjectCard.js
import React from "react";

export default function ProjectCard({ project, onClick }) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="project-card"
        onClick={() => onClick(project)}
        style={{
          cursor: "pointer",
          borderRadius: "10px",
          overflow: "hidden",
          background: "#1A1A1A",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(255, 215, 0, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* IMAGE */}
        <div className="project-img-wrapper" style={{ height: "200px", overflow: "hidden" }}>
          <img
            src={project.imageUrl || "/placeholder.png"}
            className="project-img w-100 h-100"
            alt={project.name || "Project Image"}
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* CONTENT */}
        <div className="project-content p-3" style={{ color: "#EDEDED" }}>
          <h5 className="project-title">{project.name || "Untitled Project"}</h5>
          
          {/* DOMAIN AND CATEGORY */}
          <div className="project-meta mb-2">
            <span className="badge text-dark me-2" style={{ backgroundColor: "#FFD700" }}>
              {project.domain?.name || "No Domain"}
            </span>
            <span className="badge text-dark" style={{ backgroundColor: "#FFD700" }}>
              {project.category?.name || "No Category"}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="project-desc">
            {project.description ? project.description.substring(0, 100) + "..." : "No description available"}
          </p>

          {/* TAGS */}
          {project.taglines && project.taglines.length > 0 && (
            <div className="project-tags d-flex flex-wrap gap-2">
              {project.taglines.map((tag, idx) => (
                <span key={idx} className="badge chip text-dark" style={{ backgroundColor: "#FFD700" }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
