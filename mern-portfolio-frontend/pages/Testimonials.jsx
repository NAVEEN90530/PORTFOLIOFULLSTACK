import { useEffect, useState } from "react";
import API from "../api/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    API.get("/testimonials")
      .then(res => setTestimonials(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="container py-5">
      <h2>Client Testimonials</h2>

      <div className="row mt-4">
        {testimonials.map(t => (
          <div className="col-md-4 mb-3" key={t._id}>
            <div className="card p-3 h-100">
              <p>"{t.content}"</p>
              <h2 className="mt-auto">– {t.name}</h2>
              <h6>{t.companyName}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
