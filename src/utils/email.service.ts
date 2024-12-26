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
      key: '2e68d0fb-fd93acad', //melgan API key
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const domain = 'sandbox26d1705dec354500b1d4d86f98451dce.mailgun.org'; // meligan domain
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
