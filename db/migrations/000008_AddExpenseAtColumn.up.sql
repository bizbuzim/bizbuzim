ALTER TABLE "expenses"
ADD COLUMN IF NOT EXISTS "expensed_at" timestamp;

UPDATE "expenses" SET
    "expensed_at"="created_at";

ALTER TABLE "expenses"
ALTER COLUMN "expensed_at" SET NOT NULL;