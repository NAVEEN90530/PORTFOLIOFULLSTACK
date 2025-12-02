import { useEffect, useState } from "react";
import CountUp from "react-countup";
import API from "../api/api";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    happyCustomers: 0,
    projectsCompleted: 0,
    projectTechnologies: 0,
  });

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch(console.error)
      .finally(() => setLoadingProjects(false));
  }, []);

  useEffect(() => {
    API.get("/settings")
      .then((res) => setStats(res.data?.stats || {}))
      .catch(console.error)
      .finally(() => setLoadingStats(false));
  }, []);

  return (
    <div className="bg-dark">  
      
     
          <div style={{ textAlign: "center", color: "white" }}>
            <h1>You Imagine We Create</h1>
            <p>
              We manufacture products using innovative technologies<br />
              On demand, No Minimum order quantity
            </p>

            {loadingStats ? (
              <p>Loading stats...</p>
            ) : (
              <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem" }}>
                <div>
                  <h2>
                    <CountUp start={0} end={stats.happyCustomers} duration={2} />+
                  </h2>
                  <p>Happy Customers</p>
                </div>
                <div>
                  <h2>
                    <CountUp start={0} end={stats.projectsCompleted} duration={2} />+
                  </h2>
                  <p>Projects Completed</p>
                </div>
                <div>
                  <h2>
                    <CountUp start={0} end={stats.projectTechnologies} duration={2} />+
                  </h2>
                  <p>Project Technologies</p>
                </div>
              </div>
            )}
          </div>
     
      

      {/* Projects section below Silk */}
      <div style={{ position: "relative", zIndex: 1 }} className="container py-5">
        <h2 className="mb-4">Recent Projects</h2>
        {loadingProjects ? (
          <p>Loading projects...</p>
        ) : (
          <div className="row">
            {projects?.slice(0, 3).map((p) => (
              <div className="col-md-4 mb-3 p-5" key={p._id}>
                <div className="card h-100">
                  <img src={p.imageUrl} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5>{p.name}</h5>
                    <p>{p.description?.substring(0, 100)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
