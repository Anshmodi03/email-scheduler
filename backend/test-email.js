const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail", // or 'hotmail', 'yahoo', or custom provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  //   to: "Your email id by which you want to sent the email and check the nodemailer",
  subject: "Test Email",
  text: "This is a test email sent using Node.js and Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error("Error:", error);
  }
  console.log("Email sent:", info.response);
});
