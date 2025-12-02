import { useEffect, useState } from "react";
import API from "../api/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container py-5">
      <h2>Our Projects</h2>

      <div className="row mt-4">
        {projects.map((p) => (
          <div className="col-md-4 p-4 mb-3" key={p._id}>
            <div className="card h-100">
              
              <div className="card-body">
                <h5>{p.name}</h5>
                <img src={p.imageUrl} className="card-img-top" alt={p.name} />
                {/* If category is just an ID, you can remove or show ID for now */}
                <p>{p.description?.substring(0, 100)}...</p>
                {p.taglines?.length > 0 && (
                  <ul >
                    {p.taglines.map((tag, idx) => (
                      <li  key={idx} className="badge ms-4 rounded-pill bg-primary" >{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
