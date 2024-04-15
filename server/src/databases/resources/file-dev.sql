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

CREATE SCHEMA dev;


ALTER SCHEMA dev OWNER TO postgres;

COMMENT ON SCHEMA dev IS 'standard public schema';

CREATE TABLE dev.user (
    username character varying(20) NOT NULL,
    password character varying(64) NOT NULL
);

ALTER TABLE dev.user OWNER TO postgres;

INSERT INTO dev.user VALUES ('user', '$2a$12$cHIVMPLpFu8nkTSsAzvfauGyzvilzDD3P1hMOuugbcS0J8L.30rBe');

ALTER TABLE ONLY dev.user
    ADD CONSTRAINT pk_user PRIMARY KEY (username);