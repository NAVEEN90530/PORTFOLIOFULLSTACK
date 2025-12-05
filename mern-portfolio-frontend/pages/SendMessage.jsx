import React, { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";


export default function SendMessage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        category: "",
        message: "",
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false); // ✅ loading state

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await API.get("/categery");
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };

        loadCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading
        try {
            await API.post("/quotes", form);
            toast.success("Quote submitted successfully!");
            setForm({
                name: "",
                email: "",
                phone: "",
                category: "",
                message: "",
            });
        } catch (error) {
            toast.error("Failed to submit quote.");
        } finally {
            setLoading(false); // stop loading
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                flex: "1 1 300px",
                maxWidth: "600px",
                backgroundColor: "#1A1A1A",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "2px 4px 12px #FFD700",
                margin: "0 auto",
            }}

        >
            <h3 style={{ color: "#FFD700", marginBottom: "20px" }}>Send a Message</h3>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        className="form-control"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        required
                        style={{
                            backgroundColor: "#1A1A1A", // dark background
                            color: "#FFD700",           // gold text
                            padding: "8px",
                            outline: "none",
                        }}
                    >
                        <option value="" style={{ color: "#999" }}>Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat.name} style={{ color: "#FFD700", backgroundColor: "#1A1A1A" }}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                        rows="5"
                        className="form-control"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn-submit btn btn-pill"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>

            </form>
        </div>
    );
}
