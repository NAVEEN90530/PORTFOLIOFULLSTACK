import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";


export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);  // Scrolls to the top of the page
  }, []);  // Empty dependency array ensures this only runs once after the component mounts
  return (
    <div className="container py-5" style={{ color: "var(--text-light)" }}>

      {/* Title */}
      <h2
        style={{
          color: "var(--primary-gold)",
          fontWeight: "600",
          marginBottom: "2rem",
          fontSize: "3rem",
          textAlign: "center", // Centered heading
        }}
      >
        About Us
      </h2>

      {/* Paragraphs */}
      <p style={{ lineHeight: "1.7", fontSize: "1.5rem", opacity: 0.9, marginBottom: "1rem" }}>
        We are a CAD design service provider specializing in
        <span style={{ color: "var(--button-gold)", fontWeight: 600 }}>
          {" "}high-quality product development and engineering solutions.
        </span>
      </p>

      <p style={{ lineHeight: "1.7", fontSize: "1.5rem", opacity: 0.9, marginBottom: "1rem" }}>
        With expertise in 3D modeling, product design, mold design, DFM,
        prototype development, and technical drawings, we support industries
        such as plastics, fabrication, tooling, manufacturing, and prototyping.
      </p>

      <p style={{ lineHeight: "1.7", fontSize: "1.5rem", opacity: 0.9, marginBottom: "1rem" }}>
        At Three Dimensional Designs and Developments, we convert ideas into
        precise, manufacturable models using professional engineering tools.
        Whether it’s a freehand sketch, an image, STL remastering, or a complete
        concept.
      </p>

      

<div className="gold-line"></div>

      {/* Goal Section */}
      <h2
        style={{
          color: "var(--primary-gold)",
          fontWeight: "600",
          marginTop: "2rem",
          marginBottom: "1rem",
          fontSize: "3rem",
          textAlign: "center", // Centered heading
        }}
      >
        Our Goal
      </h2>

      <p style={{ lineHeight: "1.7", fontSize: "1.5rem", opacity: 0.9 }}>
        To provide fast, reliable, and production-ready CAD solutions tailored
        to your manufacturing needs.
      </p>
    </div>
  );
}
