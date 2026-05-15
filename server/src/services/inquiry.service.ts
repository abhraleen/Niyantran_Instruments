import { pool } from '../db';
import type { InquiryPayload, InquiryRow } from '../types/inquiry.types';

/**
 * Inquiry service — database operations for contact/inquiry submissions.
 * Implement each method when the inquiry system is built.
 */
export const inquiryService = {
  async create(_payload: InquiryPayload): Promise<InquiryRow> {
    void pool; // placeholder reference
    throw new Error('Not implemented');
  },

  async findAll(): Promise<InquiryRow[]> {
    throw new Error('Not implemented');
  },

  async findById(_id: number): Promise<InquiryRow | null> {
    throw new Error('Not implemented');
  },

  async updateStatus(_id: number, _status: InquiryRow['status']): Promise<InquiryRow> {
    throw new Error('Not implemented');
  },
};
