import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class SmsService {
  private client;

  constructor() {
    this.client = twilio(
      'AC695312d1fef7b00cd2655af0b1057f0c', // Replace with your Twilio Account SID
      '0865971d1e03fc1fb1322e1dd7437bdb',  // Replace with your Twilio Auth Token
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
