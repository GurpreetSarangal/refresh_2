import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ username: "", email: "", message: "" });
  const [response, setResponse] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse("✅ Message sent successfully!");
        setFormData({ username: "", email: "", message: "" });
        setShowPopup(true);

        // Hide popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } else {
        setResponse(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error("Error:", err);
      setResponse("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="container-fluid contact py-5">
      {/* Popup Notification */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            backgroundColor: "#4BB543",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
            fontWeight: "bold",
          }}
        >
          Form submitted successfully!
        </div>
      )}

      <div className="container py-5">
        <div className="row g-5">
          {/* Left Section - Contact Details & Form */}
          <div className="col-xl-6">
            <div className="bg-light rounded p-5 mb-5">
              <h4 className="text-primary mb-4">Get in Touch</h4>
              <div className="row g-4">
                {/* ... your contact info blocks unchanged ... */}
                <div className="col-md-6">
                  <div className="contact-add-item">
                    <div className="contact-icon text-primary mb-4">
                      <i className="fas fa-map-marker-alt fa-2x"></i>
                    </div>
                    <div>
                      <h4>Address</h4>
                      <p className="mb-0">123 Street, New York, USA</p>
                    </div>
                  </div>
                </div>
                {/* Repeat for other contact info blocks... */}
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact" className="bg-light p-5 rounded h-170">
              <h4 className="text-primary">Send Your Message</h4>
              <p className="mb-4">
                We value your feedback and inquiries. Please fill out the form below to get in touch with us.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-lg-12 col-xl-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control border-0"
                        id="username"
                        placeholder="Your Name"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control border-0"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control border-0"
                        placeholder="Leave a message here"
                        id="message"
                        name="message"
                        style={{ height: "160px" }}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
              {/* Optionally show server response message below form */}
              {response && (
                <p
                  style={{
                    marginTop: "1rem",
                    fontWeight: "bold",
                    color: response.startsWith("✅") ? "green" : "red",
                  }}
                >
                  {response}
                </p>
              )}
            </div>
          </div>

          {/* Right Section - Google Map */}
          <div className="col-xl-6">
            <div className="rounded h-100">
              <iframe
                className="rounded h-100 w-100"
                style={{ height: "400px" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
