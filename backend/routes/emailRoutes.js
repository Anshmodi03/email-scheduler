const express = require("express");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const Email = require("../models/Email");

const router = express.Router();

// Schedule and send email
router.post("/schedule", async (req, res) => {
  const { recipient, subject, body, scheduledTime } = req.body;

  try {
    const email = await Email.create({
      recipient,
      subject,
      body,
      scheduledTime,
    });

    schedule.scheduleJob(new Date(scheduledTime), async () => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject,
        text: body,
      };

      await transporter.sendMail(mailOptions);
      email.sent = true;
      await email.save();
    });

    res.status(201).json({ message: "Email scheduled successfully", email });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scheduling email", error: error.message });
  }
});

module.exports = router;
