
USE Cricket
GO
create table Player
(Player_Id int not null identity(1,1) primary key,
Player_Name nvarchar(30),
player_Age int ,
Country_id int FOREIGN KEY REFERENCES Country(Country_Id)
)