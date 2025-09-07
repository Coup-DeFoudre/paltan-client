import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import nodemailer from 'nodemailer';

interface ContactSettings {
  recipientEmail: string;
  isActive: boolean;
  emailService: string;
  smtpConfig: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
  };
  sendgridApiKey?: string;
  resendApiKey?: string;
}

// Get contact settings from Sanity
async function getContactSettings() {
  try {
    const settings = await client.fetch(`
      *[_type == "contactSettings"][0] {
        recipientEmail,
        isActive,
        emailService,
        smtpConfig,
        sendgridApiKey,
        resendApiKey
      }
    `);
    return settings;
  } catch {
    return null;
  }
}

// Send email using Nodemailer (SMTP)
async function sendEmailWithNodemailer(config: ContactSettings, emailData: Record<string, unknown>) {
  const transporter = nodemailer.createTransport({
    host: config.smtpConfig.host,
    port: config.smtpConfig.port,
    secure: config.smtpConfig.secure,
    auth: {
      user: config.smtpConfig.user,
      pass: config.smtpConfig.pass,
    },
  });

  const mailOptions = {
    from: config.smtpConfig.user,
    to: config.recipientEmail,
    subject: `Contact Form: ${emailData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #f39c12; padding-bottom: 10px;">
          नया संपर्क फॉर्म सबमिशन
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">संपर्क जानकारी</h3>
          <p><strong>नाम:</strong> ${emailData.name}</p>
          <p><strong>ईमेल:</strong> ${emailData.email}</p>
          <p><strong>विषय:</strong> ${emailData.subject}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="color: #2c3e50; margin-top: 0;">संदेश</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${emailData.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #27ae60;">
          <p style="margin: 0; color: #27ae60; font-weight: bold;">
            📧 यह संदेश आपकी वेबसाइट के संपर्क फॉर्म से भेजा गया है
          </p>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

// Send email using SendGrid
async function sendEmailWithSendGrid(config: ContactSettings, emailData: Record<string, unknown>) {
  const sgMail = await import('@sendgrid/mail');
  sgMail.default.setApiKey(config.sendgridApiKey || '');

  const msg = {
    to: config.recipientEmail,
    from: config.smtpConfig.user || 'noreply@thepaltan.com',
    subject: `Contact Form: ${emailData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #f39c12; padding-bottom: 10px;">
          नया संपर्क फॉर्म सबमिशन
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">संपर्क जानकारी</h3>
          <p><strong>नाम:</strong> ${emailData.name}</p>
          <p><strong>ईमेल:</strong> ${emailData.email}</p>
          <p><strong>विषय:</strong> ${emailData.subject}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="color: #2c3e50; margin-top: 0;">संदेश</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${emailData.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #27ae60;">
          <p style="margin: 0; color: #27ae60; font-weight: bold;">
            📧 यह संदेश आपकी वेबसाइट के संपर्क फॉर्म से भेजा गया है
          </p>
        </div>
      </div>
    `,
  };

  return await sgMail.default.send(msg);
}

// Send email using Resend
async function sendEmailWithResend(config: ContactSettings, emailData: Record<string, unknown>) {
  const resend = await import('resend');
  const resendClient = new resend.Resend(config.resendApiKey);

  return await resendClient.emails.send({
    from: 'noreply@thepaltan.com',
    to: config.recipientEmail,
    subject: `Contact Form: ${emailData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #f39c12; padding-bottom: 10px;">
          नया संपर्क फॉर्म सबमिशन
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">संपर्क जानकारी</h3>
          <p><strong>नाम:</strong> ${emailData.name}</p>
          <p><strong>ईमेल:</strong> ${emailData.email}</p>
          <p><strong>विषय:</strong> ${emailData.subject}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="color: #2c3e50; margin-top: 0;">संदेश</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${emailData.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #27ae60;">
          <p style="margin: 0; color: #27ae60; font-weight: bold;">
            📧 यह संदेश आपकी वेबसाइट के संपर्क फॉर्म से भेजा गया है
          </p>
        </div>
      </div>
    `,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'सभी फील्ड भरना आवश्यक है' },
        { status: 400 }
      );
    }

    // Get contact settings from Sanity
    const settings = await getContactSettings();
    
    if (!settings || !settings.isActive) {
      return NextResponse.json(
        { success: false, error: 'संपर्क फॉर्म वर्तमान में उपलब्ध नहीं है' },
        { status: 503 }
      );
    }

    if (!settings.recipientEmail) {
      return NextResponse.json(
        { success: false, error: 'ईमेल सेटिंग्स कॉन्फ़िगर नहीं हैं' },
        { status: 500 }
      );
    }

    const emailData = { name, email, subject, message };

    // Send email based on configured service
    switch (settings.emailService) {
      case 'nodemailer':
        await sendEmailWithNodemailer(settings, emailData);
        break;
      case 'sendgrid':
        await sendEmailWithSendGrid(settings, emailData);
        break;
      case 'resend':
        await sendEmailWithResend(settings, emailData);
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'असमर्थित ईमेल सेवा' },
          { status: 500 }
        );
    }


    return NextResponse.json({
      success: true,
      message: 'संदेश सफलतापूर्वक भेजा गया!'
    });

  } catch {
    return NextResponse.json(
      { success: false, error: 'संदेश भेजने में त्रुटि हुई' },
      { status: 500 }
    );
  }
}
