import React, { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import AOS from 'aos';
import 'aos/dist/aos.css';
import DOMPurify from 'dompurify';
import validator from 'validator';

export default function SendMessage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        domain: "",
        message: "",
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await API.get("/domains");
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch Domain:", err);
                toast.error("Failed to load categories. Please try again later.");
            }
        };

        loadCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Client-side validation
        if (!validator.isEmail(form.email)) {
            toast.error("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        if (form.phone && !validator.isMobilePhone(form.phone)) {
            toast.error("Please enter a valid phone number.");
            setLoading(false);
            return;
        }

        const sanitizedMessage = DOMPurify.sanitize(form.message); // sanitize message

        try {
            await API.post("/quotes", { ...form, message: sanitizedMessage });
            toast.success("Quote submitted successfully!");
            setForm({
                name: "",
                email: "",
                phone: "",
                domain: "",
                message: "",
            });
        } catch (error) {
            toast.error("Failed to submit quote.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({
            duration: 40000,
            easing: "ease-in-out",
            once: false,
        });

        AOS.refreshHard();
    }, []);

    return (
        <div
            data-aos="fade-up"
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
            <h3 style={{ color: "#FFD700", marginBottom: "20px" }}>Get In Touch</h3>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        className="form-control"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="domain" className="form-label">Domain</label>
                    <select
                        id="domain"
                        className="form-control"
                        value={form.domain}
                        onChange={(e) => setForm({ ...form, domain: e.target.value })}
                        required
                        style={{
                            backgroundColor: "#1A1A1A",
                            color: "#FFD700",
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
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                        id="message"
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
                    {loading ? (
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        "Send Message"
                    )}
                </button>
            </form>
        </div>
    );
}
