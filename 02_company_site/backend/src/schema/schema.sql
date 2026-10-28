-- ============================================================================
-- Blitz Tech Hub — AI Calling Agent schema
-- Migration 0002: production-readiness improvements
--
-- This is ADDITIVE / ALTER-only. It does not replace 0001. Run this AFTER
-- 0001_ai_calling_agent_schema.sql has already been applied.
-- ============================================================================

-- ============================================================================
-- LEADS
-- ============================================================================
alter table leads
  add column if not exists company_name text,
  add column if not exists business_type text,
  add column if not exists budget_range text,
  add column if not exists project_type text,
  add column if not exists preferred_contact_method text default 'any',
  add column if not exists follow_up_date timestamptz,
  add column if not exists priority text default 'medium',
  add column if not exists assigned_to uuid references admin_users(id) on delete set null,
  add column if not exists deleted_at timestamptz;

alter table leads drop constraint if exists leads_preferred_contact_method_check;
alter table leads add constraint leads_preferred_contact_method_check
  check (preferred_contact_method in ('phone', 'email', 'whatsapp', 'any'));

alter table leads drop constraint if exists leads_priority_check;
alter table leads add constraint leads_priority_check
  check (priority in ('low', 'medium', 'high', 'urgent'));

alter table leads drop constraint if exists leads_project_type_check;
alter table leads add constraint leads_project_type_check
  check (project_type is null or project_type in (
    'web-development', 'mobile-app-development', 'ui-ux-design',
    'digital-marketing', 'seo-services', 'ai-automation', 'other'
  ));

-- Expand allowed lead sources to include social/referral channels.
alter table leads drop constraint if exists leads_source_check;
alter table leads add constraint leads_source_check
  check (source in (
    'ai_call', 'website', 'manual', 'whatsapp',
    'facebook', 'instagram', 'linkedin', 'referral'
  ));

-- Rebuild status index to exclude soft-deleted rows.
drop index if exists idx_leads_business_status;
create index if not exists idx_leads_business_status
  on leads (business_id, status) where deleted_at is null;

create index if not exists idx_leads_follow_up_date
  on leads (follow_up_date) where deleted_at is null and follow_up_date is not null;
create index if not exists idx_leads_assigned_to
  on leads (assigned_to) where deleted_at is null;
create index if not exists idx_leads_priority
  on leads (business_id, priority) where deleted_at is null;

-- ============================================================================
-- APPOINTMENTS
-- ============================================================================
alter table appointments
  add column if not exists service_requested text,
  add column if not exists meeting_type text default 'phone',
  add column if not exists meeting_location text,
  add column if not exists meeting_status_reason text,
  add column if not exists cancellation_reason text,
  add column if not exists rescheduled_from uuid references appointments(id) on delete set null,
  add column if not exists created_via text default 'ai_agent',
  add column if not exists created_by uuid references admin_users(id) on delete set null,
  add column if not exists updated_by uuid references admin_users(id) on delete set null,
  add column if not exists deleted_at timestamptz;

alter table appointments drop constraint if exists appointments_meeting_type_check;
alter table appointments add constraint appointments_meeting_type_check
  check (meeting_type in ('phone', 'video', 'in_person'));

alter table appointments drop constraint if exists appointments_created_via_check;
alter table appointments add constraint appointments_created_via_check
  check (created_via in ('ai_agent', 'admin_dashboard'));

alter table appointments drop constraint if exists appointments_service_requested_check;
alter table appointments add constraint appointments_service_requested_check
  check (service_requested is null or service_requested in (
    'web-development', 'mobile-app-development', 'ui-ux-design',
    'digital-marketing', 'seo-services', 'ai-automation', 'other'
  ));

-- Critical: rebuild the no-double-booking index so soft-deleted appointments
-- don't permanently lock a time slot.
drop index if exists uq_appointments_business_start;
create unique index if not exists uq_appointments_business_start
  on appointments (business_id, starts_at)
  where status = 'confirmed' and deleted_at is null;

create index if not exists idx_appointments_rescheduled_from
  on appointments (rescheduled_from) where rescheduled_from is not null;
create index if not exists idx_appointments_assigned_created_by
  on appointments (created_by) where created_by is not null;

-- ============================================================================
-- CALL_LOGS
-- ============================================================================
alter table call_logs
  add column if not exists recording_url text,
  add column if not exists recording_duration integer,
  add column if not exists audio_seconds integer,
  add column if not exists estimated_cost numeric(10, 4),
  add column if not exists llm_input_tokens integer,
  add column if not exists llm_output_tokens integer,
  add column if not exists llm_tokens integer,
  add column if not exists speech_to_text_provider text,
  add column if not exists text_to_speech_provider text,
  add column if not exists latency_ms integer,
  add column if not exists tool_calls_count integer not null default 0,
  add column if not exists sentiment text,
  add column if not exists caller_name text,
  add column if not exists caller_email text,
  add column if not exists ended_reason text;

