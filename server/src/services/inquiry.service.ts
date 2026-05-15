import { pool } from '../db';
import type { InquiryPayload, InquiryRow } from '../types/inquiry.types';

export const inquiryService = {
  /**
   * Insert a new inquiry row and return its generated id.
   */
  async create(payload: InquiryPayload): Promise<{ id: number }> {
    const { rows } = await pool.query<{ id: number }>(
      `INSERT INTO inquiries
         (inquiry_type, full_name, email, phone, organization, qualification, area_of_interest, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        payload.inquiryType,
        payload.fullName,
        payload.email,
        payload.phone         ?? null,
        payload.organization  ?? null,
        payload.qualification ?? null,
        payload.areaOfInterest,
        payload.message,
      ],
    );
    return rows[0];
  },

  async findAll(): Promise<InquiryRow[]> {
    const { rows } = await pool.query<InquiryRow>(
      'SELECT * FROM inquiries ORDER BY created_at DESC',
    );
    return rows;
  },

  async findById(id: number): Promise<InquiryRow | null> {
    const { rows } = await pool.query<InquiryRow>(
      'SELECT * FROM inquiries WHERE id = $1',
      [id],
    );
    return rows[0] ?? null;
  },

  async updateStatus(_id: number, _status: InquiryRow['status']): Promise<InquiryRow> {
    throw new Error('Not implemented');
  },
};
