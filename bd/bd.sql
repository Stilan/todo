CREATE TABLE item (
  id SERIAL PRIMARY KEY,
  description VARCHAR ,
  created timestamp ,
  done boolean
)
create table users
(
    id serial primary key,
    nameUser varchar
)

drop table users;
drop table item;

insert into category(name) values('Дома');
insert into category(name) values('Работа');
insert into category(name) values('Разное');

select * from category;

SELECT * FROM item;