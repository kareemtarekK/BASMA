const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kareemtarek33333@gmail.com",
    pass: "",
  },
});

const email = await transporter.sendMail(mailOptions);
