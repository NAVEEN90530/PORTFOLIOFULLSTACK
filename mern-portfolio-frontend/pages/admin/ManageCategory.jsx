import React, { useState, useEffect } from "react";
import { listCategories, createCategory, updateCategory, deleteCategory } from "../../api/category";
import { toast } from "react-toastify";

const CategoryCrudPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await listCategories();
        setCategories(data);
      } catch (err) {
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.warning("Category name cannot be empty");

    setLoading(true);
    try {
      if (categories.some((cat) => cat.name.toLowerCase() === name.toLowerCase())) {
        toast.warning("Category already exists!");
        return;
      }

      const createdCategory = await createCategory({ name });
      setCategories([...categories, createdCategory]);
      setName("");
      toast.success("Category created successfully!");
    } catch (err) {
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setName(category.name);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.warning("Category cannot be empty");

    setLoading(true);
    try {
      const updatedCategory = await updateCategory(selectedCategory._id, { name });
      setCategories(categories.map((cat) => (cat._id === updatedCategory._id ? updatedCategory : cat)));
      setSelectedCategory(null);
      setName("");

      toast.success("Category updated!");
    } catch (err) {
      toast.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    setLoading(true);
    try {
      await deleteCategory(id);
      setCategories(categories.filter((cat) => cat._id !== id));

      toast.success("Category deleted!");
    } catch (err) {
      toast.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ marginLeft: "260px" }}>
      <h1 className="text-center mb-4" style={{ color: "var(--button-gold)" }}>
        {selectedCategory ? "Edit Category" : "Create Category"}
      </h1>

      {/* Form Card */}
      <div
        className="p-4 mb-5"
        style={{
          background: "#1A1A1A",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(212,175,55,0.2)",
          maxWidth: "600px",
          margin: "0 auto",
          border: "1px solid var(--button-gold)",
        }}
      >
        <form onSubmit={selectedCategory ? handleUpdate : handleCreate}>
          <label className="form-label" style={{ color: "var(--button-gold)" }}>
            Category Name
          </label>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter category..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              backgroundColor: "#0F0F0F",
              color: "#fff",
              border: "1px solid var(--button-gold)",
            }}
          />

          <button
            type="submit"
            className="btn w-100"
            disabled={loading}
            style={{
              backgroundColor: "var(--button-gold)",
              color: "#0A0A0A",
              fontWeight: 600,
              transition: "0.3s",
            }}
          >
            {loading
              ? selectedCategory
                ? "Saving..."
                : "Creating..."
              : selectedCategory
              ? "Save Changes"
              : "Create Category"}
          </button>

          {selectedCategory && (
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={() => {
                setSelectedCategory(null);
                setName("");
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Category Table */}
      <h2 style={{ color: "var(--button-gold)" }}>Category List</h2>

      <table
        className="table table-dark table-striped"
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid var(--button-gold)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#000" }}>
            <th style={{ color: "var(--button-gold)" }}>Name</th>
            <th style={{ color: "var(--button-gold)" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(category._id)}
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

export default CategoryCrudPage;
