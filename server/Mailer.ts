import nodemailer from 'nodemailer'

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const sendMail = async (recipient: string, template: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  })

  const info = await transporter.sendMail({
    to: recipient,
    // to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Password reset request for CSCI3100-A6', // Subject line
    // text: 'Hello world?', // plain text body
    html: template, // html body
  })

  return info
}

export const resetPwTemplate = (name: string, resetURL: string): string => `
  <div style="display: flex;justify-content: center; align-items: center;width: 100%; background: #f9f9f9; min-height: 250px; flex-direction: column;">
    <div style="margin: 20px auto 20px auto; background: white; padding: 25px;">
      <h3 style="font-size: 20px">Hi ${name},</h3>
      <br>
      <p style="font-size: 16px">Your CSCI3100-A6 password can be reset by clicking the button below. If you did not request to reset your password, please ignore this email.</p>
      <br>
      <a style="font-size: 16px; background: #0061E0; color: white; padding: 9px;text-decoration: none; border-radius: 5px;" href="${resetURL}"}>Reset Password</a>
    </div>
    <div style="font-size: 12px;color: #99aab5;">Send by CSCI3100-A6(20-21), CUHK</div>
  </div>
`

export default sendMail
