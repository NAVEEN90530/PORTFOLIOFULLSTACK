import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

export default function ProjectModal({ showModal, closeModal, selectedProject }) {
  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      centered
      size="lg"
      aria-labelledby="project-modal-title"
      role="dialog" // For better accessibility
    >
      <Modal.Header closeButton style={{ backgroundColor: "#1A1A1A", color: "#FFD700" }}>
        <Modal.Title id="project-modal-title" className="text-center">
          {selectedProject?.name || "Untitled Project"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: "#1A1A1A", color: "#EDEDED" }}>
        {selectedProject ? (
          <>
            {/* Project Image */}
            <img
              src={selectedProject.imageUrl || "/placeholder.png"} // Using fallback image
              alt={selectedProject.name || "Project Image"} // Alt text for accessibility
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />

            {/* DOMAIN & CATEGORY */}
            <div className="mb-2">
              <span
                className="badge text-dark me-2"
                style={{ backgroundColor: "#FFD700" }}
              >
                {selectedProject.domain?.name || "No Domain"}
              </span>
              <span
                className="badge text-dark"
                style={{ backgroundColor: "#FFD700" }}
              >
                {selectedProject.category?.name || "No Category"}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p>{selectedProject.description || "No description available"}</p>

            {/* TAGLINES */}
            {selectedProject.taglines?.length > 0 && (
              <>
                <h6 className="fw-bold mt-3">Technologies:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {selectedProject.taglines.map((tag, idx) => (
                    <span
                      key={idx}
                      className="badge chip text-dark"
                      style={{ backgroundColor: "#FFD700" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Visit Project Button */}
            {selectedProject.projectLink && (
              <div className="mt-3">
                <Button
                  variant="warning"
                  href={selectedProject.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit project website"
                >
                  Visit Project
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
            <p className="mt-2">Loading project details...</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
