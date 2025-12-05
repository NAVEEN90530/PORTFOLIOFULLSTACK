import { useEffect, useState } from "react";
import CountUp from "react-countup";
import API from "../api/api";
import homebackground from "../src/assects/homebackground.jpeg";
import { NavLink } from "react-router-dom";

// Icons
import { FiTool, FiSend, FiUsers, FiCheckCircle, FiCpu, FiStar } from "react-icons/fi";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    happyCustomers: 0,
    projectsCompleted: 0,
    projectTechnologies: 0,
  });

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  /* ----------------------------------------
     STAT APPEAR ANIMATION (BOTTOM → TOP)
  ---------------------------------------- */
  useEffect(() => {
    const boxes = document.querySelectorAll(".stat-box");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    boxes.forEach((box) => observer.observe(box));

    return () => observer.disconnect();
  }, []);

  /* ----------------------------------------
     LOAD PROJECTS
  ---------------------------------------- */
  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch(console.error)
      .finally(() => setLoadingProjects(false));
  }, []);

  /* ----------------------------------------
     LOAD STATS
  ---------------------------------------- */
  useEffect(() => {
    API.get("/settings")
      .then((res) => setStats(res.data?.stats || {}))
      .catch(console.error)
      .finally(() => setLoadingStats(false));
  }, []);

  const badgeProjects = projects
    ?.filter((p) => p.badge === true)
    .slice(-3)
    .reverse();

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}>

      {/* ---------------- HERO SECTION ---------------- */}
      <div
        style={{
          backgroundImage: `url(${homebackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          textAlign: "center",
          color: "#FFD700",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <h1
            style={{
              color: "#FFF",
              fontWeight: "700",
              fontSize: "5rem",
              marginBottom: "1rem",
              textShadow: "0 0 20px #000",
            }}
          >
            Aurox Design Studio
          </h1>

          <h3
            style={{
              fontWeight: "600",
              fontSize: "3.1rem",
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
          <div className="stats-wrapper">
            <div className="stat-box" data-index="0">
              <FiUsers className="stat-icon" />
              <h2>
                <CountUp start={0} end={stats.happyCustomers} duration={2} />+
              </h2>
              <p>Happy Customers</p>
            </div>

            <div className="stat-box" data-index="1">
              <FiCheckCircle className="stat-icon" />
              <h2>
                <CountUp start={0} end={stats.projectsCompleted} duration={2} />+
              </h2>
              <p>Projects Completed</p>
            </div>

            <div className="stat-box" data-index="2">
              <FiCpu className="stat-icon" />
              <h2>
                <CountUp start={0} end={stats.projectTechnologies} duration={2} />+
              </h2>
              <p>Project Technologies</p>
            </div>
          </div>
        ) : (
          <p style={{ color: "#EDEDED" }}>Loading stats...</p>
        )}
      </div>

      {/* ---------------- RECENT PROJECTS ---------------- */}
      <div className="container py-5">
        <h2 className="section-heading text-center" style={{ color: "#FFD700" }}>Recent Projects</h2>

        {loadingProjects ? (
          <p className="text-light">Loading projects...</p>
        ) : badgeProjects.length === 0 ? (
          <p className="no-projects">No projects available.</p>
        ) : (
          <div className="row">
            {badgeProjects.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <div className="project-card">
                  <div className="project-img-wrapper">
                    <img src={p.imageUrl} className="project-img" alt={p.name} />
                  </div>

                  <div className="project-content">
                    <h5 className="project-title">{p.name}</h5>
                    <p className="project-desc">
                      {p.description?.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* ---------------- INSIGHTS SECTION ---------------- */}
      <h2 className="section-heading text-center" style={{ color: "#FFD700" }}>
        Our Latest Insights
      </h2>

      <div className="container mt-4">
        <div className="row g-4">

          {/* Reverse Engineering */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="insight-card">
              <div className="insight-icon">🛠️</div>
              <div className="insight-title">Reverse Engineering</div>
              <div className="insight-desc">
                Convert physical parts into accurate CAD models with precision scanning.
              </div>
            </div>
          </div>

          {/* Product Design */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="insight-card">
              <div className="insight-icon">📦</div>
              <div className="insight-title">Product Design</div>
              <div className="insight-desc">
                Modern, manufacturable product designs from concept to final model.
              </div>
            </div>
          </div>

          {/* Mold Design */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="insight-card">
              <div className="insight-icon">🧩</div>
              <div className="insight-title">Mold Design</div>
              <div className="insight-desc">
                High-precision mold designs suitable for mass production tooling.
              </div>
            </div>
          </div>

          {/* Industrial Design */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="insight-card">
              <div className="insight-icon">🏭</div>
              <div className="insight-title">Industrial Design</div>
              <div className="insight-desc">
                Aesthetic and functional designs tailored for your target market.
              </div>
            </div>
          </div>

          {/* 3D Printing */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="insight-card">
              <div className="insight-icon">🖨️</div>
              <div className="insight-title">3D Printing</div>
              <div className="insight-desc">
                Professional-grade 3D printing using PLA, ABS, Resin, PETG & Nylon.
                Perfect for prototypes and functional testing.
              </div>
            </div>
          </div>

        </div>
      </div>


      <section className="choose-us py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Why Choose Us</h2>

          <div className="row g-4">
            {/* Item 1 */}
            <div className="col-md-4">
              <div className="choose-card">
                <div className="choose-icon">
                  <FiTool />
                </div>
                <h5 className="choose-number">01</h5>
                <h5 className="choose-title"> End to End Support</h5>
                <p className="choose-desc">
                  We help design and develop your product under one roof. We are the one-stop solution for design, development, and manufacturing your product enclosures and parts. With access to over 5 different technologies and 50+ different materials, we make design to production seamless.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="col-md-4">
              <div className="choose-card">
                <div className="choose-icon">
                  <FiStar />
                </div>
                <h5 className="choose-number">02</h5>
                <h5 className="choose-title">Superior Finish</h5>
                <p className="choose-desc">
                  We have various types of finishes available to make your product stand out. Super fine Glossy finish, Matt finish with various color options are available. We also do electroplating to give a metallic gold and silver finish. Time to stop paying for low-quality products.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="col-md-4">
              <div className="choose-card">
                <div className="choose-icon">
                  <FiCpu />
                </div>
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

      <Testimonials />

      <Contact />



    </div>
  );
}
