import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", companyName: "", content: "" });
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ _id: "", name: "", companyName: "", content: "" });
  const [loading, setLoading] = useState(false);

  // Load Testimonials
  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const res = await API.get("/testimonials");
      setTestimonials(res.data);
    } catch (error) {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  // Create Testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const sanitizedContent = DOMPurify.sanitize(form.content);

    try {
      await API.post("/testimonials", { ...form, content: sanitizedContent });
      setForm({ name: "", companyName: "", content: "" });
      loadTestimonials();
      toast.success("Testimonial added!");
    } catch (error) {
      toast.error("Failed to add testimonial");
    } finally {
      setLoading(false);
    }
  };

  // Delete Testimonial
  const deleteItem = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    setLoading(true);
    try {
      await API.delete(`/testimonials/${id}`);
      loadTestimonials();
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Failed to delete testimonial");
    } finally {
      setLoading(false);
    }
  };

  // Edit Testimonial
  const openEditModal = (t) => {
    setEditForm(t);
    setEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const sanitizedContent = DOMPurify.sanitize(editForm.content);

    try {
      await API.put(`/testimonials/${editForm._id}`, { ...editForm, content: sanitizedContent });
      setEditModal(false);
      loadTestimonials();
      toast.success("Updated successfully!");
    } catch (error) {
      toast.error("Failed to update testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2
        className="text-center mb-4 fw-bold"
        style={{
          color: "var(--button-gold)",
          textShadow: "0 0 10px rgba(212,175,55,0.6)"
        }}
      >
        Manage Testimonials
      </h2>

      {/* CREATE FORM */}
      <div
        className="p-4 mb-4"
        style={{
          backgroundColor: "var(--rich-black)",
          borderRadius: "10px",
          boxShadow: "0 0 12px rgba(212,175,55,0.2)"
        }}
      >
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="col-md-4">
            <label className="form-label" style={{ color: "var(--button-gold)" }}>
              Client Name
            </label>
            <input
              className="form-control"
              placeholder="Enter client name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{
                backgroundColor: "#0F0F0F",
                color: "#fff",
                border: "1px solid var(--button-gold)"
              }}
            />
          </div>

          {/* Company Name */}
          <div className="col-md-4">
            <label className="form-label" style={{ color: "var(--button-gold)" }}>
              Client Company Name
            </label>
            <input
              className="form-control"
              placeholder="Enter company name"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              style={{
                backgroundColor: "#0F0F0F",
                color: "#fff",
                border: "1px solid var(--button-gold)"
              }}
            />
          </div>

          {/* Message */}
          <div className="col-md-4">
            <label className="form-label" style={{ color: "var(--button-gold)" }}>
              Message
            </label>
            <input
              className="form-control"
              placeholder="Enter testimonial"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              style={{
                backgroundColor: "#0F0F0F",
                color: "#fff",
                border: "1px solid var(--button-gold)"
              }}
            />
          </div>

          <div className="col-md-12">
            <button
              className="btn w-100"
              style={{
                backgroundColor: "var(--button-gold)",
                color: "#000",
                fontWeight: "600"
              }}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Testimonial"}
            </button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <table
        className="table table-dark table-striped"
        style={{
          border: "1px solid var(--primary-gold)",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        <thead>
          <tr style={{ background: "#000" }}>
            <th style={{ color: "var(--button-gold)" }}>Name</th>
            <th style={{ color: "var(--button-gold)" }}>Company</th>
            <th style={{ color: "var(--button-gold)" }}>Message</th>
            <th style={{ color: "var(--button-gold)" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.companyName}</td>
              <td>{t.content}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openEditModal(t)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteItem(t._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editModal && (
        <div className="modal d-block" style={{ background: "#00000090", backdropFilter: "blur(4px)" }}>
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                background: "var(--rich-black)",
                color: "var(--text-light)",
                border: "1px solid var(--primary-gold)",
                boxShadow: "0 0 12px rgba(212,175,55,0.4)"
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: "var(--button-gold)" }}>
                  Edit Testimonial
                </h5>
                <button className="btn-close" style={{ filter: "invert(1)" }} onClick={() => setEditModal(false)}></button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  {/* Name */}
                  <label className="form-label" style={{ color: "var(--button-gold)" }}>
                    Client Name
                  </label>
                  <input
                    className="form-control mb-3"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    style={{
                      background: "#0F0F0F",
                      color: "#fff",
                      border: "1px solid var(--button-gold)"
                    }}
                  />

                  {/* Company */}
                  <label className="form-label" style={{ color: "var(--button-gold)" }}>
                    Client Company Name
                  </label>
                  <input
                    className="form-control mb-3"
                    value={editForm.companyName}
                    onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                    style={{
                      background: "#0F0F0F",
                      color: "#fff",
                      border: "1px solid var(--button-gold)"
                    }}
                  />

                  {/* Message */}
                  <label className="form-label" style={{ color: "var(--button-gold)" }}>
                    Message
                  </label>
                  <input
                    className="form-control mb-3"
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    style={{
                      background: "#0F0F0F",
                      color: "#fff",
                      border: "1px solid var(--button-gold)"
                    }}
                  />
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" onClick={() => setEditModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "var(--button-gold)",
                      color: "#000",
                      fontWeight: "600"
                    }}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
