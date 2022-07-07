create TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    phone_number VARCHAR(255),
    last_name VARCHAR(255),
    first_name VARCHAR(255),
    nick_name VARCHAR(255),
    description VARCHAR(255),
    position VARCHAR(255)
)

create TABLE companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    addres VARCHAR(255),
    service_of_activity VARCHAR(255),
    number_of_employees VARCHAR(255),
    description VARCHAR(255),
    type VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
)