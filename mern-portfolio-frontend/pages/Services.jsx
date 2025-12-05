import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import navigate
import API from "../api/api";
import Projects from "./Projects";

export default function Services() {
  const navigate = useNavigate(); // for redirect
  const insights = [
    { icon: "🛠️", title: "Reverse Engineering", desc: "Convert physical parts into accurate CAD models with precision scanning." },
    { icon: "📦", title: "Product Design", desc: "Modern, manufacturable product designs from concept to final model." },
    { icon: "🧩", title: "Mold Design", desc: "High-precision mold designs suitable for mass production tooling." },
    { icon: "🏭", title: "Industrial Design", desc: "Aesthetic and functional designs tailored for your target market." },
    { icon: "🖨️", title: "3D Printing", desc: "Professional-grade 3D printing using PLA, ABS, Resin, PETG & Nylon. Perfect for prototypes and functional testing." },
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await API.get("/categery");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Redirect to Projects page with selected category
  const goToCategory = (categoryId) => {
    navigate(`/projects?category=${categoryId}`);
  };

  return (
    <div className="container py-5">

      {/* Insights Section */}
      <h2 className="section-heading text-center mb-5" style={{ color: "#FFD700", fontWeight: 600 }}>
        Our Services
      </h2>

      <div className="row g-4 mb-5">
        {insights.map((item, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <div className="insight-card p-4 h-100 text-center" style={{
              backgroundColor: "#0A0A0A",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
            }}>
              <div className="insight-icon mb-3" style={{ fontSize: "2.5rem" }}>{item.icon}</div>
              <div className="insight-title mb-2" style={{ color: "#FFD700", fontWeight: 600, fontSize: "1.25rem" }}>{item.title}</div>
              <div className="insight-desc" style={{ color: "#EDEDED" }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="gold-line"></div>

      {/* Industries Section */}
      <div className="container py-5">
      <h2 className="section-heading text-center mb-4" style={{ color: "#FFD700", fontWeight: 600 }}>
        Industries We Work With
      </h2>

      <div className="row justify-content-center mt-4 g-3">
        {categories.map((cat) => (
          <div key={cat._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div
              className="industry-card"
              onClick={() => goToCategory(cat._id)}
              style={{ cursor: "pointer" }}
            >
              <div className="industry-icon">🏭</div>
              {cat.name}
            </div>
          </div>
        ))}
      </div>

         <div className="gold-line"></div>

      <Projects />

    </div>
      </div>


  );
}
