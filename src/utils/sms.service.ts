import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class SmsService {
  private client;

  constructor() {
    this.client = twilio(
      'sid', // Replace with your Twilio Account SID
      'token',  // Replace with your Twilio Auth Token
    );
  }

  async sendVerificationCode(phoneNumber: string, code: string): Promise<void> {
    await this.client.messages.create({
      body: 'Your verification code is: ${code}',
      from: '+880 1816 604938', // Replace with your Twilio phone number
      to: phoneNumber,
    });
  }
}
