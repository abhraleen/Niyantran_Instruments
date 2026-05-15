// ─── Service row (DB, snake_case) ─────────────────────────────────────────────
export interface ServiceRow {
  id:                number;
  title:             string;
  slug:              string;
  mode:              'industry' | 'education' | 'both';
  short_description: string;
  full_description:  string;
  applications:      string[];
  features:          string[];
  icon:              string;
  status:            'active' | 'draft' | 'archived';
  sort_order:        number;
  created_at:        Date;
  updated_at:        Date;
}

// ─── Create/update payload (camelCase from frontend) ─────────────────────────
export interface ServicePayload {
  title:            string;
  slug?:            string;
  mode:             'industry' | 'education' | 'both';
  shortDescription: string;
  fullDescription?: string;
  applications?:    string[];
  features?:        string[];
  icon?:            string;
  status?:          'active' | 'draft' | 'archived';
  sortOrder?:       number;
}
