// const nodemailer = require("nodemailer");

function genrateOTP(){
    let  otp = Math.floor(1000+ Math.random()*9000 );
    return otp;

}


 




function sendmail(email,otp){
    
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jigs.dev2001@gmail.com',  // Your email address
        pass: 'xdiv omgd sicv hbks'  // Your email passkey
    }
});











let mailOptions = {
    from: 'jigs.dev2001@gmail.com',
    to: req.body.email,  // Customer's email address
    subject: 'OTP Verification',
    html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    padding: 20px;
                    background-color: #ffffff;
                    border: 1px solid #dddddd;
                    max-width: 600px;
                    margin: 20px auto;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 0;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .footer {
                    background-color: #f4f4f4;
                    color: #888888;
                    padding: 10px 0;
                    text-align: center;
                    font-size: 12px;
                }
                .otp {
                    font-size: 24px;
                    color: #333333;
                    margin: 20px 0;
                    font-weight: bold;
                }
                .button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    display: inline-block;
                    margin: 20px 0;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>OTP Verification</h1>
                </div>
                <div class="content">
                    <p>Dear Customer,</p>
                    <p>Your One-Time Password (OTP) for verification is:</p>
                    <p class="otp">{{OTP}}</p>
                    <p>Please use this OTP to complete your verification process.</p>
                    <a href="#" class="button">Verify Now</a>
                </div>
                <div class="footer">
                    <p>If you did not request this OTP, please ignore this email.</p>
                </div>
            </div>
        </body>
        </html>
    `.replace('{{OTP}}',genrateOTP()) // Replace the placeholder with the actual OTP
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