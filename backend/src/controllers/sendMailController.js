import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/asyncHandler.js";
const sendMail = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const passkey = "lgqb kvhs wast zrsr";
  const gmail = "grgnld3970@gmail.com";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmail,
      pass: passkey,
    },
  });

  const mailOptions = {
    from: gmail,
    to: email,
    subject: "Thank you for contacting Gastron!",
    text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message: \n"${message}". \nOur team will get back to you shortly.\n\nBest regards,\nThe Gastron Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error sending email",
        success: false,
      });
    }
    res.status(200).json({
      message: "Email sent successfully!",
      success: true,
    });
  });
});

export { sendMail };
