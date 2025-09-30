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

// Get contact settings from Sanity (reusing same settings for submissions)
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
async function sendEmailWithNodemailer(config: ContactSettings, submissionData: Record<string, unknown>) {
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
    subject: `Reader Submission: ${submissionData.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50; border-bottom: 3px solid #27ae60; padding-bottom: 15px; margin-bottom: 25px;">
            🗞️ नया पाठक योगदान सबमिशन
          </h2>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #27ae60;">
            <h3 style="color: #27ae60; margin-top: 0; font-size: 18px;">📝 कंटेंट जानकारी</h3>
            <p style="margin: 10px 0;"><strong>शीर्षक:</strong> ${submissionData.title}</p>
            <p style="margin: 10px 0;"><strong>सबमिशन समय:</strong> ${new Date().toLocaleString('hi-IN')}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0; font-size: 18px;">👤 रिपोर्टर जानकारी</h3>
            <p style="margin: 10px 0;"><strong>नाम:</strong> ${submissionData.reporterName}</p>
            <p style="margin: 10px 0;"><strong>संपर्क:</strong> ${submissionData.contact}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0; font-size: 18px;">📄 स्टोरी विवरण</h3>
            <p style="line-height: 1.8; white-space: pre-wrap; color: #495057;">${submissionData.description}</p>
          </div>
          
          ${submissionData.driveLink ? `
            <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #2196f3;">
              <h3 style="color: #1976d2; margin-top: 0; font-size: 18px;">📎 अटैचमेंट</h3>
              <p style="margin: 10px 0;">
                <strong>Google Drive Link:</strong> 
                <a href="${submissionData.driveLink}" target="_blank" style="color: #1976d2; text-decoration: none;">
                  ${submissionData.driveLink}
                </a>
              </p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: white; font-weight: bold; font-size: 16px;">
              📧 यह रिपोर्ट आपकी वेबसाइट के Reader Submissions फॉर्म से भेजी गई है
            </p>
            <p style="margin: 10px 0 0 0; color: #e8eaed; font-size: 14px;">
              कृपया जल्दी से जल्दी रिपोर्टर से संपर्क करें और स्टोरी की पुष्टि करें।
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
          <p>द पल्टन - Digital News Platform</p>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

// Send email using SendGrid
async function sendEmailWithSendGrid(config: ContactSettings, submissionData: Record<string, unknown>) {
  const sgMail = await import('@sendgrid/mail');
  sgMail.default.setApiKey(config.sendgridApiKey || '');

  const msg = {
    to: config.recipientEmail,
    from: config.smtpConfig.user || 'noreply@thepaltan.com',
    subject: `Reader Submission: ${submissionData.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50; border-bottom: 3px solid #27ae60; padding-bottom: 15px; margin-bottom: 25px;">
            🗞️ नया पाठक योगदान सबमिशन
          </h2>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #27ae60;">
            <h3 style="color: #27ae60; margin-top: 0; font-size: 18px;">📝 कंटेंट जानकारी</h3>
            <p style="margin: 10px 0;"><strong>शीर्षक:</strong> ${submissionData.title}</p>
            <p style="margin: 10px 0;"><strong>सबमिशन समय:</strong> ${new Date().toLocaleString('hi-IN')}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0; font-size: 18px;">👤 रिपोर्टर जानकारी</h3>
            <p style="margin: 10px 0;"><strong>नाम:</strong> ${submissionData.reporterName}</p>
            <p style="margin: 10px 0;"><strong>संपर्क:</strong> ${submissionData.contact}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0; font-size: 18px;">📄 स्टोरी विवरण</h3>
            <p style="line-height: 1.8; white-space: pre-wrap; color: #495057;">${submissionData.description}</p>
          </div>
          
          ${submissionData.driveLink ? `
            <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #2196f3;">
              <h3 style="color: #1976d2; margin-top: 0; font-size: 18px;">📎 अटैचमेंट</h3>
              <p style="margin: 10px 0;">
                <strong>Google Drive Link:</strong> 
                <a href="${submissionData.driveLink}" target="_blank" style="color: #1976d2; text-decoration: none;">
                  ${submissionData.driveLink}
                </a>
              </p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: white; font-weight: bold; font-size: 16px;">
              📧 यह रिपोर्ट आपकी वेबसाइट के Reader Submissions फॉर्म से भेजी गई है
            </p>
            <p style="margin: 10px 0 0 0; color: #e8eaed; font-size: 14px;">
              कृपया जल्दी से जल्दी रिपोर्टर से संपर्क करें और स्टोरी की पुष्टि करें।
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
          <p>द पल्टन - Digital News Platform</p>
        </div>
      </div>
    `,
  };

  return await sgMail.default.send(msg);
}

// Send email using Resend
async function sendEmailWithResend(config: ContactSettings, submissionData: Record<string, unknown>) {
  const resend = await import('resend');
  const resendClient = new resend.Resend(config.resendApiKey);

  return await resendClient.emails.send({
    from: 'noreply@thepaltan.com',
    to: config.recipientEmail,
    subject: `Reader Submission: ${submissionData.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50; border-bottom: 3px solid #27ae60; padding-bottom: 15px; margin-bottom: 25px;">
            🗞️ नया पाठक योगदान सबमिशन
          </h2>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #27ae60;">
            <h3 style="color: #27ae60; margin-top: 0; font-size: 18px;">📝 कंटेंट जानकारी</h3>
            <p style="margin: 10px 0;"><strong>शीर्षक:</strong> ${submissionData.title}</p>
            <p style="margin: 10px 0;"><strong>सबमिशन समय:</strong> ${new Date().toLocaleString('hi-IN')}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0; font-size: 18px;">👤 रिपोर्टर जानकारी</h3>
            <p style="margin: 10px 0;"><strong>नाम:</strong> ${submissionData.reporterName}</p>
            <p style="margin: 10px 0;"><strong>संपर्क:</strong> ${submissionData.contact}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0; font-size: 18px;">📄 स्टोरी विवरण</h3>
            <p style="line-height: 1.8; white-space: pre-wrap; color: #495057;">${submissionData.description}</p>
          </div>
          
          ${submissionData.driveLink ? `
            <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #2196f3;">
              <h3 style="color: #1976d2; margin-top: 0; font-size: 18px;">📎 अटैचमेंट</h3>
              <p style="margin: 10px 0;">
                <strong>Google Drive Link:</strong> 
                <a href="${submissionData.driveLink}" target="_blank" style="color: #1976d2; text-decoration: none;">
                  ${submissionData.driveLink}
                </a>
              </p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: white; font-weight: bold; font-size: 16px;">
              📧 यह रिपोर्ट आपकी वेबसाइट के Reader Submissions फॉर्म से भेजी गई है
            </p>
            <p style="margin: 10px 0 0 0; color: #e8eaed; font-size: 14px;">
              कृपया जल्दी से जल्दी रिपोर्टर से संपर्क करें और स्टोरी की पुष्टि करें।
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
          <p>द पल्टन - Digital News Platform</p>
        </div>
      </div>
    `,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { title, description, reporterName, contact, driveLink } = body;

    // Validate required fields
    if (!title || !description || !reporterName || !contact) {
      return NextResponse.json(
        { success: false, error: 'सभी आवश्यक फील्ड भरना अनिवार्य है' },
        { status: 400 }
      );
    }

    // Get contact settings from Sanity (reusing contact settings for submissions)
    const settings = await getContactSettings();
    
    if (!settings || !settings.isActive) {
      return NextResponse.json(
        { success: false, error: 'सबमिशन सेवा वर्तमान में उपलब्ध नहीं है' },
        { status: 503 }
      );
    }

    if (!settings.recipientEmail) {
      return NextResponse.json(
        { success: false, error: 'ईमेल सेटिंग्स कॉन्फ़िगर नहीं हैं' },
        { status: 500 }
      );
    }

    const submissionData = { 
      title, 
      description, 
      reporterName, 
      contact, 
      driveLink: driveLink || null 
    };

    // Send email based on configured service
    switch (settings.emailService) {
      case 'nodemailer':
        await sendEmailWithNodemailer(settings, submissionData);
        break;
      case 'sendgrid':
        await sendEmailWithSendGrid(settings, submissionData);
        break;
      case 'resend':
        await sendEmailWithResend(settings, submissionData);
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'असमर्थित ईमेल सेवा' },
          { status: 500 }
        );
    }

    return NextResponse.json({
      success: true,
      message: 'सबमिशन सफलतापूर्वक भेजा गया! हमारी टीम जल्द ही आपसे संपर्क करेगी।'
    });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { success: false, error: 'सबमिशन भेजने में त्रुटि हुई। कृपया दोबारा कोशिश करें।' },
      { status: 500 }
    );
  }
}