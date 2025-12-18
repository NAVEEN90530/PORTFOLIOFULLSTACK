import React, { useEffect, useState } from "react";
import axios from "axios";
import homebackground from "../src/assects/homebackground.jpeg";
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
      {/* Cards Section */}
      <div className="row g-4">
        {insights.map((item) => (
          <div
            className="col-12 col-md-6 col-lg-4"
            key={item._id || item.slug}
            style={{
              cursor: "pointer",
              borderRadius: "15px",
              height: "300px",
              width: "100%",
              overflow: "hidden",
              backgroundColor: "#111111",
              position: "relative",
              boxShadow: "0 4px 10px #FFD700",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onClick={() => handleCardClick(item)}
          >
            <div
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                position: "relative",
                transition: "transform 0.3s ease",
              }}
            >
              {/* Overlay */}
              <div
                className="insight-img-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              ></div>

              {/* Content */}
              <div
                className="insight-content-visible"
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  zIndex: 1,
                  color: "#FFD700",
                }}
              >
                <div className="insight-title">{item.name}</div>
              </div>

              {/* Hover Content */}
              <div
                className="insight-content"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  color: "#FFD700",
                  textAlign: "center",
                  opacity: 0,
                  width: "90%",
                  transition: "opacity 0.4s ease",
                }}
              >
                <div className="insight-title">{item.name}</div>
                <p
                  className="insight-desc"
                  style={{
                    fontSize: "0.95rem",
                    marginTop: "10px",
                    display: "inline-block",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.description.length > 100
                    ? item.description.substring(0, 100) + "..."
                    : item.description}
                </p>
                <Button
                  variant="warning"
                  onClick={() => handleCardClick(item)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#FFD700",
                    color: "#1A1A1A",
                  }}
                >
                  Know More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Insight Details */}
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
          <Button variant="secondary" onClick={handleClose}>Close</Button>
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
