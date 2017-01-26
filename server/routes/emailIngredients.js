const express = require('express');
const router = express.Router();
const co = require('co');
const mailer = require("nodemailer");
const config = require('./../config');

router
    .post('/', co.wrap(function* (req, res, next) {
        try {
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
            const order = yield smtpTransport.sendMail(mailOptions);
            smtpTransport.close();
            res.send(mailOptions);
        }catch (e) {
            next(e)
        }
}));
module.exports = router;