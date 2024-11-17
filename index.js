require("dotenv").config();
const express = require('express');
const cors = require('cors');
const sendMail = require('./sendmail');

const app = express();
app.use(cors());
app.use(express.json());

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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
