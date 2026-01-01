import { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 import icons
import DOMPurify from "dompurify"; // 👈 import DOMPurify

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Sanitize inputs using DOMPurify
    const sanitizedUsername = DOMPurify.sanitize(form.username);
    const sanitizedPassword = DOMPurify.sanitize(form.password);

    try {
      await API.post("/auth/login", { username: sanitizedUsername, password: sanitizedPassword });

      toast.success("Login successful!", { position: "top-right", autoClose: 3000 });

      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#0A0A0A" }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#1A1A1A",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          color: "#EDEDED",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#FFD700", fontWeight: "bold" }}>
          Admin Login
        </h3>

        {error && (
          <div className="alert alert-danger" style={{ backgroundColor: "#ff4d4f", color: "#fff" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            style={{ backgroundColor: "#0A0A0A", color: "#EDEDED", border: "1px solid #444" }}
          />

          <div className="mb-3" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} // 👈 toggle type
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{ backgroundColor: "#0A0A0A", color: "#EDEDED", border: "1px solid #444", paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#FFD700"
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="btn w-100"
            disabled={loading}
            style={{
              backgroundColor: "#FFD700",
              color: "#0A0A0A",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e6c200")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFD700")}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
