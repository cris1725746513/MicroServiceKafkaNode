var db = require('./database');
const services = require("./services/db");
db.sequelize.sync();
services.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; DROP TABLE IF EXISTS public."blackList_Tables";CREATE TABLE IF NOT EXISTS public."blackList_Tables"( nombreblacklist character varying(255) COLLATE pg_catalog."default" NOT NULL, id character varying(255) COLLATE pg_catalog."default" NOT NULL, status boolean NOT NULL,duracion character varying(255) COLLATE pg_catalog."default", descripcion character varying(255) COLLATE pg_catalog."default" NOT NULL, uid uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" timestamp with time zone NOT NULL DEFAULT now(), "updatedAt" timestamp with time zone NOT NULL DEFAULT now(), CONSTRAINT "blackList_Tables_pkey" PRIMARY KEY (uid))TABLESPACE pg_default;ALTER TABLE IF EXISTS public."blackList_Tables"OWNER to postgres;');

