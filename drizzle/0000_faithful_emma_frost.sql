CREATE TABLE "rss_articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"link" text NOT NULL,
	"author" text,
	"pub_date" timestamp NOT NULL,
	"feed_id" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "rss_articles_link_unique" UNIQUE("link")
);
--> statement-breakpoint
CREATE TABLE "rss_feeds" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"feed_link" text NOT NULL,
	"last_fetch_at" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "rss_feeds_feed_link_unique" UNIQUE("feed_link")
);
--> statement-breakpoint
ALTER TABLE "rss_articles" ADD CONSTRAINT "rss_articles_feed_id_rss_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."rss_feeds"("id") ON DELETE no action ON UPDATE no action;