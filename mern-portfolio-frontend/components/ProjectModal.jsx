import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ProjectModal({ showModal, closeModal, selectedProject }) {
  return (
    <Modal show={showModal} onHide={closeModal} centered size="lg">
      <Modal.Header closeButton style={{ backgroundColor: "#1A1A1A", color: "#FFD700" }}>
        <Modal.Title>{selectedProject?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: "#1A1A1A", color: "#EDEDED" }}>
        {selectedProject && (
          <>
            <img
              src={selectedProject.imageUrl || "/placeholder.png"}
              alt={selectedProject.name}
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
                >
                  Visit Project
                </Button>
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
