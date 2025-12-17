import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";

export default function ManageDomain() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    whyChoose: [],
  });

  const [editId, setEditId] = useState(null);

  /* ---------------- LOAD DOMAINS ---------------- */
  const loadDomains = async () => {
    try {
      const res = await API.get("/domains");
      // Convert any old string whyChoose to array
      const data = res.data.map((d) => ({
        ...d,
        whyChoose: Array.isArray(d.whyChoose)
          ? d.whyChoose
          : typeof d.whyChoose === "string"
          ? d.whyChoose.split("\n").filter(Boolean)
          : [],
      }));
      setDomains(data);
    } catch {
      toast.error("Failed to load domains");
    }
  };

  useEffect(() => {
    loadDomains();
  }, []);

  /* ---------------- BASE64 IMAGE ---------------- */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setForm({ ...form, imageUrl: reader.result });
  };

  /* ---------------- CREATE / UPDATE ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || (!form.imageUrl && !editId)) {
      return toast.warning("Name & image required");
    }

    setLoading(true);

    try {
      if (editId) {
        await API.put(`/domains/${editId}`, form);
        toast.success("Domain updated");
      } else {
        await API.post("/domains", form);
        toast.success("Domain created");
      }

      setForm({ name: "", imageUrl: "", description: "", whyChoose: [] });
      setEditId(null);
      loadDomains();
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (domain) => {
    setEditId(domain._id);
    setForm({
      name: domain.name,
      imageUrl: domain.imageUrl,
      description: domain.description || "",
      whyChoose: Array.isArray(domain.whyChoose)
        ? domain.whyChoose
        : typeof domain.whyChoose === "string"
        ? domain.whyChoose.split("\n").filter(Boolean)
        : [],
    });
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this domain?")) return;

    try {
      await API.delete(`/domains/${id}`);
      toast.success("Domain deleted");
      loadDomains();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="container py-4" style={{ marginLeft: "260px" }}>
      <h2 style={{ color: "#D4AF37" }}>Manage Domains</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-4 mb-4"
        style={{
          background: "#111",
          border: "1px solid #D4AF37",
          borderRadius: "10px",
          maxWidth: "600px",
        }}
      >
        {/* Domain Name */}
        <input
          className="form-control mb-3"
          placeholder="Domain Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ borderColor: "#D4AF37" }}
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={handleImage}
        />
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="preview"
            width="80"
            className="mb-3"
            style={{ borderRadius: "6px" }}
          />
        )}

        {/* Description */}
        <textarea
          className="form-control mb-3"
          placeholder="Description"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ borderColor: "#D4AF37" }}
        />

        {/* Why Choose Points */}
        <label className="mb-1">Why Choose Us</label>
        {form.whyChoose.map((point, index) => (
          <div key={index} className="mb-2 d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={point}
              onChange={(e) => {
                const newArr = [...form.whyChoose];
                newArr[index] = e.target.value;
                setForm({ ...form, whyChoose: newArr });
              }}
              placeholder={`Point #${index + 1}`}
            />
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => {
                const newArr = form.whyChoose.filter((_, i) => i !== index);
                setForm({ ...form, whyChoose: newArr });
              }}
            >
              &times;
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary btn-sm mb-3"
          onClick={() =>
            setForm({ ...form, whyChoose: [...form.whyChoose, ""] })
          }
        >
          Add Point
        </button>

        {/* Submit / Cancel */}
        <button
          className="btn w-100"
          disabled={loading}
          style={{
            background: "#D4AF37",
            color: "#000",
            fontWeight: "600",
          }}
        >
          {loading
            ? "Saving..."
            : editId
            ? "Update Domain"
            : "Create Domain"}
        </button>

        {editId && (
          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={() =>
              setForm({ name: "", imageUrl: "", description: "", whyChoose: [] }) ||
              setEditId(null)
            }
          >
            Cancel
          </button>
        )}
      </form>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Why Choose Us</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((d) => (
              <tr key={d._id}>
                <td>
                  <img src={d.imageUrl} width="50" style={{ borderRadius: 6 }} />
                </td>
                <td>{d.name}</td>
                <td style={{ maxWidth: "300px", whiteSpace: "pre-wrap" }}>
                  {d.description}
                </td>
                <td style={{ maxWidth: "300px" }}>
                  <ul style={{ paddingLeft: "18px", marginBottom: 0 }}>
                    {(Array.isArray(d.whyChoose)
                      ? d.whyChoose
                      : typeof d.whyChoose === "string"
                      ? d.whyChoose.split("\n").filter(Boolean)
                      : []
                    ).map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(d._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
