CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    category INT NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (category) REFERENCES category(category_id)
);