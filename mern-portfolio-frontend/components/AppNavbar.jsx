import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";

const AppNavbar = () => {
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Our Services", "/services"],
    ["Projects", "/projects"],
    ["Process", "/process"],
    ["Contact", "/touch"],
    ["Admin", "/admin/login"],
  ];

  return (
    <BootstrapNavbar
      expand="lg"
      sticky="top"
      style={{
        backgroundColor: "var(--rich-black)",
        borderBottom: "1px solid var(--primary-gold)",
      }}
    >
      <Container>
        {/* Brand */}
        <BootstrapNavbar.Brand
          as={NavLink}
          to="/"
          style={{
            color: "var(--primary-gold)",
            fontWeight: "600",
            letterSpacing: "0.5px",
            fontSize: "1.3rem",
            textTransform: "uppercase",
          }}
        >
          My Portfolio
        </BootstrapNavbar.Brand>

        {/* Toggle Button */}
        <BootstrapNavbar.Toggle
          aria-controls="navbar-nav"
          style={{ borderColor: "var(--primary-gold)" }}
        />

        {/* Menu */}
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {links.map(([label, path]) => (
              <Nav.Link
                key={path}
                as={NavLink}
                to={path}
                // Use a function to handle the dynamic className for active and inactive states
                className={({ isActive }) =>
                  isActive
                    ? "goldactive" // Active link: gold color
                    : "lightactive" // Inactive link: light color
                }
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  textTransform: "capitalize",
                }}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default AppNavbar;
