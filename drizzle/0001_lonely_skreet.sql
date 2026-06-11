CREATE TABLE "ban" (
	"id" text PRIMARY KEY NOT NULL,
	"kind" text NOT NULL,
	"value" text NOT NULL,
	"user_id" text,
	"reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "launcher_token" ADD COLUMN "device_id" text;--> statement-breakpoint
ALTER TABLE "launcher_token" ADD COLUMN "last_ip" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_ip" text;--> statement-breakpoint
ALTER TABLE "ban" ADD CONSTRAINT "ban_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "ban_kind_value_idx" ON "ban" USING btree ("kind","value");