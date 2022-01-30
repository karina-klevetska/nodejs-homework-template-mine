import sgMail from '@sendgrid/mail'

class SendgridSender {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    return await sgMail.send({ ...msg, from: process.env.SENDGRID_SEND_EMAIL })
  }
}

export default SendgridSender
