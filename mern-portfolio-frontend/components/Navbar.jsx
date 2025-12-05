import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "var(--rich-black)",
        borderBottom: "1px solid var(--primary-gold)",
      }}
    >
      <div className="container">

        {/* Brand */}
        <Link
          className="navbar-brand"
          to="/"
          style={{
            color: "var(--primary-gold)",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >
          My Portfolio
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          style={{ borderColor: "var(--primary-gold)" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              filter: "invert(80%) sepia(90%) saturate(300%)",
            }}
          ></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">

            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Our Services", "/services"],
              ["Projects", "/projects"],
              ["Process", "/process"],
              ["Contact", "/touch"],
              ["Admin", "/admin/login"],
            ].map(([label, path]) => (
              <li className="nav-item" key={path}>
                <NavLink
                  className="nav-link px-3"
                  to={path}
                  style={({ isActive }) => ({
                    color: isActive
                      ? "var(--button-gold)"
                      : "var(--text-light)",
                    fontWeight: isActive ? "600" : "400",
                    transition: "0.3s",
                  })}
                >
                  {label}
                </NavLink>
              </li>
            ))}

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
