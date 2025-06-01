const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "a121a3d3cb4b527d4633db66dc937492"
  }
});


router.post("/send-email", async (req, res) => {
  const { email, subject, status, order, failureReason } = req.body;

  let mailOptions = {
    from: '"Your Store" <hello@demomailtrap.co>',
    to: email,
    subject: subject || "Order Update",
  };

  if (status === "success" && order) {
    // Prepare order details email content
    const itemsHtml = order.items.map(item => `
      <li>${item.name} - Quantity: ${item.quantity}, Price: ₹${item.price}</li>
    `).join("");

    mailOptions.html = `
      <h1>Thank you for your order!</h1>
      <p>Order ID: <strong>${order.orderId}</strong></p>
      <ul>
        ${itemsHtml}
      </ul>
      <p><strong>Total Amount: ₹${order.total}</strong></p>
      <p>Your order was successfully placed.</p>
    `;
  } else if (status === "failed") {
    // Prepare failure reason email content
    mailOptions.html = `
      <h1>Order Failed</h1>
      <p>Unfortunately, your order could not be processed.</p>
      <p><strong>Reason:</strong> ${failureReason || "Unknown error"}</p>
      <p>Please try again or contact support.</p>
    `;
  } else {
    // Fallback message
    mailOptions.html = `
      <p>Order status is unknown.</p>
    `;
  }

  try {
    const info = await transport.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    res.status(200).json({ message: "Email sent successfully", id: info.messageId });
  } catch (error) {
    console.error("Failed to send email", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});


module.exports = router;
