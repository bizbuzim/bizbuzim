ALTER TABLE "channel_configurations" RENAME TO "sources";

ALTER TABLE "sources" RENAME CONSTRAINT "PK_channel_configurations_id" TO "PK_sources_id";

