export class MailMessage {
  to: string;
  from?: string;
  subject: string;
  context?: any;
  templateId: string;
}
