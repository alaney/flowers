--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

-- Started on 2023-02-08 17:42:54

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

--
-- TOC entry 3357 (class 0 OID 16512)
-- Dependencies: 214
-- Data for Name: arrangements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.arrangements (id, name, vessel_type, vessel_count, foam_count, card_holder, venmo, paypal, done, json, vessel_price) FROM stdin;
1	bridal bouquet	vase	1	1	t	f	t	f	\N	1.34
\.


--
-- TOC entry 3359 (class 0 OID 16525)
-- Dependencies: 216
-- Data for Name: flowers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flowers (id, name, price_per_stem) FROM stdin;
1	rose	1
2	lilly	0.54
3	tulip	0.25
4	orchid	1.25
\.


--
-- TOC entry 3364 (class 0 OID 16565)
-- Dependencies: 221
-- Data for Name: arrangements_flowers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.arrangements_flowers (flower_id, arrangement_id, count, category) FROM stdin;
1	1	3	Base
2	1	2	Base
\.


--
-- TOC entry 3361 (class 0 OID 16538)
-- Dependencies: 218
-- Data for Name: hard_goods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hard_goods (id, name, price) FROM stdin;
1	wire	0.33
2	ribbono	1
\.


--
-- TOC entry 3365 (class 0 OID 16578)
-- Dependencies: 222
-- Data for Name: arrangements_hard_goods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.arrangements_hard_goods (arrangement_id, hard_good_id) FROM stdin;
1	1
1	2
\.


--
-- TOC entry 3363 (class 0 OID 16545)
-- Dependencies: 220
-- Data for Name: multipliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.multipliers (name, value) FROM stdin;
foam	0.44
cardholder	0.25
tax	0.09
labor	0.2
venmo	0.03
paypal	0.04
\.


--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 215
-- Name: arrangements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arrangements_id_seq', 1, true);


--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 217
-- Name: flowers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flowers_id_seq', 4, true);


--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 219
-- Name: hard_goods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hard_goods_id_seq', 2, true);


-- Completed on 2023-02-08 17:42:54

--
-- PostgreSQL database dump complete
--

