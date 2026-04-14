import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingEmail = async (to, eventTitle, date, time) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Booking Confirmed 🎉",
      html: `
        <h2>Booking Confirmed</h2>
        <p>Your meeting is scheduled.</p>
        <p><b>Event:</b> ${eventTitle}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
      `,
    });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
  }
};