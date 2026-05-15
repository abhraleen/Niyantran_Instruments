import { resend, FROM_ADDRESS } from '../config/resend';

interface SendEmailOptions {
  to:       string | string[];
  subject:  string;
  html:     string;
  replyTo?: string;
}

/**
 * Email service — thin wrapper around Resend.
 * Add template helpers here when the notification system is built.
 */
export const emailService = {
  async send(options: SendEmailOptions): Promise<void> {
    if (!resend) {
      console.warn('[email] RESEND_API_KEY not configured — email skipped');
      return;
    }

    await resend.emails.send({
      from:    FROM_ADDRESS,
      to:      options.to,
      subject: options.subject,
      html:    options.html,
      ...(options.replyTo ? { replyTo: options.replyTo } : {}),
    });
  },

  // TODO: add typed template helpers, e.g.:
  // async sendInquiryConfirmation(payload: InquiryPayload): Promise<void>
  // async sendAdminAlert(payload: InquiryPayload): Promise<void>
  // async sendEnrollmentConfirmation(payload: EnrollmentPayload): Promise<void>
};
