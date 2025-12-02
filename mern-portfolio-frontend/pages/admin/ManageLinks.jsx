import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageLinks() {
  const [links, setLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    github: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch links on component mount
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/links");
      setLinks(res.data);
    } catch (err) {
      console.error("Failed to fetch links:", err.response?.data || err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks({ ...links, [name]: value });
  };

  // Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Add credentials if using cookies for auth
      await axios.put(
        "http://localhost:5000/api/links",
        links,
        { withCredentials: true } // include cookie token
      );
      setMessage("Links updated successfully!");
    } catch (err) {
      console.error("Error updating links:", err.response?.data || err);
      setMessage("Failed to update links");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2>Manage Links</h2>

      {message && <p className="alert alert-info">{message}</p>}

      <form className="row g-3 mt-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            name="facebook"
            placeholder="Facebook URL"
            className="form-control"
            value={links.facebook}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="twitter"
            placeholder="Twitter URL"
            className="form-control"
            value={links.twitter}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="instagram"
            placeholder="Instagram URL"
            className="form-control"
            value={links.instagram}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            className="form-control"
            value={links.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="github"
            placeholder="GitHub URL"
            className="form-control"
            value={links.github}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Links"}
          </button>
        </div>
      </form>
    </div>
  );
}
