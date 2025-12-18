import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Insights from "./Insights";
import Projects from "./Projects";

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
      <h2 className="text-center mb-2" style={{ color: "#FFD700", fontWeight: "bold" }}>
        Our Services
      </h2> 
      <Projects />
    </div>
  );
}
