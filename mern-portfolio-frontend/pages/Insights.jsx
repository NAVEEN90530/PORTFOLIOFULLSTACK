import React, { useEffect, useState } from "react";
import axios from "axios";
import homebackground from "../src/assects/homebackground.jpeg";
import "./Insights.css";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Insights() {
  const [insights, setInsights] = useState([]);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.get(`${API_BASE}/domains`);
        if (res.data) {
          const mapped = res.data.map((domain) => ({
            _id: domain._id,
            name: domain.name,
            icon: domain.icon || "🛠️",
            imageUrl: domain.imageUrl || homebackground,
            description: domain.description || "",
            whyChoose: domain.whyChoose || [],
            slug: domain.slug || "",
          }));
          setInsights(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch insights:", err);
      }
    };
    fetchInsights();
  }, []);

  const handleCardClick = (insight) => {
    setSelectedInsight(insight);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleViewProjects = () => {
    if (selectedInsight?.slug) {
      navigate(`/projects?domain=${selectedInsight.slug}`);
    }
  };

  return (
    <section className="container py-5">
      <h2 className="section-heading text-center" style={{ color: "#FFD700" }}>
        Our Latest Insights
      </h2>

      {/* Cards */}
      <div className="insights-section m-5">
        <div className="row g-4">
          {insights.map((item) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={item._id || item.slug}
            >
              <div
                className="insight-card"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
                onClick={() => handleCardClick(item)}
              >
                <div className="insight-content-visible">
                  <div className="insight-icon">{item.icon}</div>
                  <div className="insight-title">{item.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: "#1A1A1A", color: "#FFD700" }}>
          <Modal.Title>{selectedInsight?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1A1A1A", color: "#EDEDED" }}>
          <img
            src={selectedInsight?.imageUrl || homebackground}
            alt={selectedInsight?.name}
            className="img-fluid mb-3"
            style={{ borderRadius: 10 }}
          />
          <p>{selectedInsight?.description}</p>
          {selectedInsight?.whyChoose && selectedInsight.whyChoose.length > 0 && (
            <>
              <h5>Why Choose Us:</h5>
              <ul>
                {selectedInsight.whyChoose.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#1A1A1A" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {selectedInsight?.slug && (
            <Button variant="warning" onClick={handleViewProjects}>
              View Projects
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </section>
  );
}
