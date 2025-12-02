import { useEffect, useState } from "react";
import API from "../../api/api";
import AdminSidebar from "../../components/AdminSidebar";
import CountUp from "react-countup";

export default function Dashboard() {
  const [stats, setStats] = useState({ happyCustomers: 0, projectsCompleted: 0, projectTechnologies: 0 });

  useEffect(() => {
    API.get("/settings")
      .then((res) => setStats(res.data.stats))
      .catch(() => { });
  }, []);

  const statItems = [
    { label: 'Happy Customers', value: stats.happyCustomers, color: 'text-primary' },
    { label: 'Projects Completed', value: stats.projectsCompleted, color: 'text-success' },
    { label: 'Project Technologies', value: stats.projectTechnologies, color: 'text-warning' }
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="container py-4" style={{ marginLeft: '250px' }}>
        <h2>Admin Dashboard</h2>

        <h2 className="mt-5 mb-4">Our Stats</h2>
        <div className="row g-4">
          {statItems.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card shadow-sm p-4 text-center">
                <h3 className={`fw-bold ${item.color}`}>
                  <CountUp start={0} end={item.value} duration={1} separator="," /> +
                </h3>
                <p className="mb-0 fs-5">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
