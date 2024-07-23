const nodemailer = require("nodemailer");

function genrateOTP(){
    let  otp = Math.floor(Math.random() * 9000);
    return otp;

}

// console.log(genrateOTP())


function sendmail(req,res){
    
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jigs.dev2001@gmail.com',  // Your email address
        pass: 'xdiv omgd sicv hbks'  // Your email passkey
    }
});

// Email content
let mailOptions = {
    from: 'jigs.dev2001@gmail.com',
    to: req.body.email,  // Customer's email address
    subject: 'OTP Verify',
    text: `To verify your email address, plese following One Time Password(OTP) \n ${genrateOTP()} \n Thank You`
};

// Sending email
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        res.send('Email sent: ' + info.response)
        console.log('Email sent: ' + info.response);
    }
    resp.end();
});
}



module.exports = sendmail