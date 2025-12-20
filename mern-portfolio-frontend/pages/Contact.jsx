import React from "react";
import ContactInfo from "./ContactInfo";
import SendMessage from "./SendMessage";

export default function Contact() {
  return (
    <section className="contact-section py-5" style={{ backgroundColor: "#0A0A0A", color: "#EDEDED" }}>
      <div className="container">
        <h2 className="text-center mb-5" style={{ color: "#FFD700" }}>Let’s Start Manufacturing</h2>

        <div className="d-flex flex-wrap-reverse justify-content-center gap-4">
          
          <ContactInfo />
          <SendMessage />
        </div>

      </div>
    </section>
  );
}
