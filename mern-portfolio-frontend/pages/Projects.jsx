import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/api";
import { Modal } from "react-bootstrap";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const location = useLocation();

  useEffect(() => {
    // Check query params for category
    const params = new URLSearchParams(location.search);
    const categoryFromQuery = params.get("category");
    if (categoryFromQuery) setFilterCategory(categoryFromQuery);

    loadCategories();
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch all projects
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

  // Fetch categories
  const loadCategories = async () => {
    try {
      const res = await API.get("/categery");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Open project modal
  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  // Filter projects by selected category
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
            <div className="col-md-4 mb-4" key={p._id}>
              <div
                className="project-card"
                onClick={() => openModal(p)}
                style={{ cursor: "pointer" }}
              >
                {/* IMAGE */}
                <div className="project-img-wrapper">
                  <img src={p.imageUrl} className="project-img" alt={p.name} />
                </div>

                {/* CONTENT */}
                <div className="project-content">
                  <h5 className="project-title">{p.name}</h5>
                  <h6 className="project-category text-warning">{p.category?.name}</h6>
                  <p className="project-desc">
                    {p.description?.substring(0, 100)}...
                  </p>

                  {/* TAGS */}
                  <div className="project-tags d-flex flex-wrap gap-2">
                    {p.taglines?.map((tag, idx) => (
                      <span key={idx} className="badge bg-secondary text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PROJECT MODAL */}
      <Modal show={showModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedProject && (
            <>
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.name}
                className="img-fluid rounded mb-3"
              />

              <h6 className="fw-bold text-warning mb-2">
                {selectedProject.category?.name}
              </h6>

              <p>{selectedProject.description}</p>

              <h6 className="fw-bold mt-3">Technologies:</h6>
              <div className="d-flex flex-wrap gap-2">
                {selectedProject.taglines?.map((tag, idx) => (
                  <span key={idx} className="badge bg-secondary text-white">
                    {tag}
                  </span>
                ))}
              </div>

              {selectedProject.projectLink && (
                <a
                  href={selectedProject.projectLink}
                  className="btn btn-primary mt-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Project
                </a>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
