import { Link, NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
      style={{ width: "250px", height: "100vh", position: "fixed" }}
    >
      <Link
        to="/admin/dashboard"
        className="d-flex align-items-center mb-3 text-white text-decoration-none"
      >
        <span className="fs-4">Admin Panel</span>
      </Link>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            className="nav-link text-white"
            to="/admin/dashboard"
            activeClassName="active"
          >
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link text-white"
            to="/admin/projects"
            activeClassName="active"
          >
            Manage Projects
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link text-white"
            to="/admin/testimonials"
            activeClassName="active"
          >
            Manage Testimonials
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link text-white"
            to="/admin/links"
            activeClassName="active"
          >
            Manage Links
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link text-white"
            to="/admin/stats"
            activeClassName="active"
          >
            Manage Stats
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link text-white"
            to="/admin/adminpage"
            activeClassName="active"
          >
            Admin Page
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link text-white"
            to="/admin/category" // Fixed the typo here
            activeClassName="active"
          >
            Manage Category
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link text-white"
            to="/admin/contacts"
            activeClassName="active"
          >
            Manage Contacts
          </NavLink>
        </li>

        <hr />

        <li className="nav-item">
          <NavLink
            to="/admin/login"
            className="text-white text-decoration-none"
            onClick={() => sessionStorage.removeItem("authToken")}
          >
            <button className="btn btn-danger w-100">Logout</button>
          </NavLink>
        </li>

      </ul>


    </div>
  );
};

export default AdminNavbar;
