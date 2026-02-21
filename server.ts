import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("logistics.db");

// Email Transporter Setup
const getTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    secure: parseInt(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    service TEXT,
    origin TEXT,
    destination TEXT,
    weight TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tracking_number TEXT UNIQUE,
    status TEXT,
    location TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS admin_reset_tokens (
    token TEXT PRIMARY KEY,
    email TEXT,
    expires_at DATETIME
  );
`);

// Initialize Admin Credentials if not exists
const adminExists = db.prepare("SELECT COUNT(*) as count FROM settings WHERE key = 'admin_username'").get() as { count: number };
if (adminExists.count === 0) {
  db.prepare("INSERT INTO settings (key, value) VALUES ('admin_username', 'adminsmtp')").run();
  db.prepare("INSERT INTO settings (key, value) VALUES ('admin_password', 'Admin@@9794')").run();
}

// Seed some mock tracking data if empty
const trackingCount = db.prepare("SELECT COUNT(*) as count FROM tracking").get() as { count: number };
if (trackingCount.count === 0) {
  const insertTracking = db.prepare("INSERT INTO tracking (tracking_number, status, location) VALUES (?, ?, ?)");
  insertTracking.run("GAL-123456", "In Transit", "New York, USA");
  insertTracking.run("GAL-789012", "Delivered", "London, UK");
  insertTracking.run("GAL-112233", "Processing", "Dubai, UAE");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
      stmt.run(name, email, subject, message);
      console.log(`Contact form submitted by ${email}`);
      res.json({ success: true, message: "Thank you for contacting us. We will get back to you soon." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.post("/api/quote", (req, res) => {
    const { name, email, service, origin, destination, weight, message } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO quotes (name, email, service, origin, destination, weight, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
      stmt.run(name, email, service, origin, destination, weight, message);
      console.log(`Quote requested by ${email}`);
      res.json({ success: true, message: "Your quote request has been received. Our team will contact you shortly." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/track/:number", (req, res) => {
    const { number } = req.params;
    try {
      const stmt = db.prepare("SELECT * FROM tracking WHERE tracking_number = ?");
      const result = stmt.get(number);
      if (result) {
        res.json({ success: true, data: result });
      } else {
        res.status(404).json({ success: false, message: "Tracking number not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Admin API Routes
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    try {
      const dbUser = db.prepare("SELECT value FROM settings WHERE key = 'admin_username'").get() as { value: string };
      const dbPass = db.prepare("SELECT value FROM settings WHERE key = 'admin_password'").get() as { value: string };
      
      if (username === dbUser.value && password === dbPass.value) {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error during login" });
    }
  });

  app.post("/api/admin/update-credentials", (req, res) => {
    const { newUsername, newPassword } = req.body;
    try {
      if (newUsername) {
        db.prepare("UPDATE settings SET value = ? WHERE key = 'admin_username'").run(newUsername);
      }
      if (newPassword) {
        db.prepare("UPDATE settings SET value = ? WHERE key = 'admin_password'").run(newPassword);
      }
      res.json({ success: true, message: "Credentials updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating credentials" });
    }
  });

  app.post("/api/admin/reset-request", async (req, res) => {
    const { email } = req.body;
    const transporter = getTransporter();
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    try {
      db.prepare("INSERT INTO admin_reset_tokens (token, email, expires_at) VALUES (?, ?, ?)").run(token, email, expiresAt);
      
      const resetLink = `${process.env.APP_URL || 'http://localhost:3000'}/admin-reset?token=${token}`;

      if (!transporter) {
        console.log("SMTP not configured. Reset Link (Simulation):", resetLink);
        return res.json({ 
          success: true, 
          message: `SMTP not configured. Simulation Reset Link: ${resetLink}` 
        });
      }

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Global Apex Admin" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Admin Password Reset - Global Apex Logistics",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #c5a028; text-align: center;">Password Reset</h2>
            <p>You requested a password reset for the Global Apex Logistics Admin Portal.</p>
            <p>Click the button below to set a new password. This link expires in 1 hour.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background: #c5a028; color: #0a0a1a; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            <p style="font-size: 12px; color: #777;">If the button doesn't work, copy and paste this link: <br> ${resetLink}</p>
            <p style="margin-top: 20px; font-size: 12px; color: #777;">If you did not request this, please ignore this email.</p>
          </div>
        `,
      });

      console.log(`Reset email sent to: ${email}`);
      res.json({ 
        success: true, 
        message: "A password reset link has been sent to your registered email address." 
      });
    } catch (error) {
      console.error("Error sending reset email:", error);
      res.status(500).json({ success: false, message: "Failed to send reset email." });
    }
  });

  app.post("/api/admin/reset-password", (req, res) => {
    const { token, newPassword } = req.body;
    try {
      const resetReq = db.prepare("SELECT * FROM admin_reset_tokens WHERE token = ? AND expires_at > CURRENT_TIMESTAMP").get(token) as { email: string } | undefined;
      
      if (!resetReq) {
        return res.status(400).json({ success: false, message: "Invalid or expired reset token." });
      }

      db.prepare("UPDATE settings SET value = ? WHERE key = 'admin_password'").run(newPassword);
      db.prepare("DELETE FROM admin_reset_tokens WHERE token = ?").run(token);

      res.json({ success: true, message: "Password has been reset successfully. You can now login." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error during password reset." });
    }
  });

  app.get("/api/admin/contacts", (req, res) => {
    try {
      const stmt = db.prepare("SELECT * FROM contacts ORDER BY created_at DESC");
      const contacts = stmt.all();
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching contacts" });
    }
  });

  app.get("/api/admin/quotes", (req, res) => {
    try {
      const stmt = db.prepare("SELECT * FROM quotes ORDER BY created_at DESC");
      const quotes = stmt.all();
      res.json({ success: true, data: quotes });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching quotes" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
