import { useEffect, useState } from "react";
import API from "../../api/api.js";

export default function ManageStats() {
  const [stats, setStats] = useState({
    happyCustomers: "",
    projectsCompleted: "",
    projectTechnologies: ""
  });

  const [statsget, setStatsget] = useState({
    happyCustomers: "",
    projectsCompleted: "",
    projectTechnologies: ""
  });

  useEffect(() => {
    API.get("/settings")
      .then((res) => setStatsget(res.data.stats))
      .catch(() => {});
  }, [stats]);

  const loadStats = () => {
    API.get("/settings").then((res) => {
      if (res.data.stats) {
        setStats(res.data.stats);
      }
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const updateStats = async (e) => {
    e.preventDefault();
    try {
      await API.put("/settings/stats", stats);
      loadStats(); // Reload stats to show the updated values
      // Clear the inputs after the update
      setStats({
        happyCustomers: "",
        projectsCompleted: "",
        projectTechnologies: ""
      });
    } catch (error) {
      console.error("Failed to update stats:", error);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold">Manage Stats</h2>

      {/* Form Section */}
      <form className="container" onSubmit={updateStats}>
        <div className="row g-4">
          <div className="col-md-4">
            <label className="form-label">Happy Customers</label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Happy Customers"
              
              onChange={(e) => setStats({ ...stats, happyCustomers: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Projects Completed</label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Projects Completed"
              
              onChange={(e) => setStats({ ...stats, projectsCompleted: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Project Technologies</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Project Technologies"
              
              onChange={(e) => setStats({ ...stats, projectTechnologies: e.target.value })}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-lg w-100 mt-2">
              Save Stats
            </button>
          </div>
        </div>
      </form>

      <hr className="my-5" />

      {/* Display Stats */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h3 className="fw-bold text-primary">{statsget.happyCustomers} +</h3>
            <p className="mb-0 fs-5">Happy Customers</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h3 className="fw-bold text-success">{statsget.projectsCompleted} +</h3>
            <p className="mb-0 fs-5">Projects Completed</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h3 className="fw-bold text-warning">{statsget.projectTechnologies} +</h3>
            <p className="mb-0 fs-5">Project Technologies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
