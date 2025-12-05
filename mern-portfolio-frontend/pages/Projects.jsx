// Projects.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/api";
import ProjectModal from "../components/ProjectModal";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromQuery = params.get("category");
    if (categoryFromQuery) setFilterCategory(categoryFromQuery);

    loadCategories();
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await API.get("/categery");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

 const openModal = (project) => {
  setSelectedProject(project); // Ensure this is being called with the correct project data
  setShowModal(true);
};


  const closeModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  const filteredProjects =
    filterCategory === "all"
      ? projects
      : projects.filter((p) => p.category?._id === filterCategory);

  return (
    <div className="container py-5">
      <h2 className="section-title mb-4" style={{ color: "#FFD700" }}>
        Recent Projects
      </h2>

      {/* CATEGORY FILTER */}
      <div className="mb-4 d-flex justify-content-start align-items-center gap-2">
        <label className="text-light mb-0 fw-bold">Filter by Category:</label>
        <select
          className="form-select form-select-sm category-filter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {loadingProjects ? (
        <p className="text-light">Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-light no-projects">No projects available.</p>
      ) : (
        <div className="row">
          {filteredProjects.map((p) => (
            <ProjectCard key={p._id} project={p} onClick={openModal} />
          ))}
        </div>
      )}

      {/* PROJECT MODAL */}
      <ProjectModal
        showModal={showModal}
        closeModal={closeModal}
        selectedProject={selectedProject}
      />
    </div>
  );
}
