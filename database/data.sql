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

--
-- Data for Name: arrangements; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.arrangements VALUES (1, 'bridal bouquet', 'vase', 1, 1, true, false, true, false, 1.34, '');


--
-- Data for Name: flowers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.flowers VALUES (3, 'tulip', 0, 1, DEFAULT);
INSERT INTO public.flowers VALUES (4, 'orchid', 0, 1, DEFAULT);
INSERT INTO public.flowers VALUES (205, 'Bristly Buttercup', 7.2, 12, DEFAULT);
INSERT INTO public.flowers VALUES (1, 'rose', 2.34, 12, DEFAULT);
INSERT INTO public.flowers VALUES (206, 'Virginia Strawberry', 13.72, 10, DEFAULT);
INSERT INTO public.flowers VALUES (207, 'Glory Pea', 49.09, 9, DEFAULT);
INSERT INTO public.flowers VALUES (208, 'Porpidia Lichen', 19.46, 7, DEFAULT);
INSERT INTO public.flowers VALUES (209, 'Monterey Clover', 33.79, 8, DEFAULT);
INSERT INTO public.flowers VALUES (210, 'Cuman Ragweed', 19.27, 14, DEFAULT);
INSERT INTO public.flowers VALUES (211, 'Stahlia', 49.63, 11, DEFAULT);
INSERT INTO public.flowers VALUES (212, 'West Indian Woodsorrel', 29.41, 15, DEFAULT);
INSERT INTO public.flowers VALUES (213, 'Intermediate Treebine', 46.9, 5, DEFAULT);
INSERT INTO public.flowers VALUES (214, 'Latin American Mock Vervain', 42.62, 15, DEFAULT);
INSERT INTO public.flowers VALUES (215, 'Narcissus Anemone', 34.79, 11, DEFAULT);
INSERT INTO public.flowers VALUES (216, 'Reed', 6.87, 8, DEFAULT);
INSERT INTO public.flowers VALUES (218, 'Uinta Wirelettuce', 48.16, 13, DEFAULT);
INSERT INTO public.flowers VALUES (221, 'Pickering''s Cyrtandra', 5.05, 5, DEFAULT);
INSERT INTO public.flowers VALUES (222, 'Chihuahuan Fishhook Cactus', 40.56, 7, DEFAULT);
INSERT INTO public.flowers VALUES (223, 'Farewell To Spring', 43.85, 5, DEFAULT);
INSERT INTO public.flowers VALUES (224, 'Floating Pondweed', 30.83, 13, DEFAULT);
INSERT INTO public.flowers VALUES (225, 'Hall''s Madia', 18.67, 12, DEFAULT);
INSERT INTO public.flowers VALUES (226, 'Chiricahua Mountain Alumroot', 36.19, 5, DEFAULT);
INSERT INTO public.flowers VALUES (227, 'Smooth Brome', 43.71, 10, DEFAULT);
INSERT INTO public.flowers VALUES (228, 'Wildrye', 31.45, 13, DEFAULT);
INSERT INTO public.flowers VALUES (229, 'Larchleaf Beardtongue', 11.8, 15, DEFAULT);
INSERT INTO public.flowers VALUES (230, 'Mt. Albert Goldenrod', 11, 9, DEFAULT);
INSERT INTO public.flowers VALUES (231, 'Hummingbird Trumpet', 9.86, 10, DEFAULT);
INSERT INTO public.flowers VALUES (232, 'Lindberg''s Hypnum Moss', 6.26, 11, DEFAULT);
INSERT INTO public.flowers VALUES (233, 'Stiffbranch Bird''s Beak', 6.18, 12, DEFAULT);
INSERT INTO public.flowers VALUES (234, 'Hartweg''s Beardtongue', 22.56, 10, DEFAULT);
INSERT INTO public.flowers VALUES (235, 'Coast Cockspur Grass', 45.07, 6, DEFAULT);
INSERT INTO public.flowers VALUES (236, 'Fishscale Bamboo', 30.78, 13, DEFAULT);
INSERT INTO public.flowers VALUES (237, 'Velvet Leaf Senna', 40.99, 7, DEFAULT);
INSERT INTO public.flowers VALUES (238, 'Coco Plum', 43.48, 13, DEFAULT);
INSERT INTO public.flowers VALUES (239, 'Eremophila', 13.86, 6, DEFAULT);
INSERT INTO public.flowers VALUES (240, 'Bushy Goldentop', 16.09, 6, DEFAULT);
INSERT INTO public.flowers VALUES (241, 'Dawson''s Angelica', 33.77, 11, DEFAULT);
INSERT INTO public.flowers VALUES (242, 'Stinging Nettle', 17.3, 11, DEFAULT);
INSERT INTO public.flowers VALUES (243, 'Northern Black Currant', 30.6, 10, DEFAULT);
INSERT INTO public.flowers VALUES (244, 'Sea Lettuce', 47.57, 6, DEFAULT);
INSERT INTO public.flowers VALUES (245, 'Tinypetal Waxweed', 22.17, 7, DEFAULT);
INSERT INTO public.flowers VALUES (246, 'Nutty Saw-wort', 15.5, 15, DEFAULT);
INSERT INTO public.flowers VALUES (247, 'Piedmont Cup Lichen', 5.04, 14, DEFAULT);
INSERT INTO public.flowers VALUES (248, 'Summer Mock Orange', 11.66, 14, DEFAULT);
INSERT INTO public.flowers VALUES (249, 'Rocky Mountain Milkvetch', 46.79, 9, DEFAULT);
INSERT INTO public.flowers VALUES (250, 'Damianita', 45.69, 13, DEFAULT);
INSERT INTO public.flowers VALUES (251, 'Hybrid Oak', 37.8, 10, DEFAULT);
INSERT INTO public.flowers VALUES (253, 'Marsh Blue Violet', 18.74, 7, DEFAULT);
INSERT INTO public.flowers VALUES (254, 'Littleleaf Sensitive-briar', 21.69, 9, DEFAULT);
INSERT INTO public.flowers VALUES (255, 'Tree Destroyer', 33.73, 13, DEFAULT);
INSERT INTO public.flowers VALUES (257, 'Broadstemmed Onion', 14.88, 11, DEFAULT);
INSERT INTO public.flowers VALUES (258, 'Silver Cinquefoil', 7.87, 12, DEFAULT);
INSERT INTO public.flowers VALUES (259, 'Douglas'' Tickseed', 26.19, 9, DEFAULT);
INSERT INTO public.flowers VALUES (260, 'Tetraplasandra', 41.58, 12, DEFAULT);
INSERT INTO public.flowers VALUES (261, 'Brewer''s Jewelflower', 47.21, 12, DEFAULT);
INSERT INTO public.flowers VALUES (262, 'Softleaf Rosette Grass', 48.22, 9, DEFAULT);
INSERT INTO public.flowers VALUES (263, 'Soft Greeneyes', 22.61, 9, DEFAULT);
INSERT INTO public.flowers VALUES (264, 'Oriental Poppy', 19.41, 11, DEFAULT);
INSERT INTO public.flowers VALUES (265, 'False Holly', 36.41, 10, DEFAULT);
INSERT INTO public.flowers VALUES (266, 'Jones'' Springparsley', 23.62, 7, DEFAULT);
INSERT INTO public.flowers VALUES (267, 'Luzon Jelly Lichen', 41.59, 8, DEFAULT);
INSERT INTO public.flowers VALUES (268, 'Threelobe Beggarticks', 23.94, 14, DEFAULT);
INSERT INTO public.flowers VALUES (269, 'Osterhout''s Cryptantha', 36.66, 6, DEFAULT);
INSERT INTO public.flowers VALUES (270, 'Red Milkweed', 44.02, 10, DEFAULT);
INSERT INTO public.flowers VALUES (271, 'Spineless Hornwort', 29.84, 7, DEFAULT);
INSERT INTO public.flowers VALUES (272, 'Buelliella Lichen', 33.63, 9, DEFAULT);
INSERT INTO public.flowers VALUES (273, 'Three-angle Spikerush', 7.56, 10, DEFAULT);
INSERT INTO public.flowers VALUES (274, 'Treetrunk Clubmoss', 43.09, 13, DEFAULT);
INSERT INTO public.flowers VALUES (275, 'Denseflower Knotweed', 30.7, 6, DEFAULT);
INSERT INTO public.flowers VALUES (276, 'Cumberland Rhododendron', 22.09, 7, DEFAULT);
INSERT INTO public.flowers VALUES (277, 'Pacific Panicgrass', 29.41, 7, DEFAULT);
INSERT INTO public.flowers VALUES (278, 'Small Spikerush', 32.76, 9, DEFAULT);
INSERT INTO public.flowers VALUES (279, 'Japanese False Bindweed', 16.25, 5, DEFAULT);
INSERT INTO public.flowers VALUES (280, 'Desert Panicgrass', 20.86, 9, DEFAULT);
INSERT INTO public.flowers VALUES (281, 'Relicina Lichen', 15.89, 14, DEFAULT);
INSERT INTO public.flowers VALUES (282, 'Southern Butterwort', 26.92, 10, DEFAULT);
INSERT INTO public.flowers VALUES (283, 'Palmer''s Mariposa Lily', 14.09, 14, DEFAULT);
INSERT INTO public.flowers VALUES (284, 'Hairy Gumweed', 37.15, 6, DEFAULT);
INSERT INTO public.flowers VALUES (286, 'Leechleaf Cyanea', 33.64, 13, DEFAULT);
INSERT INTO public.flowers VALUES (287, 'Guadalupe Wild Coffee', 44.75, 11, DEFAULT);
INSERT INTO public.flowers VALUES (288, 'Broadleaf Tickseed', 13.53, 9, DEFAULT);
INSERT INTO public.flowers VALUES (289, 'Meadow Deathcamas', 49.82, 12, DEFAULT);
INSERT INTO public.flowers VALUES (290, 'Ricegrass', 41.39, 14, DEFAULT);
INSERT INTO public.flowers VALUES (291, 'White Fiestaflower', 43.45, 5, DEFAULT);
INSERT INTO public.flowers VALUES (292, 'Haleakala Starviolet', 44.25, 7, DEFAULT);
INSERT INTO public.flowers VALUES (293, 'Carolina Bruchia Moss', 49.05, 11, DEFAULT);
INSERT INTO public.flowers VALUES (294, 'Mountain Naupaka', 45.55, 12, DEFAULT);
INSERT INTO public.flowers VALUES (295, 'Tall Silverbush', 49.25, 12, DEFAULT);
INSERT INTO public.flowers VALUES (296, 'Bunched Beaksedge', 12.5, 11, DEFAULT);
INSERT INTO public.flowers VALUES (297, 'California Lady''s Slipper', 19.84, 8, DEFAULT);
INSERT INTO public.flowers VALUES (298, 'Blue Mountain Buckwheat', 34.52, 13, DEFAULT);
INSERT INTO public.flowers VALUES (299, 'Bristly Hawksbeard', 22.92, 12, DEFAULT);
INSERT INTO public.flowers VALUES (301, 'Ray''s Knotweed', 45.39, 10, DEFAULT);
INSERT INTO public.flowers VALUES (302, 'Denseflower Indian Paintbrush', 18.7, 10, DEFAULT);
INSERT INTO public.flowers VALUES (303, 'Turgid Brachythecium Moss', 38.53, 13, DEFAULT);
INSERT INTO public.flowers VALUES (304, 'Yellow Indian Mallow', 28.24, 5, DEFAULT);
INSERT INTO public.flowers VALUES (220, 'Blueberryasdf', 31.29, 14, DEFAULT);
INSERT INTO public.flowers VALUES (217, 'Aloeasdfasdf asdfff', 30, 13, DEFAULT);
INSERT INTO public.flowers VALUES (219, 'Arctic Springbeauty asdf', 28.15999984741211, 8, DEFAULT);
INSERT INTO public.flowers VALUES (256, 'Lilly asdf', 34.34000015258789, 14, DEFAULT);
INSERT INTO public.flowers VALUES (252, 'American CenturPlant', 5.599999904632568, 85, DEFAULT);
INSERT INTO public.flowers VALUES (2, 'lilly', 20, 15, DEFAULT);
INSERT INTO public.flowers VALUES (285, 'fffff', 23.64, 11, DEFAULT);
INSERT INTO public.flowers VALUES (300, 'Autumn Willow asdf', 30, 15, DEFAULT);


--
-- Data for Name: hard_goods; Type: TABLE DATA; Schema: public; Owner: postgres
--

--
-- Data for Name: arrangements_flowers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.arrangements_flowers VALUES (1, 1, 3, 'Base');
INSERT INTO public.arrangements_flowers VALUES (2, 1, 2, 'Base');

--
-- Data for Name: multipliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.multipliers VALUES ('foam', 0.44);
INSERT INTO public.multipliers VALUES ('cardholder', 0.25);
INSERT INTO public.multipliers VALUES ('tax', 0.09);
INSERT INTO public.multipliers VALUES ('labor', 0.2);
INSERT INTO public.multipliers VALUES ('venmo', 0.03);
INSERT INTO public.multipliers VALUES ('paypal', 0.04);


--
-- Name: arrangements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arrangements_id_seq', 1, true);


--
-- Name: flowers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flowers_id_seq', 304, true);


--
-- Name: hard_goods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hard_goods_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

