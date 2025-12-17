import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import API from "../api/api";

const handleLogout = async () => {
  try {
    await API.post("/auth/logout");
    window.location.href = "/admin/login";
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

const AdminNavbar = () => {
  const menuItems = [
    ["Dashboard", "/admin/dashboard"],
    ["Projects", "/admin/projects"],
    ["Testimonials", "/admin/testimonials"],
    ["Links", "/admin/links"],
    ["Stats", "/admin/stats"],
    ["Category", "/admin/category"],
    ["Contacts", "/admin/contacts"],
    ["Domain", "/admin/domain"],
  ];

  // Common styles
  const linkStyle = {
    color: "#EDEDED",
    fontWeight: 500,
    margin: "0 5px",
    padding: "5px 10px",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "0.3s ease",
  };

  const activeLinkStyle = {
    color: "#FFD700",
    fontWeight: 600,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    transform: "translateY(-1px)",
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      sticky="top"
      style={{
        backgroundColor: "#0A0A0A", // var(--rich-black)
        borderBottom: "1px solid #D4AF37", // var(--primary-gold)
        zIndex: 1050,
        backdropFilter: "blur(5px)",
        padding: "0.5rem 1rem",
      }}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={NavLink}
          to="/admin/dashboard"
          style={{
            color: "#D4AF37",
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontSize: "1.2rem",
          }}
        >
          Admin Panel
        </Navbar.Brand>

        {/* Hamburger toggle */}
        <Navbar.Toggle
          aria-controls="admin-navbar"
          style={{ borderColor: "#D4AF37" }}
        />

        <Navbar.Collapse id="admin-navbar">
          <Nav className="ms-auto align-items-center">
            {menuItems.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
                }
              >
                {label}
              </NavLink>
            ))}

            <Button
              onClick={handleLogout}
              style={{
                marginLeft: "10px",
                backgroundColor: "#FFD700",
                color: "#0A0A0A",
                fontWeight: 600,
                border: "none",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#D4AF37")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#FFD700")
              }
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
