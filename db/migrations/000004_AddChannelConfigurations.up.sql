CREATE TABLE IF NOT EXISTS "channel_configurations" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
    "name" character varying NOT NULL,
    "source" character varying NOT NULL,
    "external_id" character varying NOT NULL,
    "configuration" json NOT NULL DEFAULT '{}'::jsonb,
    CONSTRAINT "PK_channel_configurations_id" PRIMARY KEY ("id")
);