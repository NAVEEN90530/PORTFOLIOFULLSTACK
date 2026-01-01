import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import ProjectModal from "../components/ProjectModal";
import ProjectCard from "../components/ProjectCard";
import Insights from "./Insights";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [domainsWithCategories, setDomainsWithCategories] = useState([]);
  const [filterDomain, setFilterDomain] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch domains with their categories
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await API.get("/domains/with-categories");
        setDomainsWithCategories(res.data);
      } catch (err) {
        console.error("Error fetching domains with categories:", err);
        setError("Failed to load domains and categories.");
      }
    };

    fetchDomains();
  }, []);

  // Extract domain and category from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const domainFromQuery = params.get("domain") || "";
    const categoryFromQuery = params.get("category") || "all";

    setFilterDomain(domainFromQuery);
    setFilterCategory(categoryFromQuery);

    loadProjects(domainFromQuery, categoryFromQuery);
  }, [location.search]);

  // Load Projects based on domain and category
  const loadProjects = async (domain = "", category = "all") => {
    try {
      setLoadingProjects(true);
      const res = await API.get("/projects", { params: { domain, category } });
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoadingProjects(false);
    }
  };

  // Filter categories based on selected domain
  const filteredCategories = domainsWithCategories.find(
    (domain) => domain.slug === filterDomain
  )?.categories || [];

  // Handles when domain is changed
  const handleDomainChange = (e) => {
    const newDomain = e.target.value;
    setFilterDomain(newDomain);
    setFilterCategory("all"); // reset category when domain changes
    navigate(`/projects?domain=${newDomain}`); // Update URL with domain
  };

  // Handles when category is changed
  const handleCategoryChange = (e) => {
    const newCategorySlug = e.target.value;
    setFilterCategory(newCategorySlug);
    navigate(`/projects?domain=${filterDomain}&category=${newCategorySlug}`); // Update URL with category
  };

  return (
    <div className="container py-5">
      <Insights />
      <div className="gold-line"></div>
      <h2 className="section-title text-center mt-3 mb-5" style={{ color: "#FFD700" }}>
        Projects
      </h2>

      {error && <p className="text-danger text-center">{error}</p>}

      {/* Display selected category name */}
      <div className="text-center mb-4">
        <h4>Category: {filterCategory !== "all" ? filterCategory : "All Categories"}</h4>
      </div>

      {/* Filters Container */}
      <div className="d-flex flex-wrap justify-content-between mb-5 align-items-center">
        {/* Domain Filter */}
        <div className="d-flex gap-2 align-items-center">
          <label className="text-light mb-0 fw-bold">Domain:</label>
          <select
            className="form-select form-select-sm"
            value={filterDomain}
            onChange={handleDomainChange}
          >
            <option value="">All Domains</option>
            {domainsWithCategories.map((domain) => (
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
            disabled={!filterDomain} // Disable category select if no domain is selected
          >
            <option value="all">All Categories</option>
            {filteredCategories.length === 0 ? (
              <option value="all">No categories available</option>
            ) : (
              filteredCategories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Project Cards */}
      {loadingProjects ? (
        <p className="text-light text-center">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-light text-center">No projects available.</p>
      ) : (
        <div className="row">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
