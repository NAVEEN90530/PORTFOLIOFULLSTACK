import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Insights from "./Insights";

export default function Services() {
  const [domains, setDomains] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/domains/with-categories")
      .then((res) => setDomains(res.data))
      .catch(console.error);
  }, []);

  const handleViewProjects = () => {
    if (!selectedCategory) return;

    navigate(
      `/projects?domain=${selectedCategory.domain.slug}&category=${selectedCategory.slug}`
    );

    setShowModal(false);
  };

  return (
    <div className="container py-5">
      <Insights />
      <div className="gold-line"></div>
      {domains.map((domain) => (
        <div key={domain._id} className="mb-5">
          <h4 className="text-warning">{domain.name}</h4>

          <div className="row g-3">
            {domain.categories.map((cat) => (
              <div key={cat._id} className="col-6 col-md-3">
                <div
                  className="card h-100"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowModal(true);
                  }}
                >
                  <img src={cat.imageUrl} className="card-img-top" />
                  <div className="card-body text-center">
                    <h6>{cat.name}</h6>
                  </div>
                  
                </div>
              </div>
              
            ))}
            <div className="gold-line"></div>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button onClick={handleViewProjects}>View Projects</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
