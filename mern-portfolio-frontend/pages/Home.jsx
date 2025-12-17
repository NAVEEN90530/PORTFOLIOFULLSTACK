import { useEffect, useState } from "react";
import CountUp from "react-countup";
import API from "../api/api";
import homebackground from "../src/assects/homebackground.jpeg";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from '@react-spring/web';

// Icons
import { FiTool, FiSend, FiUsers, FiCheckCircle, FiCpu, FiStar } from "react-icons/fi";
import ProjectModal from "../components/ProjectModal";  // Ensure correct import
import Testimonials from "./Testimonials";
import SendMessage from "./SendMessage";
import Insights from "./Insights";
import ScrollFade from "./scroll";
import AuroxHowWeWork from "./WeWork";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    happyCustomers: 0,
    projectsCompleted: 0,
    projectTechnologies: 0,
  });
  const [selectedProject, setSelectedProject] = useState(null);  // Modal project state
  const [showModal, setShowModal] = useState(false);             // Modal visibility state
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  // Modal functions
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch(console.error)
      .finally(() => setLoadingProjects(false));

    API.get("/settings")
      .then((res) => setStats(res.data?.stats || {}))
      .catch(console.error)
      .finally(() => setLoadingStats(false));
  }, []);

  const badgeProjects = projects.filter((p) => p.badge === true).slice(-3).reverse();

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}>

      {/* ---------------- HERO SECTION ---------------- */}
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 1rem",
          textAlign: "center",
          color: "#FFD700",
          overflow: "hidden",
        }}
      >
        {/* Background Image Layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${homebackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.1, // ✅ background opacity only
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div style={{ maxWidth: "800px" }}>
          <h1
            style={{
              fontFamily: "Castellar, serif",
              fontWeight: "700",
              fontSize: "5rem",
              marginBottom: "1rem",
              textShadow: "0 0 20px #000",
            }}
          >
            Aurox
          </h1>

          <h2
            style={{
              color: "#EDEDED",
              fontWeight: "600",
              fontSize: "1.5rem",
              textShadow: "0 0 10px #000",
            }}
          >
            Built to be made. Designed to perform.
          </h2>

          <h3
            style={{
              fontWeight: "600",
              fontSize: "2.5rem",
              textShadow: "0 0 10px #000",
            }}
          >
            Product and Industrial Design Services
          </h3>

          <p
            style={{
              color: "#EDEDED",
              fontSize: "1.8rem",
              marginTop: "0.5rem",
              textShadow: "0 0 15px #000",
            }}
          >
            Transforming designing innovation into reality.
          </p>
        </div>

        {/* Buttons */}
        <div className="nav-btn-wrapper">
          <NavLink to="/projects" className="nav-btn nav-btn-outline">
            <FiTool style={{ marginRight: 8, fontSize: "1.3rem" }} />
            Explore our services
          </NavLink>

          <NavLink to="/touch" className="nav-btn nav-btn-filled">
            <FiSend style={{ marginRight: 8, fontSize: "1.3rem" }} />
            Let’s Connect
          </NavLink>
        </div>
      </div>

      
      {/* ---------------- STATS SECTION ---------------- */}
      <div className="container py-5">
        {!loadingStats ? (
          <div className="stats-wrapper" style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="stat-box">
              <FiUsers className="stat-icon" />
              <h2 aria-live="polite">
                <CountUp start={0} end={stats.happyCustomers} duration={2} separator="," />
                <span>+</span>
              </h2>
              <p>Happy Customers</p>
            </div>

            <div className="stat-box">
              <FiCheckCircle className="stat-icon" />
              <h2 aria-live="polite">
                <CountUp start={0} end={stats.projectsCompleted} duration={2} separator="," />
                <span>+</span>
              </h2>
              <p>Projects Completed</p>
            </div>

            <div className="stat-box">
              <FiCpu className="stat-icon" />
              <h2 aria-live="polite">
                <CountUp start={0} end={stats.projectTechnologies} duration={2} separator="," />
                <span>+</span>
              </h2>
              <p>Project Technologies</p>
            </div>
          </div>
        ) : (
          <div className="skeleton-loader">
            {/* Here you can use a skeleton loader for better UX */}
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
          </div>
        )}
      </div>


      <div className="gold-line"></div>

      {/* ---------------- RECENT PROJECTS ---------------- */}
      <div className="container bg-secondary">
        <h2 className="section-heading text-center py-3" style={{ color: "#FFD700" }}>
          Recent Projects
        </h2>
        {loadingProjects ? (
          <p className="text-light">Loading projects...</p>
        ) : badgeProjects.length === 0 ? (
          <p className="no-projects">No projects available.</p>
        ) : (
          <div className="row">
            {badgeProjects.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <div
                  className="project-card"
                  onClick={() => openProjectModal(p)}  // Open modal
                  style={{ cursor: "pointer" }}
                >
                  <div className="project-img-wrapper">
                    <img
                      src={p.imageUrl || "/path/to/default-image.jpg"}  // Fallback image
                      className="project-img"
                      alt={p.name || "Project Image"}
                      onError={(e) => (e.target.src = "/path/to/default-image.jpg")}
                    />
                  </div>
                  <div className="project-content">
                    <h5 className="project-title">{p.name}</h5>
                    <p className="project-desc">{p.description?.substring(0, 100)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- PROJECT MODAL ---------------- */}
      {selectedProject && showModal && (
        <ProjectModal
          showModal={showModal}
          closeModal={closeProjectModal}
          selectedProject={selectedProject}
        />
      )}


      <div className="gold-line"></div>

      {/* ---------------- INSIGHTS SECTION ---------------- */}
      <section className="container py-5">
        <h2 className="section-heading text-center" style={{ color: "#FFD700" }}>
          Our Latest Insights
        </h2>

        <Insights />
      </section>

      <div className="gold-line"></div>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section className="choose-us py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Why Choose Us</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="choose-card">
                <div className="choose-icon"><FiTool /></div>
                <h5 className="choose-number">01</h5>
                <h5 className="choose-title">End to End Support</h5>
                <p className="choose-desc">
                  We help design and develop your product under one roof. We are the one-stop solution for design, development, and manufacturing your product enclosures and parts. With access to over 5 different technologies and 50+ different materials, we make design to production seamless.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="choose-card">
                <div className="choose-icon"><FiStar /></div>
                <h5 className="choose-number">02</h5>
                <h5 className="choose-title">Superior Finish</h5>
                <p className="choose-desc">
                  We have various types of finishes available to make your product stand out. Super fine Glossy finish, Matt finish with various color options are available. We also do electroplating to give a metallic gold and silver finish. Time to stop paying for low-quality products.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="choose-card">
                <div className="choose-icon"><FiCpu /></div>
                <h5 className="choose-number">03</h5>
                <h5 className="choose-title">Technical Expertise</h5>
                <p className="choose-desc">
                  With over 15 years of combined experience in manufacturing, we guide you with the best technology, material, and process to use for manufacturing your product. We also come up with innovative ways to address challenges. We ensure to balance cost and quality as per your requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="gold-line"></div>
      <Testimonials />
      <div className="gold-line"></div>
      <SendMessage />
    </div>
  );
}
