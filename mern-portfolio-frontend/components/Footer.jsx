const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "var(--rich-black)",
        color: "var(--text-light)",
        textAlign: "center",
        padding: "1.2rem 0",
        marginTop: "3rem",
        borderTop: "1px solid var(--primary-gold)",
      }}
    >
      <p className="mb-0" style={{ fontSize: "0.95rem" }}>
        © {new Date().getFullYear()} <span style={{ color: "var(--button-gold)" }}>My Portfolio</span>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
