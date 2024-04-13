create table if not exists people(
    id int not null unique primary key auto_increment,
    firstName varchar (255) not null,
    lastName varchar (255) not null
);