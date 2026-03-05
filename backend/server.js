const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// configure storage for resume uploads (in memory or disk)
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

const app = express();
// configure CORS to match the front-end origin (vite default port 8080)
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  secure: !!process.env.SMTP_SECURE,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

app.post('/api/apply', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, name, email, phone, coverLetter } = req.body;
    const notifyEmail = process.env.NOTIFY_EMAIL || 'sahoodipanjali765@gmail.com';

    let attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        path: req.file.path,
      });
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || 'no-reply@example.com',
      to: notifyEmail,
      subject: `New application for job ${jobId}`,
      text: `A new application has been submitted.\n
Job ID: ${jobId}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCover Letter: ${coverLetter || 'N/A'}\n`,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Application received and email sent.' });
  } catch (err) {
    console.error('Error handling application:', err);
    res.status(500).json({ success: false, error: 'Failed to process application.' });
  }
});

// serve uploaded files if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
