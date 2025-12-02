import { useEffect, useState } from "react";
import API from "../../api/api.js";

export default function ManageContact() {
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    address: ""
  });

  // Load contact info
  const loadContact = () => {
    API.get("/settings").then((res) => {
      if (res.data && res.data.contact) {
        setContact(res.data.contact);
      }
    });
  };

  useEffect(() => {
    loadContact();
  }, []);

  // Update contact info
  const updateContact = async (e) => {
    e.preventDefault();
    try {
      await API.put("/settings/contact", contact); // ✅ correct path
      loadContact();
    } catch (err) {
      console.error("Failed to update contact:", err);
    }
  };


  return (
    <div className="container py-4">
      <h2>Manage Contact Information</h2>

      <form className="d-flex mt-3" onSubmit={updateContact}>
        <input
          className="form-control me-2"
          placeholder="Email"
          value={contact.email}
          onChange={(e) =>
            setContact({ ...contact, email: e.target.value })
          }
        />
        <input
          className="form-control me-2"
          placeholder="Phone"
          value={contact.phone}
          onChange={(e) =>
            setContact({ ...contact, phone: e.target.value })
          }
        />
        <input
          className="form-control me-2"
          placeholder="Address"
          value={contact.address}
          onChange={(e) =>
            setContact({ ...contact, address: e.target.value })
          }
        />

        <button className="btn btn-primary">Save</button>
      </form>

      <hr />

      <div className="mt-3">
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Address:</strong> {contact.address}</p>
      </div>
    </div>
  );
}
