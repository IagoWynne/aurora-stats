create table if not exists people(
    id int not null unique primary key auto_increment,
    fullname varchar (255) not null
);