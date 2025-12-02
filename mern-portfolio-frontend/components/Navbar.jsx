import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">My Portfolio</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/services">Services</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/projects">Projects</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/testimonials">Testimonials</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/touch">Contact</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/login">Admin</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