alter table call_logs drop constraint if exists call_logs_sentiment_check;
alter table call_logs add constraint call_logs_sentiment_check
  check (sentiment is null or sentiment in ('positive', 'neutral', 'negative'));

create index if not exists idx_call_logs_sentiment on call_logs (business_id, sentiment);
create index if not exists idx_call_logs_caller_email on call_logs (caller_email) where caller_email is not null;

-- ============================================================================
-- BUSINESS_SETTINGS (new table — split out of agent_settings)
-- ============================================================================
create table if not exists business_settings (
  id                    uuid primary key default gen_random_uuid(),
  business_id           uuid not null unique default '11111111-1111-1111-1111-111111111111',
  company_name          text not null default 'Blitz Tech Hub',
  logo                  text,
  address               text,
  website               text,
  timezone              text not null default 'Asia/Karachi',
  business_hours        jsonb not null default '{
    "mon": {"start": "09:00", "end": "18:00"},
    "tue": {"start": "09:00", "end": "18:00"},
    "wed": {"start": "09:00", "end": "18:00"},
    "thu": {"start": "09:00", "end": "18:00"},
    "fri": {"start": "09:00", "end": "18:00"},
    "sat": null,
    "sun": null
  }'::jsonb,
  social_links          jsonb not null default '{}'::jsonb,
  support_email         text,
  support_phone         text,
  default_meeting_duration_minutes integer not null default 30,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- Migrate any existing business-info data out of agent_settings, if present.
insert into business_settings (
  business_id, company_name, support_phone, support_email,
  timezone, business_hours, default_meeting_duration_minutes
)
select
  business_id,
  coalesce(business_name, 'Blitz Tech Hub'),
  business_phone,
  business_email,
  coalesce(business_timezone, 'Asia/Karachi'),
  coalesce(working_hours, '{}'::jsonb),
  coalesce(default_meeting_duration_minutes, 30)
from agent_settings
where business_name is not null
   or business_phone is not null
   or business_email is not null
on conflict (business_id) do update set
  company_name = excluded.company_name,
  support_phone = excluded.support_phone,
  support_email = excluded.support_email,
  timezone = excluded.timezone,
  business_hours = excluded.business_hours,
  default_meeting_duration_minutes = excluded.default_meeting_duration_minutes;

-- Now trim agent_settings down to ElevenLabs-only configuration.
alter table agent_settings
  drop column if exists business_name,
  drop column if exists business_phone,
  drop column if exists business_email,
  drop column if exists business_timezone,
  drop column if exists working_hours,
  drop column if exists default_meeting_duration_minutes;

drop trigger if exists trg_set_updated_at on business_settings;
create trigger trg_set_updated_at before update on business_settings
for each row execute function set_updated_at();

-- ============================================================================
-- KNOWLEDGE_BASE_DOCUMENTS
-- ============================================================================
alter table knowledge_base_documents
  add column if not exists category text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists version integer not null default 1,
  add column if not exists uploaded_by uuid references admin_users(id) on delete set null,
  add column if not exists deleted_at timestamptz;

create index if not exists idx_kb_docs_business_category
  on knowledge_base_documents (business_id, category) where deleted_at is null;
create index if not exists idx_kb_docs_tags
  on knowledge_base_documents using gin (tags);

-- ============================================================================
-- PROMPT_VERSIONS — replace boolean is_active with a draft/published/archived
-- status, add authorship + change tracking
-- ============================================================================
alter table prompt_versions
  add column if not exists status text default 'draft',
  add column if not exists updated_by uuid references admin_users(id) on delete set null,
  add column if not exists notes text,
  add column if not exists change_log jsonb not null default '[]'::jsonb,
  add column if not exists updated_at timestamptz not null default now();

-- Backfill status from the old is_active flag before dropping it.
update prompt_versions set status = case when is_active then 'published' else 'draft' end;

alter table prompt_versions drop constraint if exists prompt_versions_status_check;
alter table prompt_versions add constraint prompt_versions_status_check
  check (status in ('draft', 'published', 'archived'));

drop index if exists uq_prompt_versions_one_active;
alter table prompt_versions drop column if exists is_active;

create unique index if not exists uq_prompt_versions_one_published
  on prompt_versions (business_id) where status = 'published';

drop trigger if exists trg_set_updated_at on prompt_versions;
create trigger trg_set_updated_at before update on prompt_versions
for each row execute function set_updated_at();