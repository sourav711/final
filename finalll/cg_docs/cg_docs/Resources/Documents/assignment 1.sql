--DDL command >>CREATE
--I create a database with name assignment
create database assignment;

--I select database assignment for work
use assignment
GO

--Created a table student having some columns
create table student(student_id int,student_name varchar(30),student_age int,student_mobile bigint,student_subject varchar(30));
--DML command >>INSERT
--Perform insertion one by one 
insert into [dbo].[student]values(1,'Sourav',21,9315046707,'Chemistry');
insert into [dbo].[student]values(2,'Varnika',20,9328238282,'English');
insert into [dbo].[student]values(3,'Ankit',16,9819828289,'Maths');
insert into [dbo].[student]values(4,'Riya',20,9996664545,'Physics');
insert into [dbo].[student]values(5,'Harsh',17,9416623245,'Biology');
insert into [dbo].[student]values(6,'Mayank',24,9965637798,'History');
insert into [dbo].[student]values(7,'Bisat',19,8950688213,'Physical Education');
insert into [dbo].[student]values(8,'Sahil',18,7607585123,'Accounts');
insert into [dbo].[student]values(9,'Somnath',23,8409923617,'Hindi');
insert into [dbo].[student]values(10,'Kunal',22,9896995501,'Punjabi');
--dml command>>SELECT
--use select to check my table
select * from student;

--DDL Command >>ALTER
--alter the datatype of column student_subject
alter table student 
alter column student_subject nvarchar(30);

--add a new column into table
alter table student add email nvarchar(30);

--DDL command >>DROP

--drop a column from table
alter table student 
drop column email;
select * from student;

--create a new table for showing drop,truncate and multiple inertion in one line
create table fordrop(id int,name varchar(30));

--multiple insertion using one insert operation
insert into [dbo].[fordrop]values
(1,'abc'),
(2,'aaa'),
(3,'efg');

--ddl command>>TRUNCATE
truncate table fordrop;
select * from fordrop;

--ddl comand>>DROP
drop table fordrop;

--dml command>>UPDATE
update student set student_name='sabin' where student_name='somnath';
select * from student;

--dml command>>DELETE
delete from student where student_id=10;
select * from student;

insert into [dbo].[student]values(10,'Kunal',22,9896995501,'Punjabi');
select * from student;



