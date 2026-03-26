const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

app.use(cors());
app.use(express.json());

// Example route to get data from Supabase
app.get('/api/items', async (req, res) => {
  const { data, error } = await supabase
    .from('items')
    .select('*');

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Example route to add data
app.post('/api/items', async (req, res) => {
  const { name } = req.body;
  const { data, error } = await supabase
    .from('items')
    .insert([{ name }]);

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

app.post('/api/send-email', async (req, res) => {
  const { to, text } = req.body;

  if (!to || !text) {
    return res.status(400).json({ error: 'Recipient email and message text are required.' });
  }

  if (!gmailUser || !gmailAppPassword) {
    return res.status(500).json({
      error: 'Gmail SMTP is not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to the backend environment.',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"Shubham Chaudhari" <${gmailUser}>`,
      to,
      subject: 'Test email from Hashit2',
      text,
    });

    return res.json({ message: `Email sent successfully to ${to}.` });
  } catch (mailError) {
    return res.status(500).json({
      error: mailError.message || 'Unable to send email right now.',
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
