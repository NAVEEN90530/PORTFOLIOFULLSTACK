import React, { useState } from "react";

// Step-by-Step Process Timeline

export default function Process() {
  const steps = [
    { name: "Data Received", desc: "Client request received and logged." },
    { name: "Understand & Validate", desc: "Understand client request & validate the input." },
    { name: "Estimation", desc: "Estimate project timings & cost." },
    { name: "Concept Design", desc: "Concept design development & interaction with the client." },
    { name: "Design for Manufacturing", desc: "Designs developed for manufacturing feasibility (injection molding, sheet metal, 3D printing)." },
    { name: "Analysis & Validation", desc: "Analyze the developed part & validate it." },
    { name: "Prototype & Real-Time Part", desc: "Proto build & real-time part development." },
    { name: "Delivery", desc: "Deliver the final part to the client." },
  ];

  return (
    <div className="container py-5" style={{ fontFamily: "Arial, sans-serif" }}>
      <h2 className="text-center mb-4" style={{ color: "#FFD700", fontWeight: 600 }}>
        Design Process Breakdown
      </h2>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {steps.map((step, index) => (
          <div key={index} className="timeline-step" style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              position: 'relative',
              paddingLeft: '25px',
              borderLeft: '2px solid #FFD700'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-12px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#FFD700',
                border: '3px solid #0A0A0A'
              }}></div>
              <h4 style={{ color: '#FFD700', fontWeight: '600' }}>{step.name}</h4>
              <p style={{ color: '#EDEDED' }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// Circular Process Flow (Radial)

// import React from "react";

// export default function Process() {
//   const steps = [
//     { name: "Data Received", desc: "Client request received and logged." },
//     { name: "Understand & Validate", desc: "Understand client request & validate the input." },
//     { name: "Estimation", desc: "Estimate project timings & cost." },
//     { name: "Concept Design", desc: "Concept design development & interaction with the client." },
//     { name: "Design for Manufacturing", desc: "Designs developed for manufacturing feasibility (injection molding, sheet metal, 3D printing)." },
//     { name: "Analysis & Validation", desc: "Analyze the developed part & validate it." },
//     { name: "Prototype & Real-Time Part", desc: "Proto build & real-time part development." },
//     { name: "Delivery", desc: "Deliver the final part to the client." },
//   ];

//   const radius = 150;
//   const colors = [
//   "#FFD700", 
//   "#FFCC00", 
//   "#FFB800", 
//   "#F2A900", 
//   "#E5A900", 
//   "#D49F00", 
//   "#C89F00", 
//   "#B59C00"  
// ];

//   return (
//     <div className="container py-5" style={{ fontFamily: "Arial, sans-serif" }}>
//       <h2 className="text-center mb-4" style={{ color: "#FFD700", fontWeight: 600 }}>
//         Design Process Breakdown
//       </h2>

//       <div style={{ position: "relative", width: "400px", height: "400px", margin: "0 auto" }}>
//         {steps.map((step, index) => {
//           const angle = (360 / steps.length) * index - 90;
//           const radians = (angle * Math.PI) / 180;
//           const x = radius * Math.cos(radians);
//           const y = radius * Math.sin(radians);

//           return (
//             <div
//               key={index}
//               style={{
//                 position: "absolute",
//                 left: `calc(50% + ${x}px - 60px)`,
//                 top: `calc(50% + ${y}px - 20px)`,
//                 width: "120px",
//                 height: "40px",
//                 backgroundColor: colors[index],
//                 color: "#0A0A0A",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: 600,
//                 fontSize: "0.85rem",
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
//                 textAlign: "center",
//                 padding: "5px",
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 cursor: "pointer",
//               }}
//               title={step.desc}
//               onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
//               onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//             >
//               {step.name}
//             </div>
//           );
//         })}
//         {/* Center Circle */}
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             width: "50px",
//             height: "50px",
//             borderRadius: "50%",
//             backgroundColor: "#0A0A0A",
//             transform: "translate(-50%, -50%)",
//             border: "3px solid #FFD700",
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// }




// Accordion Steps (Expandable Descriptions)

// import React, { useState } from 'react';

// export default function Process() {
//   const [activeIndex, setActiveIndex] = useState(null);
  
//   const steps = [
//     { name: "Data Received", desc: "Client request received and logged." },
//     { name: "Understand & Validate", desc: "Understand client request & validate the input." },
//     { name: "Estimation", desc: "Estimate project timings & cost." },
//     { name: "Concept Design", desc: "Concept design development & interaction with the client." },
//     { name: "Design for Manufacturing", desc: "Designs developed for manufacturing feasibility (injection molding, sheet metal, 3D printing)." },
//     { name: "Analysis & Validation", desc: "Analyze the developed part & validate it." },
//     { name: "Prototype & Real-Time Part", desc: "Proto build & real-time part development." },
//     { name: "Delivery", desc: "Deliver the final part to the client." },
//   ];

//   return (
//     <div className="container py-5" style={{ fontFamily: "Arial, sans-serif" }}>
//       <h2 className="text-center mb-4" style={{ color: "#FFD700", fontWeight: 600 }}>
//         Design Process Breakdown
//       </h2>

//       <div className="accordion">
//         {steps.map((step, index) => (
//           <div key={index}>
//             <div 
//               onClick={() => setActiveIndex(activeIndex === index ? null : index)}
//               style={{ 
//                 backgroundColor: '#FFD700', 
//                 color: '#0A0A0A', 
//                 padding: '15px', 
//                 fontSize: '1.1rem', 
//                 fontWeight: 600, 
//                 cursor: 'pointer', 
//                 borderBottom: '2px solid #0A0A0A' 
//               }}>
//               {step.name}
//             </div>
//             {activeIndex === index && (
//               <div style={{ padding: '15px', backgroundColor: '#333', color: '#EDEDED' }}>
//                 {step.desc}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// donut-chart

// import React from "react";
// import DonutChart from "react-donut-chart";

// export default function Process() {
//   // Steps with labels and values
//   const steps = [
//     { label: "Data Received", value: 10, desc: "Client request received and logged." },
//     { label: "Understand & Validate", value: 15, desc: "Understand client request & validate the input." },
//     { label: "Estimation", value: 12, desc: "Estimate project timings & cost." },
//     { label: "Concept Design", value: 14, desc: "Concept design development & interaction with the client." },
//     { label: "Design for Manufacturing", value: 16, desc: "Based on the confirmation, designs will be developed for manufacturing feasibility (injection molding, sheet metal, & 3D printing)." },
//     { label: "Analysis & Validation", value: 13, desc: "Analyze the developed part & validate it." },
//     { label: "Prototype & Real-Time Part", value: 10, desc: "Proto build & real-time part development." },
//     { label: "Delivery", value: 10, desc: "Deliver the final part to the client." },
//   ];

//   return (
//     <div className="container py-5" style={{ fontFamily: "Arial, sans-serif" }}>
//       <h2 className="text-center mb-4" style={{ color: "#FFD700", fontWeight: 600 }}>
//         Design Process Breakdown
//       </h2>

//       <div style={{ width: "300px", margin: "0 auto" }}>
//         <DonutChart
//           data={steps}
//           colors={["#2E7D32", "#388E3C", "#81C784", "#E57373", "#2E7D32", "#FF7043", "#039BE5", "#9C27B0"]}
//           legend={true}
//           legendPosition="right"
//           clickToggle={false}
//           style={{ color: "#FFFFFF" }}  
//         />
//       </div>

//       {/* Optional: Display descriptions below the chart */}
//       <div className="step-descriptions" style={{ marginTop: "20px", color: "#EDEDED" }}>
//         {steps.map((step, index) => (
//           <div key={index} style={{ marginBottom: "10px" }}>
//             <h4>{step.label}</h4>
//             <p>{step.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import React from "react";
// import DonutChart from "react-donut-chart";

// export default function Process4() {
//   // Steps with labels and values (value is for chart calculations, not for display)
//   const steps = [
//     { label: "Data Received", value: 12.5, desc: "Client request received and logged." },
//     { label: "Understand & Validate", value: 12.5, desc: "Understand client request & validate the input." },
//     { label: "Estimation", value: 12.5, desc: "Estimate project timings & cost." },
//     { label: "Concept Design", value: 12.5, desc: "Concept design development & interaction with the client." },
//     { label: "Design for Manufacturing", value: 12.5, desc: "Based on the confirmation, designs will be developed for manufacturing feasibility (injection molding, sheet metal, & 3D printing)." },
//     { label: "Analysis & Validation", value: 12.5, desc: "Analyze the developed part & validate it." },
//     { label: "Prototype & Real-Time Part", value: 12.5, desc: "Proto build & real-time part development." },
//     { label: "Delivery", value: 12.5, desc: "Deliver the final part to the client." },
//   ];

//   return (
//     <div className="container py-5" style={{ fontFamily: "Arial, sans-serif" }}>
//       <h2 className="text-center mb-4" style={{ color: "#FFD700", fontWeight: 600 }}>
//         Design Process Breakdown
//       </h2>

//       <div style={{ width: "300px", margin: "0 auto" }}>
//         <DonutChart
//           data={steps}
//           colors={[
//   "#FFD700", // Bright Gold
//   "#FFCC00", // Rich Gold
//   "#FFB800", // Deep Gold
//   "#F2A900", // Mustard Gold
//   "#E5A900", // Goldenrod
//   "#D49F00", // Darker Gold
//   "#C89F00", // Warm Gold
//   "#B59C00"  // Antique Gold
// ]}
//           legend={true}
//           legendPosition="right"
//           clickToggle={false}
//           style={{ color: "#FFFFFF" }}
//         />
//       </div>

//       {/* Optional: Display descriptions below the chart */}
//       <div className="step-descriptions" style={{ marginTop: "20px", color: "#EDEDED" }}>
//         {steps.map((step, index) => (
//           <div key={index} style={{ marginBottom: "10px" }}>
//             <h4>{step.label}</h4>
//             <p>{step.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


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
      <div className="gold-line"></div>
      <h2 className="mb-4" style={{ fontWeight: 600, color: "#FFD700" }}>Stages of Design</h2>

      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
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
                transition: "transform 0.3s",
                cursor: "default",
              }}
              title={step.name}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
