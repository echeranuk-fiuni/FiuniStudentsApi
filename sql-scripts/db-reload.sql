-- Database: fiuni_students

--DROP DATABASE IF EXISTS fiuni_students;
--CREATE DATABASE fiuni_students
--    WITH 
--    OWNER = postgres
--    ENCODING = 'UTF8'
--    LC_COLLATE = 'Spanish_Paraguay.1252'
--    LC_CTYPE = 'Spanish_Paraguay.1252'
--    TABLESPACE = pg_default
--    CONNECTION LIMIT = -1;
	
-- Table: public.users

DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL,
    first_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    username character varying(30) COLLATE pg_catalog."default" NOT NULL,
    password character varying(30) COLLATE pg_catalog."default" NOT NULL,
    role character varying(12) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_username_key UNIQUE (username)
);
ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table: public.carreers

DROP TABLE IF EXISTS public.carreers CASCADE;
CREATE TABLE IF NOT EXISTS public.carreers
(
    id SERIAL NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT carreer_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.carreers
    OWNER to postgres;
	
-- Table: public.students

DROP TABLE IF EXISTS public.students CASCADE;
CREATE TABLE IF NOT EXISTS public.students
(
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    carreer_id integer NOT NULL,
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    active boolean,
    CONSTRAINT student_pkey PRIMARY KEY (id),
    CONSTRAINT student_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT student_carreer_id_fkey FOREIGN KEY (carreer_id)
        REFERENCES public.carreers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public.students
    OWNER to postgres;

-- Create main user

INSERT INTO public.users(
	first_name, last_name, username, password, role)
	VALUES ('admin', 'admin', 'admin', 'admin', 'ADMIN');

-- Create basic carreers

INSERT INTO public.carreers(name) VALUES ('Ingenieria Civil');
INSERT INTO public.carreers(name) VALUES ('Ingenieria Electromecánica');
INSERT INTO public.carreers(name) VALUES ('Ingenieria en Informática');
INSERT INTO public.carreers(name) VALUES ('Ingenieria Industrial');