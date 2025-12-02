export default function Services() {
  const services = [
    { title: "Web Development", desc: "Custom websites using MERN Stack." },
    { title: "App Development", desc: "High-performance Android & iOS apps." },
    { title: "UI / UX Design", desc: "Modern interfaces & clean user flows." },
    { title: "Branding", desc: "Logo, brand identity & product design." },
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4">Our Services</h2>

      <div className="row">
        {services.map((service, i) => (
          <div className="col-md-3 mb-3" key={i}>
            <div className="card h-100 text-center p-3">
              <h5>{service.title}</h5>
              <p className="mt-2">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
