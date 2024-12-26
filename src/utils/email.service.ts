import { Injectable } from '@nestjs/common';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

@Injectable()
export class EmailService {
  private mailgun;

  constructor() {
    const mg = new Mailgun(formData); // Use the correct FormData implementation
    this.mailgun = mg.client({
      username: 'api',
      key: '2e68d0fb-fd93acad	', // Replace with your actual Mailgun API key
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const domain = 'mg.mydamain.com'; // Replace with your Mailgun domain (e.g., sandboxXXX.mailgun.org)
    try {
      await this.mailgun.messages.create(domain, {
        from: 'mg.mydamain.com', // Replace with your verified Mailgun sender email
        to,
        subject,
        text,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Re-throw the error to handle it in the calling method
    }
  }
}
