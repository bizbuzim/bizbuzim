ALTER TABLE "expenses"
DROP COLUMN IF EXISTS "external_channel_id";

ALTER TABLE "raw_expenses"
DROP COLUMN IF EXISTS "external_channel_id";