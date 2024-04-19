create table if not exists person(
    id int not null unique primary key auto_increment,
    first_name varchar (255) not null,
    last_name varchar (255) not null
);