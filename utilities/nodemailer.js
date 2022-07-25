const nodemailer = require('nodemailer')

// initialize nodemailer
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    }
);

module.exports = transporter;
