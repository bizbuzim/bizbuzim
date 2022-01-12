ALTER TABLE "expenses"
ADD COLUMN IF NOT EXISTS "external_channel_id" character varying;

ALTER TABLE "raw_expenses"
ADD COLUMN IF NOT EXISTS "external_channel_id" character varying;