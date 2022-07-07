Install postgresql
Leave the owner item as default.
Create a database named - test_task_database
Data connection is described in server/db.js
If necessary, in the server/db.js file, in the password line, enter the password for your postgresql. Now the password in the server/db.js file is 1111
In the context menu of the test_task_database, select the Query tool item.
Enter commands:

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

And after:

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

Commands for creating tables are also described in the database.sql file

To start the server: cd server, npm install.
For development - npm run dev
For production - npm start


To start the client: cd client, npm install.
For development - npm start
For production - npm run build
In the production version: in the build/index.html file, you need to correct the paths to the js, css, favicon files. Put a dot at the beginning of the file path.