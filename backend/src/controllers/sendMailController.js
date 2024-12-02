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
  const otherMailOptions = {
    from: gmail,
    to: email,
    subject: "Welcome to the Gastron Family!",
    text: `Dear Valued Food Enthusiast,
  
  Thank you for joining the Gastron newsletter! We're thrilled to have you as part of our growing community of food lovers. By subscribing, you’ll now be among the first to:
  
  - Explore exclusive discounts and special offers on your favorite meals.
  - Get sneak peeks into our new and seasonal menu items.
  - Discover mouthwatering recipes, cooking tips, and behind-the-scenes stories.
  - Receive personalized recommendations and updates tailored just for you.
  
  At Gastron, we are committed to delivering fresh, high-quality meals right to your doorstep while ensuring a seamless and delightful experience.
  
  Stay tuned for exciting updates and surprises that will make your dining experience even more enjoyable!
  
  Hungry for more? Don’t forget to connect with us on social media:
  - Fgastron3970: Stay inspired with our latest dishes and updates.
  - Igastron3970: Feast your eyes on our irresistible culinary creations.
  - Tgastron3970: Join the conversation and share your feedback with us.
  
  Once again, thank you for choosing Gastron. If you have any questions or need assistance, feel free to reach out to us at support@gastron.com.
  
  Bon appétit!
  
  Warm regards,  
  The Gastron Team
  `,
  };

  const mailOptions = {
    from: gmail,
    to: email,
    subject: "Thank you for contacting Gastron!",
    text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message: \n"${message}". \nOur team will get back to you shortly.\n\nBest regards,\nThe Gastron Team`,
  };

  if (name) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "Error sending email",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Email sent successfully!",
        success: true,
      });
    });
  }
  transporter.sendMail(otherMailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error sending email",
        success: false,
      });
    }
  });
  res.status(200).json({
    message: "Email sent successfully!",
    success: true,
  });
});

export { sendMail };
