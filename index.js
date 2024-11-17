require("dotenv").config();
const express = require('express');
const sendMail = require('./sendmail');

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.FRONTEND_URL}`);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });

app.get('/', (req, res) => {
    res.status(200).send('Email Service Health Check');
});

app.post('/subscribe-email', async (req, res) => {
    const { email } = req.body;

    // Validate input
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Send mail and check response
        const emailSent = await sendMail("subscribe", { email });
        
        if (emailSent) {
            res.status(200).json({ message: 'Email sent successfully' });
        } else {
            res.status(500).json({ message: 'Failed to send email' });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});

app.post('/contact-email', async (req, res) => {
    const { name, email, message, subject, mobile } = req.body;

    // Validate input
    if (!name || !email || !message || !subject || !mobile) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Send mail and check response
        const emailSent = await sendMail("contact", { name, email, message, subject, mobile });
        
        if (emailSent) {
            res.status(200).json({ message: 'Email sent successfully' });
        } else {
            res.status(500).json({ message: 'Failed to send email' });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});

app.post('/quotation-email', (req, res) => {
    const { id, productName, lengthh, width, quantity, material, finishes, extra, note, artwork, name, email, phone } = req.body;
    // Validate input
    if (!name || !email || !phone || !id || !productName || !lengthh || !width || !quantity) {
        return res.status(400).json({ message: 'name, email, phone, id, productName, length, width, quantity are required' })
    }
    try {
     const emailSent = sendMail("quotation", { id, productName, lengthh, width, quantity, material, finishes, extra, note, artwork, name, email, phone });   
        
        if (emailSent) {
            res.status(200).json({ message: 'Email sent successfully' });
        } else {
            res.status(500).json({ message: 'Failed to send email' });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'An error occurred while sending the email' });
        
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
