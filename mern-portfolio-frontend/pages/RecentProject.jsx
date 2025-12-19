import React, { useState, useEffect } from "react";
import API from "../api/api";  // Assuming this is your API helper
import ProjectModal from "../components/ProjectModal";  // Modal for detailed project view
import ProjectCard from "../components/ProjectCard";

export default function RecentProjects() {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  useEffect(() => {
    // Make sure the API call is only made once on component mount
    const loadProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data); // Save fetched data into projects state
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoadingProjects(false); // Set loading to false once the request completes
      }
    };

    loadProjects();
  }, []); // Empty dependency array ensures the API call runs only once on mount

  // Filter out the projects with `badge: true`, slice last 3, and reverse them
  const badgeProjects = projects.filter((project) => project.badge === true).slice(-3).reverse();

  return (
    <div className="container py-5">
      <h2 className="section-title text-center mt-3 mb-5" style={{ color: "#FFD700" }}>
        Projects
      </h2>

      {/* Project Cards */}
      {loadingProjects ? (
        <p className="text-light text-center">Loading projects...</p>
      ) : badgeProjects.length === 0 ? (
        <p className="text-light text-center">No projects available.</p>
      ) : (
        <div className="row g-4">
          {badgeProjects.map((p) => (
            <ProjectCard key={p._id} project={p} onClick={openModal} />
          ))}
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        showModal={showModal}
        closeModal={closeModal}
        selectedProject={selectedProject}
      />
    </div>
  );
}
