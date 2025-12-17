import { useEffect, useState } from "react";
import API from "../api/api";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    API.get("/testimonials")
      .then(res => setTestimonials(res.data))
      .catch(() => { });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 40000,
      easing: "ease-in-out",
      once: false,
    });
  
    AOS.refreshHard(); 
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <div  data-aos="fade-up" className="container py-5">
      <h2 className="text-center mb-4" style={{ color: "#FFD700" }}>
        What Our Clients Says
      </h2>

      <div
        id="testimonialCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000" // autoplay every 3 seconds
      >
        <div className="carousel-inner">
          {testimonials.map((t, idx) => (
            <div
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
              key={t._id}
            >
              <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <p className="fs-5 mb-3">"{t.content}"</p>
                <h5 className="mb-1">{t.name}</h5>
                <h6 className="text-secondary">{t.companyName}</h6>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >

          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >

          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
