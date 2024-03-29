--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

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
-- Name: arrangements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.arrangements (
    id integer NOT NULL,
    name text NOT NULL,
    vessel_type text DEFAULT ''::text NOT NULL,
    vessel_count integer DEFAULT 0 NOT NULL,
    foam_count double precision DEFAULT 0 NOT NULL,
    card_holder boolean DEFAULT false NOT NULL,
    venmo boolean DEFAULT false NOT NULL,
    paypal boolean DEFAULT false NOT NULL,
    done boolean DEFAULT false NOT NULL,
    vessel_price double precision DEFAULT 0,
    json text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.arrangements OWNER TO postgres;

--
-- Name: arrangements_flowers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.arrangements_flowers (
    flower_id integer NOT NULL,
    arrangement_id integer NOT NULL,
    count integer DEFAULT 1 NOT NULL,
    category text DEFAULT ''::text NOT NULL,
    price_override text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.arrangements_flowers OWNER TO postgres;

--
-- Name: arrangements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.arrangements ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.arrangements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: flowers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flowers (
    id integer NOT NULL,
    name text NOT NULL,
    price_per_bundle double precision DEFAULT 0 NOT NULL,
    stem_count integer DEFAULT 1 NOT NULL,
    price_per_stem double precision GENERATED ALWAYS AS ((price_per_bundle / (stem_count)::double precision)) STORED
);


ALTER TABLE public.flowers OWNER TO postgres;

--
-- Name: flowers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.flowers ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.flowers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: hard_goods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hard_goods (
    id integer NOT NULL,
    arrangement_id integer NOT NULL,
    name text NOT NULL,
    price double precision DEFAULT 0 NOT NULL
);


ALTER TABLE public.hard_goods OWNER TO postgres;

--
-- Name: hard_goods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.hard_goods ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.hard_goods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: multipliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.multipliers (
    name text NOT NULL,
    value double precision DEFAULT 0 NOT NULL
);


ALTER TABLE public.multipliers OWNER TO postgres;

--
-- Name: arrangements arrangements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arrangements
    ADD CONSTRAINT arrangements_pkey PRIMARY KEY (id);


--
-- Name: arrangements arrangements_unique_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arrangements
    ADD CONSTRAINT arrangements_unique_name UNIQUE (name);


--
-- Name: flowers flowers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flowers
    ADD CONSTRAINT flowers_pkey PRIMARY KEY (id);


--
-- Name: flowers flowers_unique_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flowers
    ADD CONSTRAINT flowers_unique_name UNIQUE (name);


--
-- Name: hard_goods hard_goods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hard_goods
    ADD CONSTRAINT hard_goods_pkey PRIMARY KEY (id);


--
-- Name: multipliers multipliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multipliers
    ADD CONSTRAINT multipliers_pkey PRIMARY KEY (name);


--
-- Name: fki_hard_goods_arrangement_id_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_hard_goods_arrangement_id_fkey ON public.hard_goods USING btree (arrangement_id);


--
-- Name: arrangements_flowers arrangements_flowers_arrangement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arrangements_flowers
    ADD CONSTRAINT arrangements_flowers_arrangement_id_fkey FOREIGN KEY (arrangement_id) REFERENCES public.arrangements(id);


--
-- Name: arrangements_flowers arrangements_flowers_flower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arrangements_flowers
    ADD CONSTRAINT arrangements_flowers_flower_id_fkey FOREIGN KEY (flower_id) REFERENCES public.flowers(id);


--
-- Name: hard_goods hard_goods_arrangement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hard_goods
    ADD CONSTRAINT hard_goods_arrangement_id_fkey FOREIGN KEY (arrangement_id) REFERENCES public.arrangements(id);


--
-- PostgreSQL database dump complete
--

