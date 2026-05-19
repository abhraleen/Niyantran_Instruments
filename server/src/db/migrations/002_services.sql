-- ============================================================
-- Migration 002 — Services CMS table
-- Run against your Neon database via the SQL editor or psql
-- ============================================================

CREATE TABLE IF NOT EXISTS services (
    id                BIGSERIAL    PRIMARY KEY,
    title             TEXT         NOT NULL,
    slug              TEXT         NOT NULL UNIQUE,
    mode              TEXT         NOT NULL CHECK (mode IN ('industry', 'education', 'both')),
    short_description TEXT         NOT NULL,
    full_description  TEXT         NOT NULL DEFAULT '',
    applications      TEXT[]       NOT NULL DEFAULT '{}',
    features          TEXT[]       NOT NULL DEFAULT '{}',
    icon              TEXT         NOT NULL DEFAULT 'Activity',
    status            TEXT         NOT NULL DEFAULT 'active'
                                   CHECK (status IN ('active', 'draft', 'archived')),
    sort_order        INTEGER      NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE TRIGGER services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_services_mode       ON services (mode);
CREATE INDEX IF NOT EXISTS idx_services_status     ON services (status);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services (sort_order);
CREATE INDEX IF NOT EXISTS idx_services_slug       ON services (slug);

-- ─── Seed data ─────────────────────────────────────────────────────────────────
INSERT INTO services (title, slug, mode, short_description, full_description, applications, features, icon, status, sort_order)
VALUES
(
    'I–V Measurement Systems',
    'iv-measurement-systems',
    'industry',
    'Precision current–voltage characterisation for semiconductor devices, solar cells, and electronic materials research.',
    'Our I–V Measurement Systems deliver sub-nanoampere resolution current-voltage characterisation for a wide range of electronic materials and devices. Built around high-accuracy source measure units (SMUs), these systems support temperature-dependent measurements, multi-contact probing, and real-time data acquisition. Ideal for research labs, quality control, and device qualification workflows.',
    ARRAY['Solar cell J-V characterisation', 'Semiconductor device testing', 'Organic electronics research', 'Thin-film transistor evaluation', 'Diode and MOSFET parameter extraction', 'Temperature-dependent IV sweeps'],
    ARRAY['Sub-nA current resolution', 'Automated voltage sweep control', 'Multi-contact probe station integration', 'Real-time plotting and data export', 'Python & LabVIEW interfaces', 'Temperature stage support (77K–450K)'],
    'Activity',
    'active',
    1
),
(
    'Quantum Efficiency Measurement',
    'quantum-efficiency-measurement',
    'industry',
    'Advanced EQE/IQE measurement systems designed for accurate photovoltaic characterisation and performance analysis.',
    'Quantum Efficiency Measurement systems from Niyantran Instruments provide spectral-resolved photocurrent analysis for photovoltaic and optoelectronic devices. Our EQE/IQE systems cover 300–1200 nm spectral range with high signal-to-noise ratio, supporting both research-grade and production-line measurements. Lock-in amplifier-based signal recovery ensures accuracy even for low-efficiency devices.',
    ARRAY['Perovskite solar cell EQE', 'Silicon PV characterisation', 'III-V multi-junction cell analysis', 'Organic photovoltaic research', 'Space-grade photodetector qualification', 'LED internal quantum efficiency'],
    ARRAY['Spectral range 300–1200 nm', 'Lock-in amplifier signal recovery', 'Bifacial measurement support', 'Monochromator-based illumination', 'Bias light and voltage control', 'Automated wavelength scanning'],
    'Beaker',
    'active',
    2
),
(
    'Evaporation Process Control',
    'evaporation-process-control',
    'industry',
    'Automation and monitoring for thin-film deposition systems — improved process stability and repeatable results.',
    'Niyantran Evaporation Process Control systems provide closed-loop automation for thermal and e-beam evaporation chambers. Real-time thickness monitoring via quartz crystal microbalance (QCM), combined with feedback-controlled power supplies, ensures precise deposition rates and target thicknesses. Suitable for metallic, organic, and dielectric thin-film processes.',
    ARRAY['Metal electrode deposition', 'Organic semiconductor thin films', 'Dielectric layer deposition', 'Multi-layer stack fabrication', 'Transparent conducting oxide coating', 'Defense-grade optical coatings'],
    ARRAY['QCM-based real-time thickness monitoring', 'Closed-loop deposition rate control', 'Multi-source sequencing', 'Recipe storage and recall', 'Interlocks and safety shutdown', 'Data logging and process reports'],
    'Layers',
    'active',
    3
),
(
    'Scientific Software Consultancy',
    'scientific-software-consultancy',
    'both',
    'Custom instrument interfacing, automation, data acquisition, and analysis software for research and industrial applications.',
    'Our Scientific Software Consultancy service delivers bespoke instrument control and data acquisition solutions tailored to your lab or production environment. From SCPI-controlled bench instruments to complex multi-instrument automated test systems, we design, develop, and deploy software that integrates seamlessly with your existing hardware. We work with Python, LabVIEW, MATLAB, and C++ to deliver reliable, maintainable codebases.',
    ARRAY['PPMS automation scripts', 'SCPI instrument control frameworks', 'Automated test and measurement (ATE)', 'Multi-channel data acquisition', 'Lab notebook and LIMS integration', 'Custom GUI dashboards for instrument control'],
    ARRAY['Python, LabVIEW, MATLAB, C++', 'GPIB, USB, RS-232, Ethernet support', 'Real-time data visualisation', 'Automated report generation', 'Version-controlled deliverables', 'Post-delivery support and training'],
    'Code',
    'active',
    4
)
ON CONFLICT (slug) DO UPDATE SET
    title             = EXCLUDED.title,
    mode              = EXCLUDED.mode,
    short_description = EXCLUDED.short_description,
    full_description  = EXCLUDED.full_description,
    applications      = EXCLUDED.applications,
    features          = EXCLUDED.features,
    icon              = EXCLUDED.icon,
    status            = EXCLUDED.status,
    sort_order        = EXCLUDED.sort_order,
    updated_at        = NOW();
