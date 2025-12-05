import { useEffect, useState } from "react";
import CountUp from "react-countup";
import API from "../api/api";
import homebackground from "../src/assects/homebackground.jpeg";
import { NavLink } from "react-router-dom";

// Icons
import { FiTool, FiSend, FiUsers, FiCheckCircle, FiCpu, FiStar } from "react-icons/fi";
import ProjectModal from "../components/ProjectModal";  // Ensure correct import

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    happyCustomers: 0,
    projectsCompleted: 0,
    projectTechnologies: 0,
  });
  const [selectedProject, setSelectedProject] = useState(null);  // Modal project state
  const [showModal, setShowModal] = useState(false);             // Modal visibility state
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  // Modal functions
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch(console.error)
      .finally(() => setLoadingProjects(false));

    API.get("/settings")
      .then((res) => setStats(res.data?.stats || {}))
      .catch(console.error)
      .finally(() => setLoadingStats(false));
  }, []);

  const badgeProjects = projects.filter((p) => p.badge === true).slice(-3).reverse();

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}>
      {/* ... other content ... */}

      {/* ---------------- RECENT PROJECTS ---------------- */}
      <div className="container">
        <h2 className="section-heading text-center py-3" style={{ color: "#FFD700" }}>
          Recent Projects
        </h2>
        {loadingProjects ? (
          <p className="text-light">Loading projects...</p>
        ) : badgeProjects.length === 0 ? (
          <p className="no-projects">No projects available.</p>
        ) : (
          <div className="row">
            {badgeProjects.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <div
                  className="project-card"
                  onClick={() => openProjectModal(p)}  // Open modal
                  style={{ cursor: "pointer" }}
                >
                  <div className="project-img-wrapper">
                    <img
                      src={p.imageUrl || "/path/to/default-image.jpg"}  // Fallback image
                      className="project-img"
                      alt={p.name || "Project Image"}
                      onError={(e) => (e.target.src = "/path/to/default-image.jpg")}
                    />
                  </div>
                  <div className="project-content">
                    <h5 className="project-title">{p.name}</h5>
                    <p className="project-desc">{p.description?.substring(0, 100)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- PROJECT MODAL ---------------- */}
      {selectedProject && showModal && (
        <ProjectModal
          showModal={showModal}
          closeModal={closeProjectModal}
          selectedProject={selectedProject}
        />
      )}

      {/* ... other content ... */}
    </div>
  );
}
