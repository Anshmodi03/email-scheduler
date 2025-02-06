import React, { useState } from "react";
import axios from "axios";
import "./EmailForm.css";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    body: "",
    scheduledTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://email-scheduler-7ywf.onrender.com/api/emails/schedule",
        formData
      );
      alert("Email scheduled successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Error scheduling email");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">Email Scheduler</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="recipient" className="form-label">
              Recipient Email
            </label>
            <input
              type="email"
              name="recipient"
              id="recipient"
              placeholder="Enter recipient's email"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Enter email subject"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="body" className="form-label">
              Email Body
            </label>
            <textarea
              name="body"
              id="body"
              placeholder="Write your message here"
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="scheduledTime" className="form-label">
              Scheduled Time
            </label>
            <input
              type="datetime-local"
              name="scheduledTime"
              id="scheduledTime"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-btn">
              Schedule Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
