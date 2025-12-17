import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const AppNavbar = () => {
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Our Services", "/services"],
    ["Projects", "/projects"],
    ["Process", "/process"],
    ["Contact", "/get-in-touch"],
    ["Admin", "/admin/login"],
  ];

  // Inline styles
  const linkStyle = {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    textTransform: "capitalize",
    textDecoration: "none",
    color: "#EDEDED",
    fontWeight: 500,
    borderRadius: "5px",
    transition: "0.3s ease",
  };

  const activeLinkStyle = {
    color: "#FFD700",
    fontWeight: 600,
     backgroundColor: "rgba(255, 215, 0, 0.1)",
    transform: "translateY(-1px)",
  };

  const brandStyle = {
    color: "#D4AF37",
    fontWeight: 600,
    letterSpacing: "0.5px",
    fontSize: "1.3rem",
    textTransform: "uppercase",
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        backgroundColor: "#0A0A0A", // var(--rich-black)
        borderBottom: "1px solid #D4AF37", // var(--primary-gold)
        zIndex: 1050,
      }}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/" style={brandStyle}>
          My Portfolio
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          style={{
            borderColor: "#D4AF37",
          }}
        />

        {/* Menu */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {links.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                style={({ isActive }) =>
                  isActive
                    ? { ...linkStyle, ...activeLinkStyle }
                    : linkStyle
                }
              >
                {label}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
