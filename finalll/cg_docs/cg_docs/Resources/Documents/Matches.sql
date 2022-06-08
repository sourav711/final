
USE Cricket
GO
create table Matches
( Match_id int identity(1,1) primary key,
Stadium_Name varchar(30) ,
Team_A int FOREIGN KEY REFERENCES Country(Country_Id),
Team_B int FOREIGN KEY REFERENCES Country(Country_Id),
Result varchar(20) ,
Date_Time smalldatetime ,
Was_Match_Played varchar(10));