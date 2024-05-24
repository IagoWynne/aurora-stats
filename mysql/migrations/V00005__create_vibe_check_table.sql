create table if not exists vibe_check (
    id int primary key auto_increment,
    vibe_check_date datetime not null,
    person_id int not null,
    score int not null,
    foreign key (person_id) references person(id)
);