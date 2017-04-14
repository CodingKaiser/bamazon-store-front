create database bamazon;

use bamazon;

create table products (
	item_id int auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(100) default 'miscellaneous',
    price double default 0.0,
    stock_quantity int default 0,
    primary key (item_id)
);

select * from products;

insert into products(product_name, department_name, price, stock_quantity)
values("Toilet paper", "Feminine Care", 44.50, 10);

insert into products(product_name, department_name, price, stock_quantity)
values("Deoderant", "Bath", 19.50, 14);

insert into products(product_name, price, stock_quantity)
values("Jump rope", 20.00, 45);

insert into products(product_name, department_name, price, stock_quantity)
values("Floss", "Bath", 18.50, 13);

insert into products(product_name, price, stock_quantity)
values("Toothpaste", 5.49, 9);

insert into products(product_name, department_name, price, stock_quantity)
values("Geraniums", "Garden", 50.50, 50);

insert into products(product_name, department_name, price, stock_quantity)
values("Bed sheets", "Bedroom", 4.50, 324);

insert into products(product_name, price, stock_quantity)
values("Greeting Cards", 2.39, 1000);

insert into products(product_name, department_name, price, stock_quantity)
values("Towels", "Bath", 18.50, 13);

insert into products(product_name, price, stock_quantity)
values("Candy", 6.66, 666);