import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faSave, faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Card, Button, Modal, Spinner } from "react-bootstrap";

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
  const [showModal, setShowModal] = useState(false);
  const [domainToDelete, setDomainToDelete] = useState(null);

  // Fetch domains from the API
  const loadDomains = async () => {
    try {
      const res = await API.get("/domains");
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

  // Run on component mount to load domains
  useEffect(() => {
    loadDomains();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error("Only .jpg and .png images are allowed");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setForm({ ...form, imageUrl: reader.result });
  };

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

  const handleDelete = (id) => {
    setDomainToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await API.delete(`/domains/${domainToDelete}`);
      toast.success("Domain deleted");
      loadDomains();
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <Container className="my-4" style={{ minHeight: "100vh", backgroundColor: "#111111" }}>
      <h2 className="mb-4 text-center fw-bold dashboard-title">Manage Domains</h2>

      {/* Domain Form */}
      <form onSubmit={handleSubmit} className="card p-4 mb-4 shadow-sm" style={{ backgroundColor: "#111111", borderRadius: "12px" }}>
        {/* Domain Name */}
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="domainName" className="form-label text-light">Domain Name</label>
            <input 
            id="domainName" 
            className="form-control bg-dark text-light border-0" 
            placeholder="Domain Name" 
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>

          {/* Image Upload */}
          <div className="col-md-4">
            <label htmlFor="imageUpload" className="form-label text-light">Upload Image</label>
            <input id="imageUpload" type="file" accept="image/*" className="form-control bg-dark text-light border-0" onChange={handleImage} />
            {form.imageUrl && (
              <div className="mt-2" style={{ width: 120, height: 120, overflow: "hidden", borderRadius: 12, display: "inline-block" }}>
                <img src={form.imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="preview" />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="form-group mb-3">
            <label htmlFor="description" className="form-label text-light">Description</label>
            <textarea id="description" className="form-control bg-dark text-light border-0" placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          {/* Why Choose Us Points */}
          <div className="form-group mb-3">
            <label className="mb-1 form-label text-light">Why Choose Us</label>
            {form.whyChoose.map((point, index) => (
              <div key={index} className="mb-2 d-flex">
                <input type="text" className="form-control bg-dark text-light border-0" value={point} onChange={(e) => { const newArr = [...form.whyChoose]; newArr[index] = e.target.value; setForm({ ...form, whyChoose: newArr }); }} placeholder={`Point #${index + 1}`} />
                <button type="button" className="btn btn-danger btn-sm" onClick={() => { const newArr = form.whyChoose.filter((_, i) => i !== index); setForm({ ...form, whyChoose: newArr }); }}>&times;</button>
              </div>
            ))}
            <button type="button" className="btn btn-gold mt-3" style={{ width: "150px", padding: "10px", borderRadius: "8px" }} onClick={() => setForm({ ...form, whyChoose: [...form.whyChoose, ""] })}>
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Point
            </button>
          </div>

          {/* Submit / Cancel */}
          <div className="form-group">
            <button type="submit" className="btn btn-gold mt-3" style={{ width: "150px", padding: "10px", borderRadius: "8px" }} disabled={loading}>
              {loading ? (<Spinner animation="border" size="sm" />) : (
                <>
                  <FontAwesomeIcon icon={editId ? faSave : faPlus} className="me-2" />
                  {editId ? "Update" : "Create"}
                </>
              )}
            </button>
            {editId && (
              <button type="button" style={{ width: "120px", padding: "10px", borderRadius: "8px" }} className="btn btn-secondary mt-3 ms-2" onClick={() => { setForm({ name: "", imageUrl: "", description: "", whyChoose: [] }); setEditId(null); }}>
                <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="gold-line"></div>

      {/* Domains Table */}
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
                <td><img src={d.imageUrl} width="50" style={{ borderRadius: 6 }} /></td>
                <td>{d.name}</td>
                <td>{d.description}</td>
                <td>
                  <ul>
                    {d.whyChoose.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2 mb-2" onClick={() => handleEdit(d)} style={{ padding: "5px 10px", borderRadius: "4px" }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d._id)} style={{ padding: "5px 10px", borderRadius: "4px" }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirm Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this domain?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
