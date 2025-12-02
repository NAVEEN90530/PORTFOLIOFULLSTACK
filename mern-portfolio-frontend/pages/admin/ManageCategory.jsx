import React, { useState, useEffect } from "react";
import { listCategories, createCategory, updateCategory, deleteCategory } from "../../api/category";
import { useNavigate } from "react-router-dom";

const CategoryCrudPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch categories on page load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await listCategories();
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  // Handle creating a category
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      // Check if the category already exists (client-side validation)
      if (categories.some((cat) => cat.name.toLowerCase() === name.toLowerCase())) {
        setError("Category with this name already exists");
        return;
      }

      // Create category
      const createdCategory = await createCategory({ name });
      setCategories([...categories, createdCategory]);
      setName("");
      setError("");
    } catch (err) {
      setError("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting a category for editing
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setName(category.name);
  };

  // Handle updating a category
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      // Update category
      const updatedCategory = await updateCategory(selectedCategory._id, { name });
      setCategories(categories.map((cat) => (cat._id === updatedCategory._id ? updatedCategory : cat)));
      setSelectedCategory(null);
      setName("");
      setError("");
    } catch (err) {
      setError("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true);
      try {
        await deleteCategory(id);
        setCategories(categories.filter((cat) => cat._id !== id));
      } catch (err) {
        setError("Failed to delete category");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container py-4" >
      <h1 className="mb-4 text-center">{selectedCategory ? "Edit" : "Create"} Category</h1>

      {/* Display Error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Category Form */}
      <form onSubmit={selectedCategory ? handleUpdate : handleCreate}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (selectedCategory ? "Saving..." : "Creating...") : selectedCategory ? "Save Changes" : "Create Category"}
        </button>
        {selectedCategory && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setSelectedCategory(null);
              setName(""); // Reset form when canceling edit
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr className="my-5" />

      {/* Display Categories */}
      <h2>Category List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(category)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(category._id)}>
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
