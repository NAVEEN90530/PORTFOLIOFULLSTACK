import React, { useRef, useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Upload, FileText, Box, Scan, Download, Truck } from "lucide-react";
import "../src/AuroxHowWeWork.css";


const steps = [
  {
    id: "01",
    title: "Share photos ,Scan data, concept or other detail",
    desc: "Upload clear photos from multiple angles. Include key dimensions or CAD files to help us understand the geometry accurately.",
    icon: <Upload size={28} />,
  },
  {
    id: "02",
    title: "We prepare a quote",
    desc: "Based on your requirements, tolerances, and timeline, we prepare a transparent quote for your approval.",
    icon: <FileText size={28} />,
  },
  {
    id: "03",
    title: "we share initial Concept design for approval",
    desc: "Send the physical part to our facility or let our team perform on-site high-accuracy 3D scanning.",
    icon: <Box size={28} />,
  },
  {
    id: "04",
    title: "Based on the confirmation will share the final design & data with manufacturing feasibility (injection molding, sheet metal & 3D printing)",
    desc: "We 3D scan the parts and prepare precise CAD data in formats like STL, STEP, IGES, or X_T.",
    icon: <Scan size={28} />,
  },
  {
    id: "05",
    title: "Further development of Prototype model with functionality",
    desc: "Receive a secure download link along with a detailed project report via email.",
    icon: <Download size={28} />,
  },
  {
    id: "06",
    title: "CAD data & drawings prepare for production.",
    desc: "After successful completion, the parts are safely shipped back to your location.",
    icon: <Truck size={28} />,
  },
];

export default function AuroxHowWeWork() {
  // ✅ HOOKS MUST BE HERE
  const stepRefs = useRef([]);
  const progressFillRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // ✅ SCROLL LOGIC
  useEffect(() => {
  const handleScroll = () => {
    let currentStep = 0;

    stepRefs.current.forEach((step, index) => {
      if (!step) return;

      const rect = step.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6) {
        currentStep = index;
      }
    });

    setActiveStep(currentStep);

    if (progressFillRef.current && stepRefs.current[currentStep]) {
      const containerTop =
        stepRefs.current[0].getBoundingClientRect().top + window.scrollY;

      const currentTop =
        stepRefs.current[currentStep].getBoundingClientRect().top +
        window.scrollY;

      progressFillRef.current.style.height =
        currentTop - containerTop + 14 + "px";
    }
  };

  handleScroll(); // run once on load
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <section className="aurox-work-section">
      <Container>
        <h2 className="aurox-title mb-4 text-center">How We Work</h2>
       

        <div className="aurox-progress-wrapper mt-4">
          {/* Vertical Line */}
          <div className="aurox-progress-line">
            <div
              className="aurox-progress-fill"
              ref={progressFillRef}
            />
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepRefs.current[index] = el)}
              className={`aurox-process-step ${
                activeStep >= index ? "active" : ""
              }`}
            >
              <div className="row">
                <div className="col-2 process-bar">
                  <div className="process-icon">{step.icon}</div>
                </div>

                <div className="col-10 process-content">
                  {/* <span className="step-number">{step.id}</span> */}
                  <h4 className="aurox-step-title">{step.title}</h4>
                  {/* <p className="aurox-step-desc">{step.desc}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
