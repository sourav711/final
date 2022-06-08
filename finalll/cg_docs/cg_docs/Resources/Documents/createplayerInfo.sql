go
create table PlayersInfo
(Player_Id int primary key identity(1,1),
Player_Name varchar(30) not null,
Player_Age int not null,
Player_Role varchar(40),
Player_Matches int);