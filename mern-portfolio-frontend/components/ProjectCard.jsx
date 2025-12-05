// ProjectCard.js
import React from "react";

export default function ProjectCard({ project, onClick }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="project-card" onClick={() => onClick(project)} style={{ cursor: "pointer" }}>
        {/* IMAGE */}
        <div className="project-img-wrapper">
          <img src={project.imageUrl} className="project-img" alt={project.name} />
        </div>

        {/* CONTENT */}
        <div className="project-content">
          <h5 className="project-title">{project.name}</h5>
          <h6 className="project-category text-warning">{project.category?.name}</h6>
          <p className="project-desc">{project.description?.substring(0, 100)}...</p>

          {/* TAGS */}
          <div className="project-tags d-flex flex-wrap gap-2">
            {project.taglines?.map((tag, idx) => (
              <span key={idx} className="badge chip text-white">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
