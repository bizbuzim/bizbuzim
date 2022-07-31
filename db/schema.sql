--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.4

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expenses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    payment character varying NOT NULL,
    price numeric NOT NULL,
    tags text[] NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying NOT NULL,
    external_channel_id character varying,
    expensed_at timestamp without time zone NOT NULL
);


ALTER TABLE public.expenses OWNER TO postgres;

--
-- Name: raw_expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.raw_expenses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    text text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying NOT NULL,
    external_channel_id character varying
);


ALTER TABLE public.raw_expenses OWNER TO postgres;

--
-- Name: sources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sources (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    source character varying NOT NULL,
    external_id character varying NOT NULL,
    configuration json DEFAULT '{}'::jsonb NOT NULL
);


ALTER TABLE public.sources OWNER TO postgres;

--
-- Name: expenses PK_expenses_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT "PK_expenses_id" PRIMARY KEY (id);


--
-- Name: raw_expenses PK_raw_expenses_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.raw_expenses
    ADD CONSTRAINT "PK_raw_expenses_id" PRIMARY KEY (id);


--
-- Name: sources PK_sources_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sources
    ADD CONSTRAINT "PK_sources_id" PRIMARY KEY (id);


--
-- Name: idx_source_external_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_source_external_id ON public.sources USING btree (external_id);


--
-- PostgreSQL database dump complete
--

