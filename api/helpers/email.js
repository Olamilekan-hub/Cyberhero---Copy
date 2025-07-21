const sgMail = require("@sendgrid/mail");
const Token = require("../models/token.model");
const { createConnection } = require("./connection");
const envValidator = require("./envValidator");
const crypto = require("crypto");

const sendVerificationEmail = async (userID, userEmail) => {
  try {
    envValidator.validateRequired();

    const { SENDGRID_API_KEY, EMAIL_LINK_URL, LOCALHOST_EMAIL } = process.env;

    if (!envValidator.isValidSecret('SENDGRID_API_KEY', SENDGRID_API_KEY)) {
      throw new Error('Invalid email service configuration');
    }

    // Create Token
    await createConnection();
    const { token } = await Token.findOneAndUpdate(
      { userID },
      {
        userID,
        token: crypto.randomBytes(16).toString("hex"),
      },
      {
        upsert: true,
        setDefaultsOnInsert: true,
        omitUndefined: true,
        new: true,
      }
    );

    console.log("userEmail is", userEmail);

    // Professional HTML Email Template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mission: G.A.I.A. Email Verification</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f4f4;
                line-height: 1.6;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 30px;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 32px;
                font-weight: 700;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                letter-spacing: 1px;
            }
            .header .subtitle {
                margin-top: 10px;
                font-size: 16px;
                opacity: 0.9;
                font-weight: 300;
            }
            .content {
                padding: 50px 40px;
                text-align: center;
            }
            .content h2 {
                color: #333333;
                font-size: 28px;
                margin-bottom: 20px;
                font-weight: 600;
            }
            .content p {
                color: #666666;
                font-size: 16px;
                margin-bottom: 30px;
                line-height: 1.8;
            }
            .verify-button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white !important;
                text-decoration: none;
                padding: 16px 40px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                margin: 20px 0;
            }
            .verify-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
            }
            .alternative-link {
                margin-top: 40px;
                padding: 20px;
                background-color: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #667eea;
            }
            .alternative-link p {
                margin: 0;
                font-size: 14px;
                color: #666666;
            }
            .alternative-link a {
                color: #667eea;
                word-break: break-all;
                text-decoration: underline;
            }
            .footer {
                background-color: #2c3e50;
                color: #ecf0f1;
                padding: 30px;
                text-align: center;
                font-size: 14px;
            }
            .footer p {
                margin: 5px 0;
                opacity: 0.8;
            }
            .security-notice {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 20px;
                margin-top: 30px;
            }
            .security-notice h4 {
                color: #856404;
                margin: 0 0 10px 0;
                font-size: 16px;
            }
            .security-notice p {
                color: #856404;
                font-size: 14px;
                margin: 0;
            }
            @media only screen and (max-width: 600px) {
                .email-container {
                    width: 100% !important;
                }
                .header, .content, .footer {
                    padding: 30px 20px !important;
                }
                .header h1 {
                    font-size: 24px;
                }
                .content h2 {
                    font-size: 22px;
                }
                .verify-button {
                    padding: 14px 30px;
                    font-size: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Mission: G.A.I.A.</h1>
                <div class="subtitle">Your Adventure Awaits</div>
            </div>
            
            <div class="content">
                <h2>🚀 Ready to Begin Your Journey?</h2>
                <p>Welcome to Mission: G.A.I.A.! We're excited to have you join our community of explorers and innovators.</p>
                <p>To activate your account and start your adventure, please verify your email address by clicking the button below:</p>
                
                <a href="${EMAIL_LINK_URL + token}" class="verify-button">
                    Verify My Account
                </a>
                
                <div class="alternative-link">
                    <p><strong>Button not working?</strong> Copy and paste this link into your browser:</p>
                    <a href="${EMAIL_LINK_URL + token}">${
      EMAIL_LINK_URL + token
    }</a>
                </div>
                
                <div class="security-notice">
                    <h4>🔒 Security Notice</h4>
                    <p>This verification link will expire in 24 hours for your security. If you didn't create an account with Mission: G.A.I.A., please ignore this email.</p>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Mission: G.A.I.A. Team</strong></p>
                <p>This is an automated message, please do not reply to this email.</p>
                <p>© ${new Date().getFullYear()} Mission: G.A.I.A. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Send email
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: LOCALHOST_EMAIL === "true" ? process.env.SERVER_URL : userEmail || process.env.SERVER_URL,
      from: process.env.SERVER_URL,
      subject: "Mission: G.A.I.A. Email Verification - Your Adventure Awaits! 🚀",
      text: `Welcome to Mission: G.A.I.A.! 

Are you ready to begin your adventure? 

To activate your account, please click the following link to verify your email address:
${EMAIL_LINK_URL + token}

This verification link will expire in 24 hours for your security.

If you didn't create an account with Mission: G.A.I.A., please ignore this email.

Welcome aboard!
The Mission: G.A.I.A. Team`,
      html: htmlTemplate,
      tracking_settings: {
        click_tracking: {
          enable: false,
        },
      },
    };

    return await sgMail.send(msg);

  } catch (error) {
    // Sanitize email service errors
    const sanitizedError = envValidator.getSanitizedError(error, 'Email service error');
    
    if (envValidator.isProduction()) {
      console.error('Email Error (Sanitized):', sanitizedError);
      throw new Error('Email delivery failed');
    } else {
      console.error('Email Error:', sanitizedError);
      throw new Error(sanitizedError);
    }
  }
};

module.exports = { sendVerificationEmail };