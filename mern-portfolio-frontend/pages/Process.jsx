import React from "react";

export default function Process() {
  const steps = [
    { name: "Data Received", desc: "Data received from client request." },
    { name: "Understand & Validate", desc: "Understand client request & validate the input." },
    { name: "Estimation", desc: "Estimate project timings & cost." },
    { name: "Concept Design", desc: "Concept design development & client interaction." },
    { name: "Design for Manufacturing", desc: "Develop designs for manufacturing feasibility." },
    { name: "Analysis & Validation", desc: "Analyze the developed part & validate it." },
    { name: "Prototype & Real-Time Part", desc: "Proto build & real-time part development." },
    { name: "Delivery", desc: "Deliver the final part to the client." },
  ];

  const colors = ["#FFD700","#FFB347","#FF6F61","#8BC34A","#4CAF50","#00BCD4","#2196F3","#9C27B0"];
  const radius = 150; // Radius of circle

  return (
    <div className="container py-5" style={{ color: "#EDEDED", fontFamily: "Arial, sans-serif" }}>
      <h2 className="text-center mb-5" style={{ color: "#FFD700", fontWeight: 600 }}>
        Steps We Followed: Design & Development
      </h2>

      <div style={{ position: "relative", width: "400px", height: "400px", margin: "0 auto" }}>
        {steps.map((step, index) => {
          const angle = (360 / steps.length) * index - 90; // Start from top
          const radians = (angle * Math.PI) / 180;
          const x = radius * Math.cos(radians);
          const y = radius * Math.sin(radians);

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px - 60px)`,
                top: `calc(50% + ${y}px - 20px)`,
                width: "120px",
                height: "40px",
                backgroundColor: colors[index],
                color: "#0A0A0A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "0.85rem",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                textAlign: "center",
                padding: "5px",
              }}
            >
              {step.name}
            </div>
          );
        })}

        {steps.map((step, index) => {
          const angle = (360 / steps.length) * index - 90;
          const radians = (angle * Math.PI) / 180;
          const x = (radius + 90) * Math.cos(radians);
          const y = (radius + 90) * Math.sin(radians);
          const textAlign = x >= 0 ? "left" : "right";

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                width: "140px",
                fontSize: "0.8rem",
                color: "#EDEDED",
                textAlign: textAlign,
                transform: x < 0 ? "translateX(-100%)" : "",
              }}
            >
              {step.desc}
            </div>
          );
        })}

        {/* Center circle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#0A0A0A",
            transform: "translate(-50%, -50%)",
            border: "3px solid #FFD700",
          }}
        ></div>
      </div>
    </div>
  );
}

export function DesignStages() {
  const steps = [
    { name: "Design", color: "#2E7D32" },
    { name: "Plan", color: "#388E3C" },
    { name: "Build", color: "#81C784" },
    { name: "Test", color: "#E57373" },
    { name: "Evaluate", color: "#2E7D32" },
  ];

  return (
    <div className="container py-5" style={{ fontFamily: "Arial, sans-serif", color: "#EDEDED" }}>
      <h2 className="mb-4" style={{ fontWeight: 600, color: "#FFD700" }}>Stages of Design</h2>

      <div style={{ display: "flex", alignItems: "center" }}>
        {steps.map((step, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: step.color,
                color: "#fff",
                padding: "12px 20px",
                position: "relative",
                fontWeight: 600,
                clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
                textAlign: "center",
                minWidth: "100px",
              }}
            >
              {step.name}
            </div>
            {index < steps.length - 1 && <div style={{ width: "20px" }}></div>}
          </div>
        ))}
      </div>

      <ul style={{ marginTop: "30px", fontSize: "0.95rem", lineHeight: "1.6" }}>
        <li>Design ideation process</li>
        <li>Design exploration process</li>
        <li>Product development</li>
        <li>Proto Build</li>
        <li>Product Manufacturing</li>
        <li>Homologation</li>
        <li>Product release</li>
      </ul>
    </div>
  );
}
