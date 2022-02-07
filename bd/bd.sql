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

select * from users;

SELECT * FROM item;