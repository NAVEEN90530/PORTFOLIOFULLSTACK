import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/api";
import { listCategories } from "../../api/category";
import { listDomains } from "../../api/domain";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [domains, setDomains] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     CREATE FORM
  ========================== */
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    domain: "",
    category: "",
    taglines: ["", "", ""],
    badge: false,
  });

  /* =========================
     EDIT MODAL
  ========================== */
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    _id: "",
    name: "",
    description: "",
    imageUrl: "",
    domain: "",
    category: "",
    taglines: ["", "", ""],
    badge: false,
  });

  const [filterDomain, setFilterDomain] = useState("all");

  /* =========================
     LOAD DATA
  ========================== */
  useEffect(() => {
    loadProjects();
    fetchDomains();
    fetchCategories();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const fetchDomains = async () => {
    try {
      const data = await listDomains();
      setDomains(data);
    } catch {
      toast.error("Failed to fetch domains");
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await listCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  /* =========================
     IMAGE UPLOAD
  ========================== */
  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>
      isEdit
        ? setEditForm({ ...editForm, imageUrl: reader.result })
        : setForm({ ...form, imageUrl: reader.result });
  };

  /* =========================
     CREATE
  ========================== */
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.name || !form.domain || !form.category)
      return toast.warning("Fill all required fields");

    setLoading(true);
    try {
      await API.post("/projects", form);
      toast.success("Project created");
      resetForm();
      loadProjects();
    } catch {
      toast.error("Create failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      imageUrl: "",
      domain: "",
      category: "",
      taglines: ["", "", ""],
      badge: false,
    });
  };

  /* =========================
     DELETE
  ========================== */
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    setLoading(true);
    try {
      await API.delete(`/projects/${id}`);
      toast.success("Project deleted");
      loadProjects();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     EDIT
  ========================== */
  const openEditModal = (p) => {
    setEditForm({
      _id: p._id,
      name: p.name,
      description: p.description,
      imageUrl: p.imageUrl,
      domain: p.domain?._id || "",
      category: p.category?._id || "",
      taglines: p.taglines || ["", "", ""],
      badge: p.badge ?? false,
    });
    setEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await API.put(`/projects/${editForm._id}`, editForm);
      toast.success("Project updated");
      setEditModal(false);
      loadProjects();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FILTER
  ========================== */
  const filteredProjects =
    filterDomain === "all"
      ? projects
      : projects.filter((p) => p.domain?._id === filterDomain);

  /* =========================
     UI
  ========================== */
  return (
    <div className="container py-4">
      <h2 className="text-center" style={{ color: "#d4af37" }}>Manage Projects</h2>

      {/* CREATE FORM */}
      <form className="row g-3 mt-3" onSubmit={handleCreate}>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={form.domain}
            onChange={(e) =>
              setForm({ ...form, domain: e.target.value, category: "" })
            }
          >
            <option value="">Select Domain</option>
            {domains.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            disabled={!form.domain}
          >
            <option value="">Select Category</option>
            {categories
              .filter((c) => c.domain?._id === form.domain)
              .map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => handleImageChange(e)}
          />
        </div>

        {form.imageUrl && (
          <div className="col-md-4">
            <img src={form.imageUrl} width="90" alt="preview" />
          </div>
        )}

        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {form.taglines.map((t, i) => (
          <div className="col-md-4" key={i}>
            <input
              className="form-control"
              placeholder={`Tagline ${i + 1}`}
              value={t}
              onChange={(e) => {
                const updated = [...form.taglines];
                updated[i] = e.target.value;
                setForm({ ...form, taglines: updated });
              }}
            />
          </div>
        ))}

        <div className="col-md-4">
          <label className="text-warning">
            <input
              type="checkbox"
              className="me-2"
              checked={form.badge}
              onChange={(e) =>
                setForm({ ...form, badge: e.target.checked })
              }
            />
            Show Badge
          </label>
        </div>

        <div className="col-12">
          <button
            className="btn"
            style={{ background: "#d4af37", color: "#000" }}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Project"}
          </button>
        </div>
      </form>

      <div className="gold-line"></div>

      {/* FILTER */}
      <select
        className="form-control mb-3"
        value={filterDomain}
        onChange={(e) => setFilterDomain(e.target.value)}
      >
        <option value="all">All Domains</option>
        {domains.map((d) => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </select>

      {/* TABLE */}
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Domain</th>
            <th>Category</th>
            <th>Badge</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProjects.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>
                <img src={p.imageUrl} width="60" alt="project" />
              </td>
              <td>{p.domain?.name}</td>
              <td>{p.category?.name}</td>
              <td>{p.badge ? "Yes" : "No"}</td>
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
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editModal && (
        <div className="modal d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleUpdate}>
                <div className="modal-header">
                  <h5>Edit Project</h5>
                  <button
                    className="btn-close"
                    onClick={() => setEditModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <input
                    className="form-control mb-2"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />

                  <select
                    className="form-control mb-2"
                    value={editForm.domain}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        domain: e.target.value,
                        category: "",
                      })
                    }
                  >
                    <option value="">Select Domain</option>
                    {domains.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="form-control mb-2"
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories
                      .filter((c) => c.domain?._id === editForm.domain)
                      .map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                  </select>

                  <input
                    type="file"
                    className="form-control mb-2"
                    onChange={(e) => handleImageChange(e, true)}
                  />

                  {editForm.imageUrl && (
                    <img src={editForm.imageUrl} width="90" alt="edit" />
                  )}

                  <input
                    className="form-control mb-2"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        description: e.target.value,
                      })
                    }
                  />

                  {editForm.taglines.map((t, i) => (
                    <input
                      key={i}
                      className="form-control mb-2"
                      value={t}
                      onChange={(e) => {
                        const updated = [...editForm.taglines];
                        updated[i] = e.target.value;
                        setEditForm({
                          ...editForm,
                          taglines: updated,
                        });
                      }}
                    />
                  ))}

                  <label>
                    <input
                      type="checkbox"
                      className="me-2"
                      checked={editForm.badge}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          badge: e.target.checked,
                        })
                      }
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
