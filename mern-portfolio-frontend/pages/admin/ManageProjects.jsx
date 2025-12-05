import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../api/api";
import { toast } from "react-toastify"; // optional for notifications
import { listCategories } from "../../api/category";

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
    fetchCategories(); // Fetch categories only once when component mounts
  }, []);

  // Load all projects
  const loadProjects = () => {
    setLoading(true);
    API.get("/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch projects", err);
        toast.error("Failed to load projects!");
      })
      .finally(() => setLoading(false));
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await listCategories();
      setCategories(data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  // Create project
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    if (!form.name || !form.description || !form.category) {
      toast.warning("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      await API.post("/projects", form);
      toast.success("Project created successfully!");
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
      console.error("Error creating project:", err);
      toast.error("Error creating project!");
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
      toast.success("Project deleted successfully!");
      loadProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Error deleting project!");
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
    console.log("Opening edit modal for project: ", project); // Debugging line
    setEditForm({
      _id: project._id,
      name: project.name,
      description: project.description,
      imageUrl: project.imageUrl,
      category: project.category?._id || "",
      taglines: project.taglines || ["", "", ""],
      badge: project.badge ?? false, // NEW
    });
    setEditModal(true); // Open the modal
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
    console.log("Updating project with form data: ", editForm); // Debugging line
    setLoading(true);

    try {
      await API.put(`/projects/${editForm._id}`, editForm);
      setEditModal(false);
      toast.success("Project updated successfully!");
      loadProjects();
    } catch (err) {
      console.error("Error updating project:", err);
      toast.error("Error updating project!");
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
    <div className="container py-4" style={{ backgroundColor: "#f9f9f9" }}>
      <h2 style={{ color: "#d4af37" }}>Manage Projects</h2>

      {/* CREATE FORM */}
      <form className="row g-3 mt-3" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ borderColor: "#d4af37" }}
          />
        </div>

        {/* Image Upload */}
        <div className="col-md-4">
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageChange}
            style={{ borderColor: "#d4af37" }}
          />
        </div>

        {/* Preview */}
        {form.imageUrl && (
          <div className="col-md-4">
            <img
              src={form.imageUrl}
              alt="Preview"
              style={{ width: "120px", borderRadius: "4px", border: "2px solid #d4af37" }}
            />
          </div>
        )}

        {/* Description */}
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            style={{ borderColor: "#d4af37" }}
          />
        </div>

        {/* Category */}
        <div className="col-md-4">
          <select
            className="form-control"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            style={{ borderColor: "#d4af37" }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
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
              style={{ borderColor: "#d4af37" }}
            />
          </div>
        ))}

        {/* Badge Toggle */}
        <div className="col-md-4">
          <label className="form-check-label" style={{ color: "#d4af37" }}>
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.checked })}
              style={{ borderColor: "#d4af37" }}
            />
            Show Badge
          </label>
        </div>

        {/* Submit */}
        <div className="col-12">
          <button
            className="btn"
            style={{
              backgroundColor: "#d4af37",
              color: "#fff",
              borderColor: "#d4af37",
            }}
            disabled={loading}
          >
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
            style={{ borderColor: "#d4af37" }}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PROJECT TABLE */}
      <table className="table mt-3" style={{ color: "#333" }}>
        <thead>
          <tr style={{ backgroundColor: "#d4af37", color: "#fff" }}>
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
                    <span className="badge" style={{ backgroundColor: "#d4af37", color: "#fff" }}>
                      ✔ Yes
                    </span>
                  ) : (
                    <span className="badge" style={{ backgroundColor: "#b8b8b8", color: "#fff" }}>
                      No
                    </span>
                  )}
                </td>

                <td>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#f1c232",
                      color: "#fff",
                      borderColor: "#f1c232",
                    }}
                    onClick={() => openEditModal(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      borderColor: "#e74c3c",
                    }}
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

      {/* Modal structure */}
      {editModal && (
        <div className="modal d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Project</h5>
                <button
                  className="btn-close"
                  onClick={() => {
                    console.log("Closing edit modal"); // Debugging line
                    setEditModal(false);
                  }}
                ></button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  {/* Name */}
                  <input
                    className="form-control mb-2"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    style={{ borderColor: "#d4af37" }}
                  />

                  {/* Image Upload */}
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control mb-2"
                    onChange={handleEditImage}
                  />

                  {editForm.imageUrl && (
                    <img
                      src={editForm.imageUrl}
                      width="120"
                      className="mb-2"
                      alt="edit"
                    />
                  )}

                  {/* Description */}
                  <input
                    className="form-control mb-2"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    style={{ borderColor: "#d4af37" }}
                  />

                  {/* Category */}
                  <select
                    className="form-control mb-2"
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    style={{ borderColor: "#d4af37" }}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
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
                      style={{ borderColor: "#d4af37" }}
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
                      style={{ borderColor: "#d4af37" }}
                    />
                    Show Badge
                  </label>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
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
