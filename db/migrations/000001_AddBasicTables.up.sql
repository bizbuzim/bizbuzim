CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "expenses" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
    "name" character varying NOT NULL,
    "payment" character varying NOT NULL,
    "price" decimal NOT NULL,
    "tags" text[],
    "description" character varying NOT NULL DEFAULT '',
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "createdBy" character varying NOT NULL,
    CONSTRAINT "PK_expenses_id" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "raw_expenses" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
    "text" text NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "createdBy" character varying NOT NULL,
    CONSTRAINT "PK_raw_expenses_id" PRIMARY KEY ("id")
);

