import { pool } from '../db';
import type { ServiceRow, ServicePayload } from '../types/service.types';

/** Turn a title into a URL-safe slug */
function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const serviceService = {

  async findAll(): Promise<ServiceRow[]> {
    const { rows } = await pool.query<ServiceRow>(
      `SELECT * FROM services ORDER BY sort_order ASC, created_at ASC`,
    );
    return rows;
  },

  async findActive(): Promise<ServiceRow[]> {
    const { rows } = await pool.query<ServiceRow>(
      `SELECT * FROM services WHERE status = 'active' ORDER BY sort_order ASC, created_at ASC`,
    );
    return rows;
  },

  async findById(id: number): Promise<ServiceRow | null> {
    const { rows } = await pool.query<ServiceRow>(
      `SELECT * FROM services WHERE id = $1`,
      [id],
    );
    return rows[0] ?? null;
  },

  async create(payload: ServicePayload): Promise<ServiceRow> {
    const slug = payload.slug ?? slugify(payload.title);
    const { rows } = await pool.query<ServiceRow>(
      `INSERT INTO services
         (title, slug, mode, short_description, full_description,
          applications, features, icon, status, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        payload.title,
        slug,
        payload.mode,
        payload.shortDescription,
        payload.fullDescription  ?? '',
        payload.applications     ?? [],
        payload.features         ?? [],
        payload.icon             ?? 'Activity',
        payload.status           ?? 'active',
        payload.sortOrder        ?? 0,
      ],
    );
    return rows[0];
  },

  async update(id: number, payload: Partial<ServicePayload>): Promise<ServiceRow | null> {
    // Build dynamic SET clause from supplied fields
    const fields: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    const map: Record<string, string> = {
      title:            'title',
      slug:             'slug',
      mode:             'mode',
      shortDescription: 'short_description',
      fullDescription:  'full_description',
      applications:     'applications',
      features:         'features',
      icon:             'icon',
      status:           'status',
      sortOrder:        'sort_order',
    };

    for (const [key, col] of Object.entries(map)) {
      if (key in payload) {
        fields.push(`${col} = $${idx++}`);
        values.push((payload as Record<string, unknown>)[key]);
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const { rows } = await pool.query<ServiceRow>(
      `UPDATE services SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values,
    );
    return rows[0] ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const { rowCount } = await pool.query(
      `DELETE FROM services WHERE id = $1`,
      [id],
    );
    return (rowCount ?? 0) > 0;
  },
};
