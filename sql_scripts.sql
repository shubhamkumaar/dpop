
INSERT INTO users (name, email) VALUES
('Alice Smith', 'alice.smith@example.com'),
('Bob Johnson', 'bob.johnson@example.com'),
('Charlie Brown', 'charlie.brown@example.com'),
('David Lee', 'david.lee@example.com'),
('Eve White', 'eve.white@example.com'),
('Frank Miller', 'frank.miller@example.com'),
('Grace Davis', 'grace.davis@example.com'),
('Harry Wilson', 'harry.wilson@example.com'),
('Ivy Taylor', 'ivy.taylor@example.com'),
('Jack Anderson', 'jack.anderson@example.com');

INSERT INTO orders (user_id, order_date, amount) VALUES
((SELECT user_id FROM users WHERE email = 'alice.smith@example.com'), '2023-01-10', 120.00),
((SELECT user_id FROM users WHERE email = 'bob.johnson@example.com'), '2023-01-15', 50.50),
((SELECT user_id FROM users WHERE email = 'charlie.brown@example.com'), '2023-02-20', 200.75),
((SELECT user_id FROM users WHERE email = 'david.lee@example.com'), '2023-02-28', 75.00),
((SELECT user_id FROM users WHERE email = 'eve.white@example.com'), '2023-03-10', 300.00),
((SELECT user_id FROM users WHERE email = 'frank.miller@example.com'), '2023-03-15', 90.20),
((SELECT user_id FROM users WHERE email = 'grace.davis@example.com'), '2023-04-01', 150.00),
((SELECT user_id FROM users WHERE email = 'harry.wilson@example.com'), '2023-04-10', 60.00),
((SELECT user_id FROM users WHERE email = 'ivy.taylor@example.com'), '2023-04-18', 250.50),
((SELECT user_id FROM users WHERE email = 'jack.anderson@example.com'), '2023-05-01', 110.00);

INSERT INTO order_items (order_id, product_name, quantity, price) VALUES
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'alice.smith@example.com') AND order_date = '2023-01-10'), 'Laptop', 1, 100.00),
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'alice.smith@example.com') AND order_date = '2023-01-10'), 'Mouse', 1, 20.00),
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'bob.johnson@example.com') AND order_date = '2023-01-15'), 'Keyboard', 1, 50.50),
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'charlie.brown@example.com') AND order_date = '2023-02-20'), 'Monitor', 1, 200.75),
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'david.lee@example.com') AND order_date = '2023-02-28'), 'Webcam', 1, 75.00),
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'eve.white@example.com') AND order_date = '2023-03-10'), 'Smartphone', 1, 300.00),
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'frank.miller@example.com') AND order_date = '2023-03-15'), 'Headphones', 1, 90.20),
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'grace.davis@example.com') AND order_date = '2023-04-01'), 'Tablet', 1, 150.00),
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'harry.wilson@example.com') AND order_date = '2023-04-10'), 'Charger', 1, 60.00),
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'ivy.taylor@example.com') AND order_date = '2023-04-18'), 'Smartwatch', 1, 250.50),
((SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'jack.anderson@example.com') AND order_date = '2023-05-01'), 'External Hard Drive', 1, 110.00);
