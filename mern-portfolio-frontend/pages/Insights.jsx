import React, { useEffect, useState } from "react";
import axios from "axios";
import homebackground from "../src/assects/homebackground.jpeg";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Insights() {
  const [insights, setInsights] = useState([]);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // State for tracking the hovered card

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
    <section className="container pb-5">
      {/* Cards Section */}
      <div className="row g-5" >
        {insights.map((item, index) => (
          <div className="col-12 col-md-4" key={item._id || item.slug} >
            <div
              style={{
                cursor: "pointer",
                borderRadius: "15px",
                height: "300px",
                width: "100%",
                overflow: "hidden",
                // backgroundColor: "#111111",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                position: "relative",
                transform: hoveredIndex === index ? "scale(1.03)" : "scale(1)",
                boxShadow: "0 2px 10px #FFD700",
              }}
              onMouseEnter={() => setHoveredIndex(index)} // Set hovered card index
              onMouseLeave={() => setHoveredIndex(null)} // Reset hovered card index
            >
              {/* Image Wrapper */}
              <div
                className="project-img-wrapper"
                style={{
                  height: "180px",
                  width: "100%",
                  overflow: "hidden",
                  visibility: hoveredIndex === index ? "hidden" : "visible",
                  transition: "visibility 0.3s ease",
                }}
              >
                <img
                  src={item.imageUrl || homebackground}
                  alt={item.name}
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    transform: hoveredIndex === index ? "scale(1)" : "scale(1.1)",
                  }}
                />
              </div>

              {/* Overlay Title */}
              <div
                className="p-3"
                style={{
                  color: "#EDEDED",
                  background: "rgba(0, 0, 0, 0.7)",
                  opacity: hoveredIndex === index ? "0" : "1",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1rem",
                  zIndex: 1,
                  height: hoveredIndex === index ? "100%" : "120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "height 0.3s ease, justify-content 0.3s ease",
                }}
              >
                <h5
                  className="project-title text-center"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    visibility: "visible",
                  }}
                >
                  {item.name || "Untitled Insight"}
                </h5>
              </div>

              {/* Content */}
              <div
                className="p-3"
                style={{
                  color: "#EDEDED",
                  background: "rgba(0, 0, 0, 0.7)",
                  opacity: hoveredIndex === index ? "1" : "0",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1rem",
                  zIndex: 1,
                  height: hoveredIndex === index ? "100%" : "50px", // Increase content height on hover
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: hoveredIndex === index ? "center" : "flex-end", // Adjust content alignment
                  transition: "height 0.3s ease, justify-content 0.3s ease",
                }}
              >
                {/* Title */}
                <h5
                  className="insight-title text-center"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    visibility: "visible",
                    color: "#FFD700",
                  }}
                >
                  {item.name || "Untitled Insight"}
                </h5>

                {/* Description */}
                <p
                  className="insight-desc"
                  style={{
                    display: hoveredIndex === index ? "block" : "none", // Show description on hover
                    fontSize: "0.9rem",
                    lineHeight: "1.4",
                    marginBottom: "1rem",
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  {item.description
                    ? item.description.substring(0, 100) + "..."
                    : "No description available"}
                </p>

                {/* Know More Button */}
                {hoveredIndex === index && (
                  <Button
                    variant="warning"
                    onClick={() => handleCardClick(item)}
                    style={{
                      backgroundColor: "#FFD700",
                      color: "#1A1A1A",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#e6b800")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFD700")}
                  >
                    Know More
                  </Button>
                )}
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
                  <li key={idx}>✅  {point}</li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#1A1A1A" }}>
          {/* <Button variant="secondary" onClick={handleClose}>
                Close
              </Button> */}
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
