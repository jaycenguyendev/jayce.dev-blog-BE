SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA prod;


ALTER SCHEMA prod OWNER TO postgres;

COMMENT ON SCHEMA prod IS 'standard public schema';

CREATE TABLE prod.user (
    "id" BIGSERIAL PRIMARY KEY,
    "firstName" VARCHAR(50),
    "middleName" VARCHAR(50),
    "lastName" VARCHAR(50),
    "mobile" VARCHAR(15) UNIQUE,
    "email" VARCHAR(50) UNIQUE,
    "passwordHash" VARCHAR(32) NOT NULL,
    "registeredAt" TIMESTAMP NOT NULL,
    "lastLogin" TIMESTAMP,
    "intro" TEXT,
    "profile" TEXT
);

CREATE TABLE prod.post(
    "id" BIGSERIAL PRIMARY KEY,
    "authorId" BIGINT NOT NULL,
    "parentId" BIGINT NULL,
    "title" VARCHAR(255) NOT NULL,
    "metaTitle" VARCHAR(255) NULL,
    "slug" VARCHAR(255) NOT NULL,
    "summary" TEXT NULL,
    "published" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "publishedAt" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "content" TEXT NULL,
    CONSTRAINT "fk_post_user" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE UNIQUE INDEX "uq_slug" ON "post" ("slug");
CREATE INDEX "idx_post_user" ON "post" ("authorId");
CREATE INDEX "idx_post_parent" ON "post" ("parentId");

ALTER TABLE "post" ADD CONSTRAINT "fk_post_parent" FOREIGN KEY ("parentId") REFERENCES "post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


CREATE TABLE prod.post_meta(
    "id" BIGSERIAL PRIMARY KEY,
    "postId" BIGINT NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "content" TEXT NULL,
    CONSTRAINT "fk_meta_post" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE INDEX "idx_meta_post" ON "post_meta" ("postId");
CREATE UNIQUE INDEX "uq_post_meta" ON "post_meta" ("postId", "key");

CREATE TABLE prod.tag(
    "id" BIGSERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "metaTitle" VARCHAR(255) NULL,
    "slug" VARCHAR(255) NOT NULL,
    "content" TEXT NULL,
);


CREATE TABLE prod.post_tag(
    "postId" BIGINT NOT NULL,
    "tagId" BIGINT NOT NULL,
    PRIMARY KEY ("postId", "tagId"),
    CONSTRAINT "fk_pt_post" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "fk_pt_tag" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX "idx_pt_tag" ON "post_tag" ("tagId");
CREATE INDEX "idx_pt_post" ON "post_tag" ("postId");


CREATE TABLE prod.category(
    "id" BIGSERIAL PRIMARY KEY,
    "parentId" BIGINT NULL,
    "title" VARCHAR(255) NOT NULL,
    "metaTitle" VARCHAR(255) NULL,
    "slug" VARCHAR(255) NOT NULL,
    "content" TEXT NULL,
    CONSTRAINT "fk_category_parent" FOREIGN KEY ("parentId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX "idx_category_parent" ON "category" ("parentId");


CREATE TABLE prod.post_category(
    "postId" BIGINT NOT NULL,
    "categoryId" BIGINT NOT NULL,
    PRIMARY KEY ("postId", "categoryId"),
    CONSTRAINT "fk_pc_post" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "fk_pc_category" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX "idx_pc_category" ON "post_category" ("categoryId");
CREATE INDEX "idx_pc_post" ON "post_category" ("postId");

CREATE TABLE prod.post_comment(
    "id" BIGSERIAL PRIMARY KEY,
    "postId" BIGINT NOT NULL,
    "parentId" BIGINT,
    "title" VARCHAR(255) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "content" TEXT NULL,
    CONSTRAINT "fk_comment_post" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "fk_comment_parent" FOREIGN KEY ("parentId") REFERENCES "post_comment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX "idx_comment_post" ON "post_comment" ("postId");
CREATE INDEX "idx_comment_parent" ON "post_comment" ("parentId");