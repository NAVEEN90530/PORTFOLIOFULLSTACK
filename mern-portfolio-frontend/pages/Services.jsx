import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Services() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const loadDomainsWithCategories = async () => {
    try {
      const res = await API.get("/domains/with-categories");
      setDomains(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch domains:", err);
      setError("Failed to fetch domains");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDomainsWithCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

const handleViewProjects = () => {
  if (selectedCategory) {
    const domainSlug = selectedCategory.domain?.slug;
    const categorySlug = selectedCategory.slug;

    if (domainSlug && categorySlug) {
      navigate(`/projects?domain=${domainSlug}&category=${categorySlug}`);
      handleCloseModal();
    }
  }
};





  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5" style={{ color: "#FFD700", fontWeight: 600 }}>
        Our Services & Industries
      </h2>

      {domains.map((domain) => (
        <div key={domain._id} className="mb-5">
          {/* Domain Heading */}
          <h4 className="text-warning mb-3">{domain.name}</h4>

          {/* Categories under domain */}
          <div className="row g-3">
            {domain.categories?.map((cat) => (
              <div key={cat._id} className="col-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <img
                    src={cat.imageUrl}
                    className="card-img-top"
                    alt={cat.name}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title">{cat.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal for Category */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Click below to view projects in this category.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleViewProjects}>
            View Projects
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
