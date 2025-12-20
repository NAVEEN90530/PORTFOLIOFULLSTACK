import { useEffect, useState } from "react";
import API from "../../api/api.js";
import { toast } from "react-toastify";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaSmile, FaTasks, FaCogs } from "react-icons/fa";

const COLORS = {
  background: "#111",
  text: "#EDEDED",
  highlight: "#FFD700",
};

export default function ManageStats() {
  const [stats, setStats] = useState({
    happyCustomers: "",
    projectsCompleted: "",
    projectTechnologies: "",
  });

  const [statsget, setStatsget] = useState({
    happyCustomers: "",
    projectsCompleted: "",
    projectTechnologies: "",
  });

  const [loading, setLoading] = useState(false);

  // Load stats once
  const loadStats = () => {
    API.get("/settings")
      .then((res) => {
        if (res.data.stats) {
          setStatsget(res.data.stats);
        }
      })
      .catch(() => {
        toast.error("Failed to load stats");
      });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const updateStats = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { happyCustomers, projectsCompleted, projectTechnologies } = stats;

    if (!happyCustomers || !projectsCompleted || !projectTechnologies) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      await API.put("/settings/stats", stats);
      toast.success("Stats updated successfully!");
      loadStats();
      setStats({ happyCustomers: "", projectsCompleted: "", projectTechnologies: "" });
    } catch (error) {
      console.error("Failed to update stats:", error);
      toast.error("Failed to update stats!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4" style={{ minHeight: "100vh", backgroundColor: COLORS.background }}>
      <h2 className="mb-4 text-center fw-bold dashboard-title" style={{ color: COLORS.highlight }}>Manage Stats</h2>

      {/* Form Section */}
      <form
        className="card p-4 mb-4 shadow-sm"
        style={{
          backgroundColor: COLORS.background,
          borderRadius: "12px",
          border: `1px solid ${COLORS.highlight}`,
        }}
        onSubmit={updateStats}
      >
        <div className="row g-4">
          <div className="col-md-4">
            <label className="form-label text-light">Happy Customers</label>
            <input
              type="number"
              className="form-control bg-dark text-light border-0"
              placeholder="Happy Customers"
              value={stats.happyCustomers}
              onChange={(e) => setStats({ ...stats, happyCustomers: e.target.value })}
              style={{
                backgroundColor: COLORS.background,
                color: COLORS.text,
                borderColor: COLORS.highlight,
                borderRadius: "8px",
                padding: "10px",
              }}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label" style={{ color: COLORS.highlight }}>
              Projects Completed
            </label>
            <input
              type="number"
              className="form-control form-control-lg shadow-sm rounded-3"
              placeholder="Projects Completed"
              value={stats.projectsCompleted}
              onChange={(e) => setStats({ ...stats, projectsCompleted: e.target.value })}
              style={{
                backgroundColor: COLORS.background,
                color: COLORS.text,
                borderColor: COLORS.highlight,
                borderRadius: "8px",
                padding: "10px",
              }}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label" style={{ color: COLORS.highlight }}>
              Project Technologies
            </label>
            <input
              type="text"
              className="form-control form-control-lg shadow-sm rounded-3"
              placeholder="Project Technologies"
              value={stats.projectTechnologies}
              onChange={(e) => setStats({ ...stats, projectTechnologies: e.target.value })}
              style={{
                backgroundColor: COLORS.background,
                color: COLORS.text,
                borderColor: COLORS.highlight,
                borderRadius: "8px",
                padding: "10px",
              }}
            />
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-lg w-50 mt-4 rounded-pill shadow-lg"
              style={{
                backgroundColor: COLORS.highlight,
                color: "#111111",
                fontWeight: 600,
                borderRadius: "30px",
                border: "none",
                padding: "15px 30px",
              }}
              disabled={loading || !stats.happyCustomers || !stats.projectsCompleted || !stats.projectTechnologies}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Save Stats"
              )}
            </button>
          </div>
        </div>
      </form>

      <hr className="my-5" style={{ borderColor: COLORS.highlight }} />

      {/* Category Cards Section */}
      <Row className="g-4">
        <Col md={4}>
          <Card
            className="category-card border"
            style={{
              borderColor: COLORS.highlight,
              backgroundColor: COLORS.background,
              color: COLORS.text,
              borderRadius: "15px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Body className="text-center">
              <FaSmile size={40} className="mb-3" style={{ color: COLORS.highlight }} />
              <h3 className="fw-bold" style={{ color: COLORS.highlight }}>
                {statsget.happyCustomers} +
              </h3>
              <p className="fs-5">Happy Customers</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="category-card border"
            style={{
              borderColor: COLORS.highlight,
              backgroundColor: COLORS.background,
              color: COLORS.text,
              borderRadius: "15px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Body className="text-center">
              <FaTasks size={40} className="mb-3" style={{ color: COLORS.highlight }} />
              <h3 className="fw-bold" style={{ color: COLORS.highlight }}>
                {statsget.projectsCompleted} +
              </h3>
              <p className="fs-5">Projects Completed</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="category-card border"
            style={{
              borderColor: COLORS.highlight,
              backgroundColor: COLORS.background,
              color: COLORS.text,
              borderRadius: "15px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Body className="text-center">
              <FaCogs size={40} className="mb-3" style={{ color: COLORS.highlight }} />
              <h3 className="fw-bold" style={{ color: COLORS.highlight }}>
                {statsget.projectTechnologies} +
              </h3>
              <p className="fs-5">Project Technologies</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
