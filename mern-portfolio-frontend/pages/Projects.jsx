import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import ProjectModal from "../components/ProjectModal";
import ProjectCard from "../components/ProjectCard";
import Insights from "./Insights";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [domains, setDomains] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterDomain, setFilterDomain] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Read domain and category query from URL on first load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const domainFromQuery = params.get("domain") || "";
    const categoryFromQuery = params.get("category") || "all";

    setFilterDomain(domainFromQuery);
    setFilterCategory(categoryFromQuery);

    loadDomains();
    loadCategories();
    loadProjects();
  }, [location.search]);

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

  const loadDomains = async () => {
    try {
      const res = await API.get("/domains");
      setDomains(res.data);
    } catch (err) {
      console.error("Failed to fetch domains:", err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  const handleDomainChange = (e) => {
    const newDomain = e.target.value;
    setFilterDomain(newDomain);
    setFilterCategory("all"); // reset category when domain changes
    navigate(`/projects?domain=${newDomain}`); // update URL with domain
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setFilterCategory(newCategory);
    navigate(`/projects?domain=${filterDomain}&category=${newCategory}`); // update URL with category
  };

  // Filter projects based on selected filters
  const filteredProjects = projects
    .filter((p) => !filterDomain || p.domain?.slug === filterDomain)
    .filter((p) => filterCategory === "all" || p.category?._id === filterCategory);

  // Categories filtered by domain
  const domainCategories = categories.filter((cat) =>
    filterDomain
      ? projects.some((p) => p.domain?.slug === filterDomain && p.category?._id === cat._id)
      : true
  );

  return (
    <div className="container py-5">
      <Insights />
      
      <h2 className="section-title mb-4" style={{ color: "#FFD700" }}>
        Projects
      </h2>

      {/* Domain Filter */}
      <div className="mb-3 d-flex gap-2 align-items-center">
        <label className="text-light mb-0 fw-bold">Domain:</label>
        <select
          className="form-select form-select-sm"
          value={filterDomain}
          onChange={handleDomainChange}
        >
          <option value="">All Domains</option>
          {domains.map((domain) => (
            <option key={domain._id} value={domain.slug}>
              {domain.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-4 d-flex gap-2 align-items-center">
        <label className="text-light mb-0 fw-bold">Category:</label>
        <select
          className="form-select form-select-sm"
          value={filterCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All Categories</option>
          {domainCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Project Cards */}
      {loadingProjects ? (
        <p className="text-light">Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-light">No projects available.</p>
      ) : (
        <div className="row">
          {filteredProjects.map((p) => (
            <ProjectCard key={p._id} project={p} onClick={openModal} />
          ))}
        </div>
      )}

      <ProjectModal
        showModal={showModal}
        closeModal={closeModal}
        selectedProject={selectedProject}
      />
    </div>
  );
}
