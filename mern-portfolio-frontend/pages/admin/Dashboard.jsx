import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import CountUp from "react-countup";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    happyCustomers: 0,
    projectsCompleted: 0,
    projectTechnologies: 0,
  });


  const menuItems = [
    ["Projects", "/admin/projects"],
    ["Testimonials", "/admin/testimonials"],
    ["Links", "/admin/links"],
    ["Stats", "/admin/stats"],
    ["Category", "/admin/category"],
    ["Contacts", "/admin/contacts"],
    ["Domain", "/admin/domain"],
  ];

  const statItems = [
    { label: "Happy Customers", value: stats.happyCustomers },
    { label: "Projects Completed", value: stats.projectsCompleted },
    { label: "Project Technologies", value: stats.projectTechnologies },
  ];

  useEffect(() => {
    API.get("/settings")
      .then((res) => res.data.stats && setStats(res.data.stats))
      .catch(() => { });
  }, []);

  return (
    <Container fluid className="dashboard-container text-center">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* Quick Links */}
      <h4 className="section-title">Quick Links</h4>
      <Row className="mb-4">
        {menuItems.map(([label, path], index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-3">
            <Card
              className="menu-card text-center"
              onClick={() => navigate(path)}
            >
              {label}
            </Card>
          </Col>
        ))}
      </Row>
      <div className="gold-line"></div>
      {/* Stats */}
      <h4 className="section-title">Our Stats</h4>
      <Row className="mb-4">
        {statItems.map((item, index) => (
          <Col xs={12} sm={6} md={4} key={index} className="mb-3">
            <Card className="stat-card text-center p-3">
              <h3 className="stat-value">
                <CountUp start={0} end={item.value} duration={1} separator="," />+
              </h3>
              <p className="stat-label">{item.label}</p>
            </Card>
          </Col>
        ))}
      </Row>


      {/* CSS inside component */}
      <style type="text/css">{`
        .dashboard-container {
          padding: 2rem;
          background-color: #0A0A0A;
          min-height: 100vh;
          color: #EDEDED;
        }
        .dashboard-title {
          color: #D4AF37;
          font-weight: 700;
          margin-bottom: 2rem;
        }
        .section-title {
          color: #FFD700;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .menu-card {
          background-color: #111111;
          color: #FFD700;
          font-weight: 600;
          padding: 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .menu-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(212,175,55,0.6);
        }
        .stat-card {
          background-color: #111111;
          color: #FFD700;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(212,175,55,0.3);
        }
        .stat-value {
          margin-bottom: 0.5rem;
        }
        .stat-label {
          color: #EDEDED;
          font-weight: 500;
        }
        .recent-activity-card {
          background-color: #111111;
          border-radius: 12px;
        }
        .activity-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(212,175,55,0.2);
        }
        .activity-item:last-child {
          border-bottom: none;
        }
        .activity-time {
          color: #FFD700;
        }

        @media (max-width: 768px) {
          .menu-card, .stat-card {
            padding: 1rem;
          }
        }
      `}</style>
    </Container>
  );
}
