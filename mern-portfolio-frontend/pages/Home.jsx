import { useEffect, useState } from "react";
import CountUp from "react-countup";
import API from "../api/api";
import homebackground from "../src/assects/homebackground.jpeg";
import homebackgrounddim from "../src/assects/homebackgrounddim.png";
import { NavLink } from "react-router-dom";

// Icons
import { FiTool, FiSend, FiUsers, FiCheckCircle, FiCpu, FiStar } from "react-icons/fi";
import Testimonials from "./Testimonials";
import SendMessage from "./SendMessage";
import Insights from "./Insights";
import ScrollFade from "./scroll";
import AuroxHowWeWork from "./WeWork";
import RecentProjects from "./RecentProject";

export default function Home() {

  const [stats, setStats] = useState({
    happyCustomers: 0,
    projectsCompleted: 0,
    projectTechnologies: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);


  useEffect(() => {


    API.get("/settings")
      .then((res) => setStats(res.data?.stats || {}))
      .catch(console.error)
      .finally(() => setLoadingStats(false));
  }, []);


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
          backgroundImage: `url(${homebackgrounddim})`,
          // backgroundImage: `url(${homebackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        {/* Content */}
        <div
          style={{
            maxWidth: "800px",
            padding: "2rem",
            borderRadius: "10px", // Optional for a more modern look
            zIndex: 100,
          }}
        >
          <h1
            style={{
              fontFamily: "Castellar, serif",
              fontWeight: "500",
              fontSize: "5rem",
              marginBottom: "1rem",
              textShadow: "0 0 20px #000",
              cursor: "pointer",
              zIndex: 100,
            }}
          >
            Aurox Design Studio
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
            Transforming design innovation into reality.
          </p>
        </div>

        {/* Buttons */}
        <div
          className="nav-btn-wrapper"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            marginTop: "2rem",
            zIndex: 100,
          }}
        >
          <NavLink
            to="/services"
            className="nav-btn nav-btn-outline"
            style={{
              padding: "1rem 2rem",
              backgroundColor: "transparent",
              border: "2px solid #FFD700",
              borderRadius: "5px",
              color: "#FFD700",
              fontSize: "1.2rem",
              textDecoration: "none",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiTool
              style={{
                marginRight: 8,
                fontSize: "1.3rem",
                cursor: "pointer",
              }}
            />
            Explore our services
          </NavLink>

          <NavLink
            to="/get-in-touch"
            className="nav-btn nav-btn-filled"
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#FFD700",
              color: "#1A1A1A",
              fontSize: "1.2rem",
              textDecoration: "none",
              fontWeight: "500",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiSend
              style={{
                marginRight: 8,
                fontSize: "1.3rem",
                cursor: "pointer",
              }}
            />
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
                <span> +</span>
              </h2>
              <p>Happy Customers</p>
            </div>

            <div className="stat-box">
              <FiCheckCircle className="stat-icon" />
              <h2 aria-live="polite">
                <CountUp start={0} end={stats.projectsCompleted} duration={2} separator="," />
                <span> +</span>
              </h2>
              <p>Projects Completed</p>
            </div>

            <div className="stat-box">
              <FiCpu className="stat-icon" />
              <h2 aria-live="polite">
                <CountUp start={0} end={stats.projectTechnologies} duration={2} separator="," />
                <span> +</span>
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

      <RecentProjects />


      <div className="gold-line"></div>

      {/* ---------------- INSIGHTS SECTION ---------------- */}
      <section className="container py-5">
        <h2 className="section-heading text-center" style={{ color: "#FFD700" }}>
          Our Latest Insights
        </h2>

        <Insights />
        <div
          className="nav-btn-wrapper"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            marginTop: "2rem",
            zIndex: 100,
          }}
        >
          <NavLink
            to="/services"
            className="nav-btn nav-btn-outline"
            style={{
              padding: "1rem 2rem",
              backgroundColor: "transparent",
              border: "2px solid #FFD700",
              borderRadius: "5px",
              color: "#FFD700",
              fontSize: "1.2rem",
              textDecoration: "none",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiTool
              style={{
                marginRight: 8,
                fontSize: "1.3rem",
                cursor: "pointer",
              }}
            />
            More Projects
          </NavLink>
        </div>

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
                <h5 className="choose-title">End to End Support</h5>
                <p className="choose-desc">
                  We help design and develop your product under one roof. We are the one-stop solution for design, development, and manufacturing your product enclosures and parts. With access to over 5 different technologies and 50+ different materials, we make design to production seamless.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="choose-card">
                <div className="choose-icon"><FiStar /></div>
                <h5 className="choose-title">Superior Finish</h5>
                <p className="choose-desc">
                  We have various types of finishes available to make your product stand out. Super fine Glossy finish, Matt finish with various color options are available. We also do electroplating to give a metallic gold and silver finish. Time to stop paying for low-quality products.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="choose-card">
                <div className="choose-icon"><FiCpu /></div>
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
