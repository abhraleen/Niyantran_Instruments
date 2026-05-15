-- ============================================================
-- Migration 001 — Initial schema
-- Niyantran Instruments Platform
-- Run against your Neon database via the SQL editor or psql
-- ============================================================

-- ─── Inquiries (contact / consultation requests) ─────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
    id           BIGSERIAL    PRIMARY KEY,
    name         TEXT         NOT NULL,
    organization TEXT,
    email        TEXT         NOT NULL,
    phone        TEXT,
    mode         TEXT         NOT NULL CHECK (mode IN ('industry', 'education')),
    service      TEXT,
    requirement  TEXT,
    message      TEXT         NOT NULL,
    status       TEXT         NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'reviewed', 'resolved')),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ─── Education enrollments ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enrollments (
    id             BIGSERIAL   PRIMARY KEY,
    name           TEXT        NOT NULL,
    email          TEXT        NOT NULL,
    phone          TEXT,
    program        TEXT        NOT NULL,
    institution    TEXT,
    year_of_study  TEXT,
    message        TEXT,
    status         TEXT        NOT NULL DEFAULT 'pending'
                               CHECK (status IN ('pending', 'confirmed', 'rejected')),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Auto-update updated_at on every row change ──────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER inquiries_updated_at
    BEFORE UPDATE ON inquiries
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER enrollments_updated_at
    BEFORE UPDATE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_inquiries_email      ON inquiries  (email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status     ON inquiries  (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries  (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_enrollments_email    ON enrollments (email);
CREATE INDEX IF NOT EXISTS idx_enrollments_status   ON enrollments (status);
CREATE INDEX IF NOT EXISTS idx_enrollments_created  ON enrollments (created_at DESC);
