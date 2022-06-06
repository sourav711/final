
USE Cricket
GO
create table Country
( Country_Id int primary key identity(1,1),
Country_Name nvarchar(30),
Continent nvarchar(30),
Country_Code nvarchar(20)
)
insert into Country values
('India','Asia','+91'),
('Australia','Australia','+61'),
('South Africa','Africa','+27'),
('New Zealand','Australia','+64'),
('England','Europe','+44');
create table Player
(Player_Id int not null identity(1,1) primary key,
Player_Name nvarchar(30),
player_Age int ,
Country_id int FOREIGN KEY REFERENCES Country(Country_Id)
)
insert into Player values
('Rohit Sharma',35,1),
('KL Rahul',29,1),
('Virat Kohli',33,1),
('Shreyas Iyer',28,1),
('SuryaKumar Yadav',27,1),
('Rishab Pant',28,1),
('Hardik Pandya',27,1),
('Ravindra Jadeja',32,1),
('Shardul Thakur',28,1),
('Jaspreet Bumrah',30,1),
('Umran Malik',22,1)



insert into Player values
('David Warner' , 30 , 2),
('Aaron Finch' , 35, 2),
('Marcus Labuschagne' , 34, 2),
('Steve Smith' , 32, 2),
('Mitchell Marsh' , 38, 2),
('Glen Maxwell' , 34, 2),
('Marcus Stoinis' , 33, 2),
('Pat Cummins', 32, 2),
('Nathan Coulter-Nile', 32, 2),
('Mitchell Starc ' , 33, 2),
('Adam Zampa', 29, 2)

insert into Player values
('Brendon McCullum' , 37, 4),
('Martin Guptill' , 36, 4),
('Kane Williamson' , 34 , 4),
('Ross Taylor' , 35 , 4),
('Tom Lathom' , 29, 4),
('David Conwey ', 28 , 4),
('Collin De Grandhomme' , 30 ,4),
('Trent Boult' , 29 , 4),
('Tim Southee' , 33,4),
('Ish Sodhi' , 31 , 4),
('James Neesham' ,30 , 4)



insert into Player values
('Quinton De Cock', 29, 3),
('Hashim Amla' , 34, 3),
('Faf Du Plesis' , 33 , 3),
('AB Devilliers' , 36, 3),
('David Miller' , 35 , 3),
('Jp Duminy' , 31 , 3),
('Ablie Morkel', 34 , 3),
('Vernon Phillander' ,35 , 3),
('Dale Steyn' ,32 , 3),
('Kagiso Rabada', 31 , 3),
('Anrich Nortje', 28 , 3)




insert into Player values
('Jason Roy' , 33,5),
('Johnny Bairstow ', 32 , 5),
('Joe Root' , 31, 5),
('Eoin Morgan' , 35 , 5),
('Jos Buttler' , 29 , 5),
('Ben Stokes' , 30, 5),
('Moein Ali' , 28 ,5),
('Chris Woakes' , 33 , 5),
('Mark Wood' , 31 , 5),
('Liam Plunkett' ,29, 5),
('Jofra Archer' , 28 , 5)


select * from Country;


create table Stadium (
Stadium_Name varchar(30) primary key,
Matches_allowed int,
Stadium_capacity bigint ,
Stadium_id int FOREIGN KEY REFERENCES Country(Country_id)
)


insert into Stadium values
('Wankhede Statium,Mumbai' , 2, 90000,1),
('Chinnaswamy Stadium,Banglore',3, 80000, 1),
('Melbourne Ground,Melbourne' , 2, 150000 , 2),
('The Gabba,Vulture',2,70000,2),
('Eden Park,Auckland', 3, 50000, 3),
('Sky Stadium,Wellington' , 1 , 34000, 3),
('Cape Town Stadium,Cape Town' ,2, 56000, 4),
('FNB Stadium,Johannesburg' , 1, 94000, 4),
('The Lords,London', 3, 120000, 5),
('Old Traffold,Manchester' , 2 , 100000, 5)

create table Matches
( Match_id int identity(1,1) primary key,
Stadium_Name varchar(30) ,
Team_A int FOREIGN KEY REFERENCES Country(Country_Id),
Team_B int FOREIGN KEY REFERENCES Country(Country_Id),
Result varchar(20) ,
Date_Time smalldatetime ,
Was_Match_Played varchar(10))



insert into Matches values
( 'Chinnaswamy Stadium' , 1,2,null ,'2021-05-23 20:00:00',null),
('The Gabba', 2 , 3 ,null , '2021-05-24 20:00:00', null),
('Eden Park' , 3, 4, null , '2022-05-26 15:00:00' , null),
('Cape Town', 4,5, null , '2022-05-27 13:00:00' , null),
('Old Trafford', 5,1, null , '2022-005-29 18:00:00' , null)