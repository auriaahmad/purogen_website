=========================================================
                    REQUIEMENTS 0.0.1
=========================================================

-- Create the purogen database
CREATE DATABASE IF NOT EXISTS purogen;

-- Switch to the purogen database
USE purogen;

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    user_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(15) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(100) UNIQUE,
    admin BOOLEAN DEFAULT FALSE, -- New column for admin status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS User_Data (
    user_data_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    recipe VARCHAR(50),
    weight INT,
    mass VARCHAR(50),
    process VARCHAR(50),
    strain VARCHAR(50),
    operator VARCHAR(50),
    terpene_name VARCHAR(50),
    manufacturer_name VARCHAR(50),
    injection_volume INT,
    injections VARCHAR(50),
    customer_name VARCHAR(50),
    customer_id VARCHAR(50),
    Machine_ID VARCHAR(50),
    Machine_Location VARCHAR(50),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Create the User_Sessions table
CREATE TABLE IF NOT EXISTS User_Sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

=========================================================
                 REQUIEMENTS 0.0.2
=========================================================

-- Create the purogen database
CREATE DATABASE IF NOT EXISTS purogen;

-- Switch to the purogen database
USE purogen;

CREATE TABLE IF NOT EXISTS Admins_Table (
    admin_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(15) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the Customers table
CREATE TABLE IF NOT EXISTS Customers_Table (
    customer_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    box_name VARCHAR(50) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(15) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the Users table with a reference to the Customers table
CREATE TABLE IF NOT EXISTS Users_Table (
    user_id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36),
    username VARCHAR(50) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(15) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers_Table(customer_id)
);

-- Create the Machine_Registration table with a reference to the Customers table
CREATE TABLE IF NOT EXISTS Machine_Registration_Table (
    machine_register_id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36),
    machine_id VARCHAR(50) UNIQUE,
    machine_location VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers_Table(customer_id)
);

-- Create the Customers_Machine_Data table
CREATE TABLE IF NOT EXISTS Customers_Machine_Data_Table (
    customers_machine_data_id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36),
    machine_id VARCHAR(50),
    machine_location VARCHAR(50),
    processes VARCHAR(50),
    recipe VARCHAR(50),
    weight INT,
    mass VARCHAR(50),
    strain VARCHAR(50),
    terpene_name VARCHAR(50),
    manufacturer_name VARCHAR(50),
    injection_volume INT,
    injections VARCHAR(50),
    operator VARCHAR(50),
    customer_name VARCHAR(50),
    chamber VARCHAR(50),
    temporary1 VARCHAR(50),
    temporary2 VARCHAR(50),
    temporary3 VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers_Table(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (machine_id) REFERENCES Machine_Registration_Table(machine_id) ON DELETE CASCADE
);

-- Create the Admin_Sessions table
CREATE TABLE IF NOT EXISTS Admin_Sessions (
    admin_session_id VARCHAR(255) PRIMARY KEY,
    admin_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES Admins_Table(admin_id) ON DELETE CASCADE
);

-- Create the Customer_Sessions table
CREATE TABLE IF NOT EXISTS Customer_Sessions (
    customer_session_id VARCHAR(255) PRIMARY KEY,
    customer_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers_Table(customer_id) ON DELETE CASCADE
);

-- Create the User_Sessions table
CREATE TABLE IF NOT EXISTS User_Sessions (
    user_session_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users_Table(user_id) ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS customer_machine_assignment_table (
--     machine_assignment_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     customer_id VARCHAR(36) NOT NULL,
--     machine_id VARCHAR(36) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (customer_id) REFERENCES Customers_Table(customer_id) ON DELETE CASCADE,
--     FOREIGN KEY (machine_id) REFERENCES Machines_Table(machine_register_id) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS customer_user_assignment_table (
--     user_assignment_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     customer_id VARCHAR(36) NOT NULL,
--     user_id VARCHAR(36) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (customer_id) REFERENCES Customers_Table(customer_id) ON DELETE CASCADE,
--     FOREIGN KEY (user_id) REFERENCES Users_Table(user_id) ON DELETE CASCADE
-- );

CREATE TABLE IF NOT EXISTS User_Machine_Assignment_Table (
    user_machine_assignment_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    customer_id VARCHAR(36) NOT NULL,
    machine_register_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers_Table(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (machine_id) REFERENCES Machines_Table(machine_register_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users_Table(user_id) ON DELETE CASCADE
);