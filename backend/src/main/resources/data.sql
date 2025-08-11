INSERT INTO public.etp_user(id, email, login, name, password, status) VALUES (1, 'joao@gmail.com', 'joaoLogin', 'joao', '12345', 'ACTIVE');

ALTER SEQUENCE etp_user_id_seq RESTART with 2;

INSERT INTO etp_profile(id, description) VALUES (1, 'Admin');
INSERT INTO etp_profile(id, description) VALUES (2, 'Manager');
INSERT INTO etp_profile(id, description) VALUES (3, 'Client');

ALTER SEQUENCE etp_profile_seq RESTART with 4;



INSERT INTO etp_resource (id, key, name) VALUES (1, 'user', 'User Screen');
INSERT INTO etp_resource (id, key, name) VALUES (2, 'profile', 'Profile Screen');
INSERT INTO etp_resource (id, key, name) VALUES (3, 'resource', 'Resource Screen');

ALTER SEQUENCE etp_resource_seq RESTART WITH 4;