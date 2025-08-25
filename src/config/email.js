const Nodemailer = require('nodemailer');


const sendEMail = async options => {

    // create a transporter object using the default SMTP transport
    const transporter = Nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: `"Cliff App" <${process.env.EMAIL_USERNAME}>`, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
        html: `<p>${options.message}</p>` // html body
    };

    // send mail with defined transport object 
    await transporter.sendMail(mailOptions);
}

module.exports = sendEMail;
//fcdee5daedf8984ec7e044c37297d164
