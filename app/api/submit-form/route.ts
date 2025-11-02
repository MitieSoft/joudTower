import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface FormSubmission {
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  formType?: string; // 'contact' or 'payment-plan'
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = parseInt(process.env.MAX_SUBMISSIONS_PER_HOUR || '5');
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 500); // Limit length
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body: FormSubmission = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData: FormSubmission = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email).toLowerCase(),
      phone: sanitizeInput(body.phone),
      countryCode: body.countryCode || '+971',
      formType: body.formType || 'contact',
    };

    // Validate email format
    if (!isValidEmail(sanitizedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Validate phone number
    if (!isValidPhone(sanitizedData.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number.' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.ADMIN_EMAIL) {
      console.error('Email configuration missing');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const formTypeLabel = sanitizedData.formType === 'payment-plan' 
      ? 'Payment Plan Inquiry' 
      : 'Contact Form Submission';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #792f41; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #792f41; }
            .value { margin-top: 5px; padding: 8px; background-color: white; border-left: 3px solid #792f41; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New ${formTypeLabel}</h2>
              <p>Joud Tower Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Form Type:</div>
                <div class="value">${formTypeLabel}</div>
              </div>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${sanitizedData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${sanitizedData.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">${sanitizedData.countryCode} ${sanitizedData.phone}</div>
              </div>
              <div class="field">
                <div class="label">Submitted At:</div>
                <div class="value">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the Joud Tower website contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New ${formTypeLabel}

Form Type: ${formTypeLabel}
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.countryCode} ${sanitizedData.phone}
Submitted At: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })}
    `;

    // Send email
    await transporter.sendMail({
      from: `"Joud Tower Website" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: sanitizedData.email,
      subject: `New ${formTypeLabel} - ${sanitizedData.name}`,
      text: emailText,
      html: emailHtml,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully. We will get in touch with you shortly.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again later.' },
      { status: 500 }
    );
  }
}

