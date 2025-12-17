import { Link, NavLink } from "react-router-dom";
import API from "../api/api";


const handleLogout = async () => {
  try {
    await API.post("/auth/logout"); // call your backend logout
    sessionStorage.removeItem("authToken"); // optional if you store token
    window.location.href = "/admin/login"; // redirect to login page
  } catch (err) {
    console.error("Logout failed:", err);
  }
};


const AdminNavbar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        backgroundColor: "var(--rich-black)",
        color: "var(--text-light)",
        borderRight: "1px solid var(--primary-gold)",
      }}
    >
      {/* Header */}
      <Link
        to="/admin/dashboard"
        className="d-flex align-items-center mb-3 text-decoration-none"
        style={{ color: "var(--button-gold)" }}
      >
        <span className="fs-4 fw-bold">Admin Panel</span>
      </Link>

      <hr style={{ borderColor: "var(--primary-gold)" }} />

      {/* Menu */}
      <ul className="nav nav-pills flex-column mb-auto">

        {[
          ["Dashboard", "/admin/dashboard"],
          ["Manage Projects", "/admin/projects"],
          ["Manage Testimonials", "/admin/testimonials"],
          ["Manage Links", "/admin/links"],
          ["Manage Stats", "/admin/stats"],
          ["Admin Page", "/admin/adminpage"],
          ["Manage Category", "/admin/category"],
          ["Manage Contacts", "/admin/contacts"],
          ["Manage Domain", "/admin/domain"],
        ].map(([label, path]) => (
          <li className="nav-item" key={path}>
            <NavLink
              to={path}
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "var(--button-gold)" : "var(--text-light)",
                backgroundColor: isActive ? "rgba(212, 175, 55, 0.15)" : "transparent",
                borderLeft: isActive ? "3px solid var(--button-gold)" : "3px solid transparent",
                padding: "10px 15px",
                marginBottom: "4px",
                transition: "0.3s ease",
              })}
            >
              {label}
            </NavLink>
          </li>
        ))}

        <hr style={{ borderColor: "var(--primary-gold)" }} />

        <li className="nav-item">
          <button
            className="btn w-100"
            style={{
              backgroundColor: "var(--primary-gold)",
              color: "var(--rich-black)",
              fontWeight: 600,
            }}
            onClick={handleLogout} // 👈 use the function
          >
            Logout
          </button>
        </li>

      </ul>
    </div>
  );
};

export default AdminNavbar;
