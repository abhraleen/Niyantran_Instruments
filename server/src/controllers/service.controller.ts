import type { RequestHandler } from 'express';
import { serviceService } from '../services/service.service';
import type { ServicePayload } from '../types/service.types';

// ─── Validation ───────────────────────────────────────────────────────────────
function validateServicePayload(body: Record<string, unknown>): string | null {
  const str = (v: unknown) => typeof v === 'string' && v.trim().length > 0;
  if (!str(body.title))            return 'title is required';
  if (!str(body.shortDescription)) return 'shortDescription is required';
  if (!['industry', 'education', 'both'].includes(body.mode as string))
    return 'mode must be "industry", "education", or "both"';
  return null;
}

// ─── GET /api/services  (public — active only) ─────────────────────────────
export const listServices: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await serviceService.findActive();
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};

// ─── GET /api/services/all  (admin — all statuses) ────────────────────────
export const listAllServices: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await serviceService.findAll();
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};

// ─── POST /api/services ───────────────────────────────────────────────────
export const createService: RequestHandler = async (req, res, next) => {
  try {
    const err = validateServicePayload(req.body as Record<string, unknown>);
    if (err) { res.status(400).json({ success: false, message: err }); return; }

    const body = req.body as Record<string, unknown>;
    const payload: ServicePayload = {
      title:            (body.title as string).trim(),
      slug:             body.slug ? (body.slug as string).trim() : undefined,
      mode:             body.mode as ServicePayload['mode'],
      shortDescription: (body.shortDescription as string).trim(),
      fullDescription:  body.fullDescription  ? String(body.fullDescription).trim()  : '',
      applications:     Array.isArray(body.applications) ? body.applications as string[] : [],
      features:         Array.isArray(body.features)     ? body.features     as string[] : [],
      icon:             body.icon   ? String(body.icon).trim()   : 'Activity',
      status:           body.status ? body.status as ServicePayload['status'] : 'active',
      sortOrder:        typeof body.sortOrder === 'number' ? body.sortOrder : 0,
    };

    const row = await serviceService.create(payload);
    res.status(201).json({ success: true, data: row });
  } catch (err: unknown) {
    // Unique constraint on slug
    if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === '23505') {
      res.status(409).json({ success: false, message: 'A service with that slug already exists' });
      return;
    }
    next(err);
  }
};

// ─── PATCH /api/services/:id ──────────────────────────────────────────────
export const updateService: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) { res.status(400).json({ success: false, message: 'Invalid service id' }); return; }

    const body = req.body as Record<string, unknown>;
    const payload: Partial<ServicePayload> = {};

    if (body.title            !== undefined) payload.title            = String(body.title).trim();
    if (body.slug             !== undefined) payload.slug             = String(body.slug).trim();
    if (body.mode             !== undefined) payload.mode             = body.mode as ServicePayload['mode'];
    if (body.shortDescription !== undefined) payload.shortDescription = String(body.shortDescription).trim();
    if (body.fullDescription  !== undefined) payload.fullDescription  = String(body.fullDescription).trim();
    if (body.applications     !== undefined) payload.applications     = body.applications as string[];
    if (body.features         !== undefined) payload.features         = body.features     as string[];
    if (body.icon             !== undefined) payload.icon             = String(body.icon).trim();
    if (body.status           !== undefined) payload.status           = body.status as ServicePayload['status'];
    if (body.sortOrder        !== undefined) payload.sortOrder        = Number(body.sortOrder);

    const row = await serviceService.update(id, payload);
    if (!row) { res.status(404).json({ success: false, message: 'Service not found' }); return; }
    res.json({ success: true, data: row });
  } catch (err) { next(err); }
};

// ─── DELETE /api/services/:id ─────────────────────────────────────────────
export const deleteService: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) { res.status(400).json({ success: false, message: 'Invalid service id' }); return; }

    const deleted = await serviceService.delete(id);
    if (!deleted) { res.status(404).json({ success: false, message: 'Service not found' }); return; }
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) { next(err); }
};
