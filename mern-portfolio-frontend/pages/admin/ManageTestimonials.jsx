import { useEffect, useState } from "react";
import API from "../../api/api";

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", companyName: "", content: "" });
  
  // --- EDIT STATES ---
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ _id: "", name: "", companyName: "", content: "" });

  // Load testimonials
  const loadTestimonials = () => {
    API.get("/testimonials").then(res => setTestimonials(res.data));
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  // CREATE TESTIMONIAL
  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/testimonials", form);
    setForm({ name: "", companyName: "", content: "" });
    loadTestimonials();
  };

  // DELETE TESTIMONIAL
  const deleteItem = async (id) => {
    if (window.confirm("Delete?")) {
      await API.delete(`/testimonials/${id}`);
      loadTestimonials();
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (testimonial) => {
    setEditForm({
      _id: testimonial._id,
      name: testimonial.name,
      companyName: testimonial.companyName,
      content: testimonial.content,
    });
    setEditModal(true);
  };

  // UPDATE TESTIMONIAL
  const handleUpdate = async (e) => {
    e.preventDefault();
    await API.put(`/testimonials/${editForm._id}`, editForm);
    setEditModal(false);
    loadTestimonials();
  };

  return (
    <div className="container py-4">
      <h2>Manage Testimonials</h2>

      {/* CREATE FORM */}
      <form className="row g-3 mt-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Client Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Client Company Name"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Message"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100">Add</button>
        </div>
      </form>

      <hr />

      {/* TESTIMONIAL TABLE */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Client Company Name</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {testimonials.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.companyName}</td>
              <td>{t.content}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(t)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteItem(t._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editModal && (
        <div className="modal d-block" style={{ background: "#00000070" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Testimonial</h5>
                <button className="btn-close" onClick={() => setEditModal(false)}></button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <input
                    className="form-control mb-2"
                    placeholder="Client Name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />

                  <input
                    className="form-control mb-2"
                    placeholder="Client Company Name"
                    value={editForm.companyName}
                    onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                  />

                  <input
                    className="form-control mb-2"
                    placeholder="Message"
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  />
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setEditModal(false)} type="button">
                    Cancel
                  </button>
                  <button className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
