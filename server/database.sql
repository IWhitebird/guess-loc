CREATE DATABASE jtwtutorial;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_maxscore INTEGER DEFAULT 0
);

CREATE TABLE daily_counter (
    id SERIAL PRIMARY KEY,
    counter_value INTEGER DEFAULT 0
);

INSERT INTO daily_counter (counter_value) VALUES (0);

-- INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');