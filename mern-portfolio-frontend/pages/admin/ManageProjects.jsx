import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../api/api";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // CREATE FORM STATE
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    category: "",
    taglines: ["", "", ""],
    badge: false, // NEW
  });

  // EDIT MODAL STATE
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    _id: "",
    name: "",
    description: "",
    imageUrl: "",
    category: "",
    taglines: ["", "", ""],
    badge: false, // NEW
  });

  // CATEGORY FILTER
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    loadProjects();
    loadCategories();
  }, []);

  // Load all projects
  const loadProjects = () => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch(() => console.error("Failed to fetch projects"));
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categery");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  // Create project
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/projects", form);
      setForm({
        name: "",
        description: "",
        imageUrl: "",
        category: "",
        taglines: ["", "", ""],
        badge: false,
      });
      loadProjects();
    } catch (err) {
      console.error("Error creating project:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    setLoading(true);
    try {
      await API.delete(`/projects/${id}`);
      loadProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    } finally {
      setLoading(false);
    }
  };

  // Base64 Image Upload - Create
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setForm({ ...form, imageUrl: reader.result });
  };

  // Open edit modal
  const openEditModal = (project) => {
    setEditForm({
      _id: project._id,
      name: project.name,
      description: project.description,
      imageUrl: project.imageUrl,
      category: project.category?._id || "",
      taglines: project.taglines || ["", "", ""],
      badge: project.badge ?? false, // NEW
    });
    setEditModal(true);
  };

  // Base64 Image Upload - Edit
  const handleEditImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setEditForm({ ...editForm, imageUrl: reader.result });
  };

  // Update project
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put(`/projects/${editForm._id}`, editForm);
      setEditModal(false);
      loadProjects();
    } catch (err) {
      console.error("Error updating project:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  const filteredProjects =
    filterCategory === "all"
      ? projects
      : projects.filter((p) => p.category?._id === filterCategory);

  return (
    <div className="container py-4">
      <h2>Manage Projects</h2>

      {/* CREATE FORM */}
      <form className="row g-3 mt-3" onSubmit={handleSubmit}>
        
        {/* Name */}
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Image Upload */}
        <div className="col-md-4">
          <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
        </div>

        {/* Preview */}
        {form.imageUrl && (
          <div className="col-md-4">
            <img src={form.imageUrl} alt="Preview" style={{ width: "120px", borderRadius: "4px" }} />
          </div>
        )}

        {/* Description */}
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Category */}
        <div className="col-md-4">
          <select
            className="form-control"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Taglines */}
        {form.taglines.map((tag, i) => (
          <div className="col-md-4" key={i}>
            <input
              className="form-control"
              placeholder={`Tagline ${i + 1}`}
              value={tag}
              onChange={(e) => {
                const updated = [...form.taglines];
                updated[i] = e.target.value;
                setForm({ ...form, taglines: updated });
              }}
            />
          </div>
        ))}

        {/* Badge Toggle */}
        <div className="col-md-4">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.checked })}
            />
            Show Badge
          </label>
        </div>

        {/* Submit */}
        <div className="col-12">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Project"}
          </button>
        </div>
      </form>

      <hr />

      {/* CATEGORY FILTER */}
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-control"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* PROJECT TABLE */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Category</th>
            <th>Badge</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td><img src={p.imageUrl} width="70" alt="project" /></td>
                <td>{p.description}</td>
                <td>{p.category?.name || "Uncategorized"}</td>

                {/* Badge Column */}
                <td>
                  {p.badge ? (
                    <span className="badge bg-success">✔ Yes</span>
                  ) : (
                    <span className="badge bg-secondary">No</span>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openEditModal(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProject(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Projects Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editModal && (
        <div className="modal d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5>Edit Project</h5>
                <button className="btn-close" onClick={() => setEditModal(false)}></button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="modal-body">

                  {/* Name */}
                  <input
                    className="form-control mb-2"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />

                  {/* Image Upload */}
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control mb-2"
                    onChange={handleEditImage}
                  />

                  {editForm.imageUrl && (
                    <img src={editForm.imageUrl} width="120" className="mb-2" alt="edit" />
                  )}

                  {/* Description */}
                  <input
                    className="form-control mb-2"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />

                  {/* Category */}
                  <select
                    className="form-control mb-2"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>

                  {/* Taglines */}
                  {editForm.taglines.map((tag, i) => (
                    <input
                      key={i}
                      className="form-control mb-2"
                      value={tag}
                      onChange={(e) => {
                        const updated = [...editForm.taglines];
                        updated[i] = e.target.value;
                        setEditForm({ ...editForm, taglines: updated });
                      }}
                      placeholder={`Tagline ${i + 1}`}
                    />
                  ))}

                  {/* Badge */}
                  <label className="form-check-label mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={editForm.badge}
                      onChange={(e) =>
                        setEditForm({ ...editForm, badge: e.target.checked })
                      }
                    />
                    Show Badge
                  </label>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary"
                    onClick={() => setEditModal(false)}
                  >
                    Cancel
                  </button>

                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Updating..." : "Update Project"}
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
