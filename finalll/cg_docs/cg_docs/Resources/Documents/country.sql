create database Cricket
USE Cricket
GO
create table Country
( Country_Id int primary key identity(1,1),
Country_Name nvarchar(30),
Continent nvarchar(30),
Country_Code nvarchar(20)
)