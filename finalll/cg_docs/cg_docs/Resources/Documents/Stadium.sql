
USE Cricket
GO
create table Stadium (
Stadium_Name varchar(30) primary key,
Matches_allowed int,
Stadium_capacity bigint ,
Stadium_id int FOREIGN KEY REFERENCES Country(Country_id)
)