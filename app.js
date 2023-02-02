require('dotenv').config()
const { text } = require('express')
const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
app.use(express.json())
const port = process.env.PORT || 5000
const rateLimiter = require('express-rate-limit')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
app.use(xss())
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 30
}))
app.use(helmet())
app.use(cors({
    origin: '*',
    credentials: true
}))


app.post('/send_email', async(req, res) =>{
    const {to,subject, message} = req.body
    subject.toString()
    to.toString()
    message.toString()
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    const payload = {
        from: '',
        to: to,
        subject: subject,
        text: message
    }
    transporter.sendMail(payload, (err, data) =>{
        if(err){
            console.log(data)
            return res.status(400).json({err: 'something went wrong...'})
        }
        console.log(data)
        res.status(200).json({msg: 'email has be sent successfuly!'})
    })
})

app.listen(port, () => console.log(`server is up on port ${port}...`))