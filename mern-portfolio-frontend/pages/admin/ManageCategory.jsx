import { useEffect, useState } from "react";
import {
  listCategories,
  listDomainCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/category";
import { listDomains } from "../../api/domain";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import DOMPurify from "dompurify"; // 👈 Import DOMPurify

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [domains, setDomains] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [filterDomain, setFilterDomain] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchDomains();
    fetchCategories();
  }, []);

  const fetchDomains = async () => {
    try {
      const data = await listDomains();
      setDomains(data);
    } catch {
      toast.error("Failed to load domains");
    }
  };

  const fetchCategories = async (domainId = "") => {
    try {
      const data = domainId
        ? await listDomainCategories(domainId)
        : await listCategories();

      setCategories(data);
      const names = data.map((c) => ({ _id: c._id, name: c.name }));
      setCategoryOptions(names);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error("Only JPEG and PNG images are allowed.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size should not exceed 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize user inputs before submitting
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedDescription = DOMPurify.sanitize(description);

    if (!sanitizedName || !domain || (!imageUrl && !editingId)) {
      toast.error("All fields required");
      return;
    }

    try {
      const payload = { name: sanitizedName, domain, imageUrl, description: sanitizedDescription };
      if (editingId) {
        await updateCategory(editingId, payload);
        toast.success("Category updated");
      } else {
        await createCategory(payload);
        toast.success("Category created");
      }
      resetForm();
      fetchCategories(filterDomain);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const resetForm = () => {
    setName("");
    setDomain("");
    setImageUrl("");
    setDescription("");
    setPreview("");
    setEditingId(null);
    setFilterCategory(""); // Reset category filter
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
    setDomain(cat.domain._id);
    setImageUrl(cat.imageUrl);
    setDescription(cat.description || "");
    setPreview(cat.imageUrl);
  };

  const handleDelete = (id) => {
    setCategoryToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(categoryToDelete);
      toast.success("Category deleted");
      fetchCategories(filterDomain);
    } catch {
      toast.error("Failed to delete category");
    } finally {
      setShowModal(false);
    }
  };

  const handleFilterDomainChange = (e) => {
    const selected = e.target.value;
    setFilterDomain(selected);
    setFilterCategory("");
    fetchCategories(selected);
  };

  const handleFilterCategoryChange = (e) => {
    const selected = e.target.value;
    setFilterCategory(selected);

    if (selected) {
      const filtered = categories.filter((cat) => cat._id === selected);
      setCategories(filtered);
    } else {
      fetchCategories(filterDomain);
    }
  };

  return (
    <div className="container my-4" style={{ minHeight: "100vh", backgroundColor: "#111111" }}>
      <h2 className="mb-4 text-center fw-bold dashboard-title">Manage Categories</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-4 mb-4 shadow-sm" style={{ backgroundColor: "#111111", borderRadius: "12px" }}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label text-light">Category Name</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label text-light">Domain</label>
            <select
              className="form-control bg-dark text-light border-0"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
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
            <label className="form-label text-light">Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control bg-dark text-light border-0"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label text-light">Description</label>
            <textarea
              className="form-control bg-dark text-light border-0"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {preview && (
          <div
            className="mt-2"
            style={{
              width: 120,
              height: 120,
              overflow: "hidden",
              borderRadius: 12,
              display: "inline-block",
            }}
          >
            <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Button with Icons */}
        <button
          type="submit"
          className="btn btn-gold mt-3"
          style={{ width: "150px", padding: "10px", borderRadius: "8px" }}
        >
          <FontAwesomeIcon icon={editingId ? faSave : faPlus} className="me-2" />
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary mt-3 ms-2"
            onClick={resetForm}
            style={{ width: "120px", padding: "10px", borderRadius: "8px" }}
          >
            <FontAwesomeIcon icon={faTimes} className="me-2" />
            Cancel
          </button>
        )}
      </form>

      <div className="gold-line"></div>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-3 mb-2">
          <label className="form-label text-light">Filter by Domain:</label>
          <select
            className="form-control bg-dark text-light border-0"
            value={filterDomain}
            onChange={handleFilterDomainChange}
            style={{ padding: "10px", borderRadius: "8px" }}
          >
            <option value="">All Domains</option>
            {domains.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 mb-2">
          <label className="form-label text-light">Filter by Category:</label>
          <select
            className="form-control bg-dark text-light border-0"
            value={filterCategory}
            onChange={handleFilterCategoryChange}
            style={{ padding: "10px", borderRadius: "8px" }}
          >
            <option value="">All Categories</option>
            {categoryOptions.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="gold-line"></div>

      {/* Category Table */}
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle">
          <thead>
            <tr>
              <th>Image</th>
              <th>Categories</th>
              <th>Description</th>
              <th>Domain</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat._id}>
                  <td>
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      style={{ width: 60, borderRadius: 6 }}
                    />
                  </td>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>{cat.domain?.name}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2 mb-2"
                      onClick={() => handleEdit(cat)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "4px",
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(cat._id)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "4px",
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageCategory;
