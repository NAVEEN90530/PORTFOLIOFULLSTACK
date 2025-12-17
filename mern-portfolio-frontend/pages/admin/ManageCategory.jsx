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

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !domain || (!imageUrl && !editingId)) {
      toast.error("All fields required");
      return;
    }

    try {
      const payload = { name, domain, imageUrl, description };
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
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
    setDomain(cat.domain._id);
    setImageUrl(cat.imageUrl);
    setDescription(cat.description || "");
    setPreview(cat.imageUrl);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      fetchCategories(filterDomain);
    } catch {
      toast.error("Failed to delete category");
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
    <div className="container mt-4">
      <h2 className="mb-4">Manage Categories</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label>Category Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label>Domain</label>
            <select
              className="form-control"
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
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-md-12">
            <label>Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-3"
            style={{ width: 120, borderRadius: 8 }}
          />
        )}

        <button className="btn btn-dark mt-3">
          {editingId ? "Update Category" : "Add Category"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>

      {/* FILTERS */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Filter by Domain:</label>
          <select
            className="form-control"
            value={filterDomain}
            onChange={handleFilterDomainChange}
          >
            <option value="">All Domains</option>
            {domains.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label>Filter by Category:</label>
          <select
            className="form-control"
            value={filterCategory}
            onChange={handleFilterCategoryChange}
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

      {/* CATEGORY LIST */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Domain</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
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
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(cat)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(cat._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategory;
