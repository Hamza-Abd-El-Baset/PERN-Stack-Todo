CREATE DATABASE tododb;

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);