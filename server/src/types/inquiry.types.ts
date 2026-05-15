// ─── Inquiry (contact form submission) ───────────────────────────────────────
export interface InquiryPayload {
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  mode: 'industry' | 'education';
  service?: string;
  requirement?: string;
  message: string;
}

export interface InquiryRow extends InquiryPayload {
  id: number;
  status: 'pending' | 'reviewed' | 'resolved';
  created_at: Date;
  updated_at: Date;
}

// ─── Education enrollment ─────────────────────────────────────────────────────
export interface EnrollmentPayload {
  name: string;
  email: string;
  phone?: string;
  program: string;
  institution?: string;
  year_of_study?: string;
  message?: string;
}

export interface EnrollmentRow extends EnrollmentPayload {
  id: number;
  status: 'pending' | 'confirmed' | 'rejected';
  created_at: Date;
  updated_at: Date;
}
