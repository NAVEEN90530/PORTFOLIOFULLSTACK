import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import Insights from "./Insights";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [domainsWithCategories, setDomainsWithCategories] = useState([]);
  const [filterDomain, setFilterDomain] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
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

    // Debugging the URL parameters:
    console.log("Domain from URL:", domainFromQuery);
    console.log("Category from URL:", categoryFromQuery);

    setFilterDomain(domainFromQuery);
    setFilterCategory(categoryFromQuery);

    loadProjects(domainFromQuery, categoryFromQuery);
  }, [location.search]);

  // Load Projects based on domain and category
  const loadProjects = async (domain = "", category = "all") => {
    console.log("Loading projects with domain:", domain, "and category:", category); // Debugging
    try {
      setLoadingProjects(true);
      const res = await API.get("/projects", { params: { domain, category } });
      
      // Debugging the API response:
      console.log("Projects loaded:", res.data);

      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoadingProjects(false);
    }
  };

  // Filter categories based on selected domain
  useEffect(() => {
    if (filterDomain) {
      const domain = domainsWithCategories.find((d) => d.slug === filterDomain);
      setCategoryOptions(domain ? domain.categories : []);
    }
  }, [filterDomain, domainsWithCategories]);

  // Handles when domain is changed
  const handleDomainChange = (e) => {
    const newDomain = e.target.value;
    console.log("Domain selected:", newDomain); // Debugging domain change

    setFilterDomain(newDomain);
    setFilterCategory("all"); // reset category when domain changes
    navigate(`/projects?domain=${newDomain}`); // Update URL with domain
  };

  // Handles when category is changed
  const handleCategoryChange = (e) => {
    const newCategorySlug = e.target.value;
    console.log("Category selected:", newCategorySlug); // Debugging category change

    setFilterCategory(newCategorySlug);
    navigate(`/projects?domain=${filterDomain}&category=${newCategorySlug}`); // Update URL with category
  };

  // Open Project Modal
  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // Close Project Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="container py-5">
      <Insights />
      <div className="gold-line"></div>
      <h2 className="section-title text-center mt-3 mb-5" style={{ color: "#FFD700" }}>
        Projects
      </h2>

      {error && <p className="text-danger text-center">{error}</p>}

      {/* Filters Container */}
      <div className="row mb-3">
        <div className="col-md-3 mb-2">
          <label className="form-label text-light">Filter by Domain:</label>
          <select
            className="form-control bg-dark text-light border-0"
            value={filterDomain}
            onChange={handleDomainChange}
            style={{ padding: "10px", borderRadius: "8px" }}
          >
            <option value="">All Domains</option>
            {domainsWithCategories.map((d) => (
              <option key={d._id} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 mb-2">
          <label className="form-label text-light">Filter by Category:</label>
          <select
            className="form-control bg-dark text-light border-0"
            value={filterCategory}
            onChange={handleCategoryChange}
            style={{ padding: "10px", borderRadius: "8px" }}
          >
            <option value="all">All Categories</option>
            {categoryOptions.map((category) => (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            ))}
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
