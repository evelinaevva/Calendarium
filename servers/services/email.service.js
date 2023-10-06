const nodemailer = require("nodemailer");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP_HOST,
            port: process.env.EMAIL_SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASS
            },
            debug: true
          });   
        }    
   
    async send({fieldTo, fieldTitle, fieldText, date}) {
        const info = await this.transporter.sendMail({
            from: `"Ваш календарь событий" <nesya.bss.kursk@yandex.ru>`, 
            to: `${fieldTo}`, 
            subject: "Событие в календаре", 
            text: `${fieldTitle}`, 
            html: '<!DOCTYPE html>'+
                '<html><head><title>Уведомление</title>'+
                '</head><body><div>'+
                '<h1>Напоминаю вам о событии:</h1>'+
                `<p>✔ ${fieldTitle}</p>`+
                `<p>✔ ${fieldText}</p>`+
                `<p>Дата события: ${date} </p>`+
                '</div></body></html>'
        });
        return info;
    }

}

module.exports = new MailService;

