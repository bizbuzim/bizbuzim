ALTER TABLE "sources" RENAME TO "channel_configurations";

ALTER TABLE "channel_configurations" RENAME CONSTRAINT "PK_sources_id" TO "PK_channel_configurations_id";

