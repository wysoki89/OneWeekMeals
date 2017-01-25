var express = require('express');
var router = express.Router();
var mailer = require("nodemailer");
var config = require('./../config');

router
    .post('/', function (req, res) {
        // Use Smtp Protocol to send Email
        var smtpTransport = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: config.mailer.auth.user,
                pass: config.mailer.auth.pass
            }
        }); 
        console.log(req.body.to)
        var mailOptions = {
            from: "twysokinski@gmail.com",
            to: req.body.to,
            subject: "Lista zakupów",
            html: req.body.emailBody
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            } else {
                console.log("message sent");
                res.send(mailOptions);
            }
            smtpTransport.close();
        });
    });
module.exports = router;