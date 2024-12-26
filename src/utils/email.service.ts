import { Injectable } from '@nestjs/common';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

@Injectable()
export class EmailService {
  private mailgun;

  constructor() {
    const mg = new Mailgun(formData); // using the formdata packeg
    this.mailgun = mg.client({
      username: 'api',
      key: 'api key', //melgan API key
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const domain = 'domain'; // meligan domain
    try {
      await this.mailgun.messages.create(domain, {
        from: 'shadmansakibalam@gmail.com', // valid maligan email id
        to,
        subject,
        text,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // thorow the error hendel to the calling mathord
    }
  }
}
