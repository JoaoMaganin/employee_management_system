INSERT INTO public.etp_user(id, email, login, name, password) VALUES (1, 'joao@gmail.com', 'joaoLogin', 'joao', '12345');

ALTER SEQUENCE etp_user_id_seq RESTART with 2;

INSERT INTO etp_profile(id, description) VALUES (1, 'Admin');
INSERT INTO etp_profile(id, description) VALUES (2, 'Manager');
INSERT INTO etp_profile(id, description) VALUES (3, 'Client');

ALTER SEQUENCE etp_profile_seq RESTART with 53;