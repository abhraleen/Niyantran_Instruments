// ─── Inquiry request payload (camelCase — matches frontend form) ─────────────
export interface InquiryPayload {
  inquiryType:    'industry' | 'education';
  fullName:       string;
  email:          string;
  phone?:         string;
  organization?:  string;
  qualification?: string;
  areaOfInterest: string;
  message:        string;
}

// ─── Database row (snake_case — matches PostgreSQL columns) ──────────────────
export interface InquiryRow {
  id:               number;
  inquiry_type:     'industry' | 'education';
  full_name:        string;
  email:            string;
  phone:            string | null;
  organization:     string | null;
  qualification:    string | null;
  area_of_interest: string;
  message:          string;
  status:           'pending' | 'reviewed' | 'resolved';
  created_at:       Date;
  updated_at:       Date;
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
