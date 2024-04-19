create table if not exists wheel_run (
    id int primary key auto_increment,
    run_date datetime not null,
    winner_id int not null,
    winning_option_id int not null,
    foreign key (winner_id) references person(id),
    foreign key (winning_option_id) references wheel_option(id)
);