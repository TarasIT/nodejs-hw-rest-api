const nodemailer = require("nodemailer");

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "taras_malcev@ukr.net",
    pass: process.env.UKRNET_IMAP_KEY,
  },
};

const emailConfirm = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "taras_malcev@ukr.net",
    to: email,
    subject: "Email confirmation",
    text: `Please, follow the link to confirm your email: 
    http://localhost:${process.env.PORT}/api/auth/users/verify/${verificationToken}`,
  };
  await transporter.sendMail(emailOptions);
};

module.exports = {
  emailConfirm,
};
