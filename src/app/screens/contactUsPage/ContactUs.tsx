import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "../../css/contactUs.css";
import {
  Mail,
  Phone,
  MapPin,
  SendHorizonal,
} from "lucide-react";
import ProductsBanner from "../productListPage/ShopBanner";

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_jtx1u38",     // ✅ Your service ID
        "template_aie6xga",    // ✅ Your template ID
        formRef.current,
        "YWfNQxD8UUSP9gnqI"     // ✅ Your public key
      )
      .then(() => alert("✅ Message sent!"))
      .catch((err) => alert("❌ Failed: " + err.text));

    formRef.current.reset();
  };

  return (
    <> 
    <ProductsBanner/>
      <div className="contact-wrapper">
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p>
              Feel free to reach out to us for any inquiries. We're here to help you with anything ReVerSo.
            </p>

            <div className="info-block">
              <h4><MapPin size={16} /> Address</h4>
              <p>123 ReVerSo Street, Seoul, South Korea</p>
            </div>

            <div className="info-block">
              <h4><Phone size={16} /> Phone</h4>
              <p>Mobile: +82 10 1234 5678</p>
              <p>Hotline: +82 2 8765 4321</p>
            </div>

            <div className="info-block">
              <h4><Mail size={16} /> Email</h4>
              <p>ziynatillokht@gmail.com</p>
              <p>support@reverso.shop</p>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <h2>Tell Us Your Message</h2>
            <input type="text" name="name" placeholder="Your Name *" required />
            <input type="email" name="email" placeholder="Your Email *" required />
            <input type="text" name="title" placeholder="Subject" />
            <textarea name="message" placeholder="Your Message" rows={6} />
            <button type="submit" className="send-btn">
              <SendHorizonal size={16} style={{ marginRight: "8px" }} />
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="map-frame">
          <iframe
            src="https://maps.google.com/maps?q=Seoul&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
            title="ReVerSo Map"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
