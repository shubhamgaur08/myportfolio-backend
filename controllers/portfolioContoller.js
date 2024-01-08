const MailerSend = require("mailersend");

const mailer = new MailerSend({
  api_key: process.env.API_MAILERSEND,
});

const sendEmailController = async (req, res) => {
  const { name, email, msg } = req.body;

  // Validation
  if (!name || !email || !msg) {
    return res.status(400).send({
      success: false,
      message: "Please Provide All Fields",
    });
  }

  const emailParams = {
    from: "your-email@example.com",
    to: ["recipient-email@example.com"],
    subject: "Regarding Mern Portfolio App",
    html: `
      <h5>Detail Information</h5>
      <ul>
        <li><p>Name : ${name}</p></li>
        <li><p>Email : ${email}</p></li>
        <li><p>Message : ${msg}</p></li>
      </ul>
    `,
  };

  try {
    const response = await mailer.send(emailParams);
    return res.status(200).send({
      success: true,
      message: "Your Message Sent Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { sendEmailController };

