const nodemailer = require('nodemailer')

// initialize nodemailer
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: 'lalitkhudhania2@gmail.com',
            pass: 'tgzglpnzyuaejxaw'
        }
    }
);

// const mailOptions = {
//     from: '"Admin do-not reply" <lalitkhudhania2@gmail.com>', // sender address
//     to: 'lalitkhudhania1@gmail.com', // list of receivers
//     subject: 'Welcome!',
//     template: 'email', // the name of the template file i.e email.handlebars
//     context:{
//         name: "Adebola", // replace {{name}} with Adebola
//         company: 'My Company' // replace {{company}} with My Company
//     }

// };

// // trigger the sending of the E-mail
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });
module.exports = transporter;