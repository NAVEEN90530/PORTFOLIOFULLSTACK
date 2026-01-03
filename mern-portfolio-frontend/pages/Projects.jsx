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
    loadProjects(domainFromQuery, categoryFromQuery);
  }, [location.search]);

  // Fetch projects based on filters
  const loadProjects = async (domain, category) => {
    try {
      setLoadingProjects(true);
      const res = await API.get("/projects", { params: { domain, category } });
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Fetch domains for the domain filter
  const loadDomains = async () => {
    try {
      const res = await API.get("/domains");
      setDomains(res.data);
    } catch (err) {
      console.error("Failed to fetch domains:", err);
    }
  };

  // Fetch categories for the category filter
  const loadCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Open project details in a modal
  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  // Handle domain change in the dropdown
  const handleDomainChange = (e) => {
    const newDomain = e.target.value;
    setFilterDomain(newDomain);
    setFilterCategory("all"); // reset category when domain changes
    navigate(`/projects?domain=${newDomain}`); // update URL with domain
  };

  // Handle category change in the dropdown
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setFilterCategory(newCategory);
    navigate(`/projects?domain=${filterDomain}&category=${newCategory}`); // update URL with category
  };

  // Filter projects based on selected domain and category
  const filteredProjects = projects.filter((p) => {
    const matchesDomain = !filterDomain || p.domain?.slug === filterDomain;
    const matchesCategory = filterCategory === "all" || p.category?._id === filterCategory;
    return matchesDomain && matchesCategory;
  });

  // Categories filtered by selected domain
  const domainCategories = categories.filter((cat) =>
    filterDomain
      ? projects.some((p) => p.domain?.slug === filterDomain && p.category?._id === cat._id)
      : true
  );

  return (
    <div className="container py-5">
      <Insights />

      <div className="gold-line"></div>

      <h2 className="section-title text-center mt-3 mb-5" style={{ color: "#FFD700" }}>
        Projects
      </h2>

      <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 mb-4">
        {/* Domain Filter */}
        <div className="d-flex gap-2 align-items-center">
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
        <div className="d-flex gap-2 align-items-center">
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
      </div>


      {/* Project Cards */}
      {loadingProjects ? (
        <p className="text-light text-center">Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-light text-center">No projects available.</p>
      ) : (
        <div className="row">
          {filteredProjects.map((p) => (
            <ProjectCard key={p._id} project={p} onClick={openModal} />
          ))}
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal showModal={showModal} closeModal={closeModal} selectedProject={selectedProject} />
    </div>
  );
}
