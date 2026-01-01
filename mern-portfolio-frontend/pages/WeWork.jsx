import React, { useRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  Upload,
  FileText,
  Lightbulb,
  Factory,
  Wrench,
  FileSignature,
} from "lucide-react";
import "../src/AuroxHowWeWork.css";

const steps = [
  {
    id: "01",
    title: "Share photos, scan data, concept or other details",
    desc:
      "Upload clear photos from multiple angles, scan data, sketches, or CAD files to help us understand your requirements accurately.",
    icon: <Upload size={26} />,
  },
  {
    id: "02",
    title: "We prepare a quote",
    desc:
      "Based on your requirements, tolerances, and timelines, we provide a transparent and competitive quotation.",
    icon: <FileText size={26} />,
  },
  {
    id: "03",
    title: "We share initial concept design for approval",
    desc:
      "Our design team prepares and shares the initial concept design for your review and confirmation.",
    icon: <Lightbulb size={26} />,
  },
  {
    id: "04",
    title: "Final design & data with manufacturing feasibility",
    desc:
      "After approval, we deliver the final design along with manufacturing feasibility for injection molding, sheet metal, and 3D printing.",
    icon: <Factory size={26} />,
  },
  {
    id: "05",
    title: "Further development of prototype model with functionality",
    desc:
      "We develop a functional prototype to validate the design, performance, and usability.",
    icon: <Wrench size={26} />,
  },
  {
    id: "06",
    title: "CAD data & drawings prepared for production",
    desc:
      "Complete production-ready CAD data and detailed technical drawings are delivered for manufacturing.",
    icon: <FileSignature size={26} />,
  },
];

export default function AuroxHowWeWork() {
  const stepRefs = useRef([]);
  const progressFillRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let currentStep = 0;

      stepRefs.current.forEach((step, index) => {
        if (!step) return;
        const rect = step.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.65) {
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

        const height = Math.max(0, currentTop - containerTop + 18);
        progressFillRef.current.style.height = `${height}px`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="aurox-work-section">
      <Container>
        <h2 className="aurox-title text-center mb-5">How We Work</h2>

        <div className="aurox-progress-wrapper">
          {/* Vertical Line */}
          <div className="aurox-progress-line">
            <div
              className="aurox-progress-fill"
              ref={progressFillRef}
            />
          </div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => (stepRefs.current[index] = el)}
              className={`aurox-process-step ${
                activeStep >= index ? "active" : ""
              }`}
            >
              <div className="row align-items-start">
                <div className="col-2 process-bar">
                  <div className="process-icon">{step.icon}</div>
                </div>

                <div className="col-10 process-content">
                  <h4 className="aurox-step-title">{step.title}</h4>
                  <p className="aurox-step-desc">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
