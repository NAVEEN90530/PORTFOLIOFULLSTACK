import React from "react";
import { Modal } from "react-bootstrap";

export default function ProjectModal({ showModal, closeModal, selectedProject }) {
  return (
    <Modal show={showModal} onHide={closeModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{selectedProject?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {selectedProject && (
          <>
            <img
              src={selectedProject.imageUrl}
              alt={selectedProject.name}
              className="img-fluid rounded mb-3"
            />
            <h6 className="fw-bold text-warning mb-2">
              {selectedProject.category?.name}
            </h6>
            <p>{selectedProject.description}</p>
            <h6 className="fw-bold mt-3">Technologies:</h6>
            <div className="d-flex flex-wrap gap-2">
              {selectedProject.taglines?.map((tag, idx) => (
                <span key={idx} className="badge chip text-white">
                  {tag}
                </span>
              ))}
            </div>

            {selectedProject.projectLink && (
              <a
                href={selectedProject.projectLink}
                className="btn btn-primary mt-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Project
              </a>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
